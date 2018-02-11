console.log('circlesAppear.js called')

var circle01;
var circle02;
var circle03;
var circle04;

function setup() {
	var cnv = createCanvas(400,400);
	cnv.parent("intro-vis")

	var centerWidth = width/2;
	var centerHeight = height/2;
	var evenSpacing = 40;

	var googleBlue = '#4285F4';
	var googleRed = '#EA4335';
	var googleYellow = '#FBBC04';
	var googleGreen = '#34A853';

/*
	circle01 = new googleCircle(centerWidth - (evenSpacing/2 + evenSpacing), googleBlue);
	circle02 = new googleCircle(centerWidth - evenSpacing/2, googleRed);
	circle03 = new googleCircle(centerWidth + evenSpacing/2, googleYellow);
	circle04 = new googleCircle(centerWidth + (evenSpacing/2 + evenSpacing), googleGreen);
*/
	circle01 = new googleCircle(13 + 0, googleBlue);
	circle02 = new googleCircle(13 + evenSpacing, googleRed);
	circle03 = new googleCircle(13 + evenSpacing * 2, googleYellow);
	circle04 = new googleCircle(13 + evenSpacing * 3, googleGreen);

}

function draw() {
	background(255);

	//circle01.update();
	//circle01.display();
	//circle02.update();
	//circle02.display();
	//circle03.update();
	//circle03.display();
	//circle04.update();
	//circle04.display();

	var circleLag = 30;
	//circle01.wave();
	//circle01.display();
	if (frameCount > circleLag) {
		circle01.update();
		circle02.update();
		circle03.update();
		circle04.update();
	}

}

function googleCircle(XX, circleFill) {
	
	this.maxDiameter = 25;
	this.diameter = 0;
	this.x = XX;
	//this.y = YY;
	this.y = this.maxDiameter/2 + .5;
	this.fill = circleFill;
	
	this.update = function() {
		if (this.diameter <= this.maxDiameter) {
			this.diameter += .4;	
		}
		
		noStroke();
		fill(this.fill);
		ellipse(this.x, this.y, this.diameter);
	}

	this.display = function() {
		//noStroke();
		//fill(this.fill);

		ellipse(this.x, this.y, this.diameter);
	}
}