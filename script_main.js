var canvas;
var canvas_W = 1280;
var canvas_H = 480;
var cX = canvas_W/2; var cY = canvas_H - 30;
var rad = 30;
var start1 = 100; var start2 = 50;var xPos;var yPos;
var rX = start2;
var rY = start1; var dist = 3;
var sizeW = 50; var sizeH = 150; 
var lastSwapTime = 0; var millisPerSwap = 500;
var hit = false;
var player;
var controls = [37, 39, 38, 40] ; //arrow controls (left, right, up, down)
var map; var bgCol; var numObs = 45; var rectObs = [];
var bgMuse;
//soundfile from Audionautix.com
function preload(){
	map = loadImage("images/map_game.png");
	//soundFormats('mp3', 'ogg');
	bgMuse = loadSound('sounds/cycles_edit.mp3');
}

function setup(){
	canvas = createCanvas(canvas_W, canvas_H);	
	canvas.parent('canvasContainer');
	seed = int(focusedRandom(0, 1000));
	background(255, 255, 255);
	rectMode(CORNER);
	   	for(i=0;i<numObs;i++){
		r = new playerObs(random(width - 100),random(height - 100), random(15,30), random(15,30) ) // generate a rectObs
		rectObs.push(r); //add it to the array.
	}
	bgMuse.setVolume(0.5);
	bgMuse.loop();
	player = new playerObj(rad, 2, controls);
	frameRate(60);
}

function draw() {
  //background(255, 255, 255);	
  image(map, 0, 0);	
  popUps(canvas_W/2, canvas_H/2);
  targets(rX, rY, sizeW, sizeH);
  for(i=0;i<numObs;i++){
		rectObs[i].motion();
		rectObs[i].collision(player); 
	}
  player.move();
  swapper();
  resetFocusedRandom(seed);
}
//music controller and stuff
/* function keyTyped (){
	if (bgMuse.isPlaying() && key == 'p'){
		bgMuse.pause();
	}
	else{
		bgMuse.play();
	}
} */
//player 1
//code base from p5,js//collide2d.js and other examples
function playerObj(dia, motion, controls){
	
	this.dia = dia;
	this.col = color(255, 192, 2);
	this.col2 = color(232, 88, 12);
	this.touch = false;
	this.motion = motion; 
	this.x =  100;
	this.y = height/2;
	
	this.move = function (){
//player moves
  if (keyIsDown(controls[0]))
    this.x -= this.motion;

  if (keyIsDown(controls[1]))
    this.x += this.motion;

  if (keyIsDown(controls[2]))
    this.y -= this.motion;

  if (keyIsDown(controls[3]))
    this.y += this.motion;
//bounce off canvas at the end
	if(this.x < 0){
			this.x = this.x + this.dia * 1.2;
		}
		if(this.x > width){
			this.x = 0;
			
		}
		if(this.y < 0){
			this.y = this.y + this.dia *1.2;
		}
		if (this.y > height){
			this.y = height - this.dia *1.2;
		}
		else {
			text("Novelty",this.x-3,this.y + 50); 
		}
//player sketch, simple
  push();
  stroke(this.col);
  strokeWeight(2);
  fill(this.col2);
  rect(this.x, this.y, this.dia, this.dia);
 }
	pop();
}
//the only obstacles to collide with
function playerObs (x, y, w, h){
	push();
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	
	//this.r = int(focusedRandom(255, 180)); this.g = int(focusedRandom(180, 40)); this.g = int(focusedRandom(40, 225));
	this.color = color(232, 37, 0);//fire_red
	this.touch = false;
	
	this.collision = function (player){
		this.touch = collideRectRect(this.x, this.y, this.w, this.h, player.x, player.y, player.dia, player.dia);
		
		if(this.touch){
			this.color = color(255, 234, 12); //bright yellow
			text("Item", this.x - 3, this.y + 20);
		}
	}
	this.motion = function(){
		noStroke();
		fill(this.color);
		this.x -= 4;
		if (this.x < 0){
			this.x = width;
		}
		rect(this.x, this.y, this.w, this.h);
	}
	pop();
	
}
function swapper(){
   var millisNow = millis();
   if(millisNow > lastSwapTime + millisPerSwap) {
    changeSeed();
    lastSwapTime = millisNow;
  }	 
}

function changeSeed(){
	seed = seed + 1;
} 

function popUps(w, h){
  push();
  fill(40, 80, 100);
  var dis_diff = int (focusedRandom(0.5, 2.0));
  var dis_diff1 = int (focusedRandom(0.8, 1.5));
  var display_words = ["Screw Novelty", "It's A Distraction", "And Get's In the Way"];
  if (mouseIsPressed == true){
	 	  textSize(32);
		  text(display_words[0], w * 0.2, h * 0.8);
	  	  textSize(32);
		  text(display_words[1], w * 0.8, h * 1.2);
	 	  textSize(32);
		  text(display_words[2], w * 1.4, h * 1.4);
  }
  pop();	 
  }
  	
//non-colliding goal posts
function targets(rX, rY, sizeW, sizeH){
	var rect1, rect2;
	var colors = [[255, 150, 16], [20, 255, 20]];
	var diff1 = int(focusedRandom(1.5, 4.5));
	var diff2 = int(focusedRandom(0.4, 1.5));
 
   //rect one_collisions
  push();
  fill(colors[0]);
  rect1 = rect(rX + (width/2 * 1.5) ,rY + (75 * diff1),sizeW/2, sizeH * 1.2);
  pop();
   //rect_two_collisions
  push();
  fill(colors[1]);
  rect2 = rect(rX + (width/2 * 1.65), rY + (75 * diff2 ), sizeW/2, sizeH );
  pop();
}

 