console.log('intro 02 called called translate');

var circle01;
var circle02;
var circle03;
var circle04;

// timer vars
var appearTimer = 3100;
var waveTimer = appearTimer + 2000;
var waveDelay = 5;
var circleLag = 50;
var ballDropTimer = 2000;

function setup() {
	//var cnv = createCanvas(400,400);
	//var cnv = createCanvas(windowWidth, 500);
	var cnv = createCanvas(windowWidth, windowHeight);
	cnv.parent("intro-vis")

	var centerWidth = width/2;
	var centerHeight = height/2;
	
	imgGoogleG = createImg("../../assets/GoogleG_FullColor/svg/logo_GoogleG_FullColor_176px.svg");
	imgGoogleG.class("intro-header-logo");
	imgGoogleG.position(width / 2 - 300, height / 2);
	
	textMainHeader = createP("2017 Media Lab <br> Year in Review");
	textMainHeader.class("product-hero-heading");
	textMainHeader.position(width / 2, height / 2);

	textSubHeader = createP("Media Lab Operations by Thunder");
	textSubHeader.class("product-hearing-subheading");
	textSubHeader.position(width / 2, height / 2 + 120);

	var evenSpacing = 40;

	var googleBlue = '#4285F4';
	var googleRed = '#EA4335';
	var googleYellow = '#FBBC04';
	var googleGreen = '#34A853';

	circle01 = new GoogleCircle(13 + 0, googleBlue, 1);
	circle02 = new GoogleCircle(13 + evenSpacing, googleRed, 1);
	circle03 = new GoogleCircle(13 + evenSpacing * 2, googleYellow, 1);
	circle04 = new GoogleCircle(13 + evenSpacing * 3, googleGreen, 1);

}

function draw() {
	background(200);

	// logo fade
	if (millis() > 1500) {
		$(".intro-header-logo").fadeOut(2000);
	}

	// circles appear
	if (millis() > appearTimer) {
	//if (millis() > 3500) {	
		circle01.appear();
		circle02.appear();
		circle03.appear();
		circle04.appear();
	}

	// waves logo animation
	if (millis() > waveTimer && millis() < 10000) {
		//circle01.wave();
		circle01.oscillate();
	}
	if (millis() > waveTimer + circleLag && millis() < 10000) {
		//circle02.wave();
		circle02.oscillate();
	}
	if (millis() > waveTimer + circleLag * 2 && millis() < 10000) {
		//circle03.wave();
		circle03.oscillate();
	}
	if (millis() > waveTimer + circleLag * 3 && millis() < 10000) {
		//circle04.wave();
		circle04.oscillate();
	}

	// balls drop to the floor animation
	//if (millis() > waveTimer + circleLag * 3 + ballDropTimer) {
	if (millis() > 10000 && millis() < 17000) {
		console.log('balls should drop')
		natureElements(circle01, 0.01, 0, 0, 0.1, 0.03);
		circle01.bouncingUpdate();
		circle01.checkEdges();

		natureElements(circle02, 0, 0.02, 0, 0.1, 0.03);
		circle02.bouncingUpdate();
		circle02.checkEdges();

		natureElements(circle03, 0.03, 0, 0, 0.1, 0.03);
		circle03.bouncingUpdate();
		circle03.checkEdges();

		natureElements(circle04, -0.03, 0.01, 0, 0.1, 0.03);
		circle04.bouncingUpdate();
		circle04.checkEdges();
	}

	if (millis() > 17000 && millis() < 25000)  {
		console.log('balls should accelerate towards mouse');
		circle01.accToMouse();
		circle02.accToMouse();
		circle03.accToMouse();
		circle04.accToMouse();
	}

	if (millis() > 25000)  {
		console.log('balls should fly off screen');
		circle01.flyOffScreen();
		circle02.flyOffScreen();
		circle03.flyOffScreen();
		circle04.flyOffScreen();
	}

} // end of draw()

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function GoogleCircle(XX, circleFill, m) {
	this.maxDiameter = 25;
	this.diameter = 0;

	//this.x = XX;
	//this.y = YY;
	//this.y = this.maxDiameter/2 + .5;
	this.position = createVector(XX, this.maxDiameter/2 + .5);
	this.fill = circleFill;

	this.waveheight = 10;
	this.startingCirclePosition = 20;

	this.angle = 0;
	this.aVelocity = 0.07;
	this.amplitude = 10;

	this.mass = m;
	this.velocity = createVector(0, 0);
	this.acceleration = createVector(0, 0);

	this.adjustX = 250;
	this.adjustY = height/2 - 50;
	
	// balls fly after screen after getting to the mouse
	this.flyOffScreen = function() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);

		// generate random vector
		var min = 0.-04;
       	var max = 0.04;
       	var randomNumber = Math.random() * (max - min) + min;
		var randomVector = (randomNumber, randomNumber)

		var wind = createVector(0.01, 0);
		var gravity = createVector(0, 0.03);
		this.applyForce(wind);
		this.applyForce(gravity);
		//this.applyForce(randomVector);
	}


	// balls follow mouse after they drop
	this.accToMouse = function() {
		this.mouse = createVector(mouseX + random(-5,5), mouseY + random(-5,5));
		this.mouse.sub(this.position);
		this.mouse.setMag(0.5);
		this.acceleration = this.mouse;

		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.velocity.limit(5);
	}

	// balls drop in cool way
	this.applyForce = function(force) {
		var f = p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}
	this.bouncingUpdate = function() {
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
	}
	this.checkEdges = function() {
		if (this.position.x > width) {
			this.position.x = width;
			this.velocity.x *= -1;
		} else if (this.position.x < 0) {
			this.velocity.x *= -1;
			this.position.x = 0;
		}

		if (this.position.y > height) {
			this.velocity.y *= -1;
			//this.position.y = height;
			this.position.y = height - (m * 10 / 2);
		}
	}

	//  wavey animation 
	this.wave = function() {
		this.position.y = this.diameter/2 + (sin(this.angle + this.startingCirclePosition) * this.waveheight/2) + this.waveheight/2;
		this.angle = this.angle + 0.07;
	}

	this.oscillate = function() {
		//push();
		//translate(this.position.x, this.position.y + (height/2));

		this.position.y = this.amplitude * sin(this.angle) + this.diameter/2;
		this.angle += this.aVelocity;

		//pop();
	}

	// circles appear 
	this.appear = function() {
		if (this.diameter <= this.maxDiameter) {
			this.diameter += .4;	
		}
		
		noStroke();
		fill(this.fill);
		ellipse(this.position.x + this.adjustX, this.position.y + this.adjustY, this.diameter);
	}

} // end of GoogleCircle

// helper function for bouncing balls to ground
function natureElements(circle, windX, windY, gravityX, gravityY, C) {
	//var wind = createVector(0.01, 0);
	//var gravity = createVector(0, 0.1 * circle.mass);

	//var c = 0.03;

	var wind = createVector(windX, windY);
	var gravity = createVector(gravityX, gravityY * circle.mass);

	var c = C;

	var friction = circle.velocity.copy();
	friction.mult(-1);
	friction.normalize();
	friction.mult(c);

	circle.applyForce(friction);
	circle.applyForce(wind);
	circle.applyForce(gravity);
} // end of natureElements()
