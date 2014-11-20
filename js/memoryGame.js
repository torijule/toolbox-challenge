/*Victoria Wellington
Java Script for assignment four
To simulate playing a memory game */

"use strict";

document.addEventListener('DOMContentLoaded', onReady);

var $gameGrid = ('gameGrid');

function onReady() {

	var w = $(window).width();




	document.getElementById("startGame").addEventListener("click", startGame);
	window.addEventListener("resize", redraw);  //(Or do with bootstap!  --mayve try but might stack!)

	var imageNumbers = []
	//set out tiles?

 
	//start 
}


//grid position, something to get to filepath, boolean if showing
function tile(id, imgNum, showing){
	this.id = id;
	this.imgNum = imgNum;
	this.showing = showing
}

function startGame(){
	//print back side of all tiles
	//get/pick tiles
	var totalImages = 32;
	var imageNumbers = [];
	var i;
	for (i = 0; i < totalImages; i++){
		imageNumbers.push(i + 1);
	}
	_.shuffle(imageNumbers);

	var imagesInPlay = imageNumbers.slice(0, 8);
	var row;
	var col;
	var clone = imagesInPlay.slice(0)
	var tiles = imagesInPlay.concat(imagesInPlay);  //get pairs for each image
	console.log(tiles);

	_.shuffle(tiles);

	console.log(tiles);

	var table = $(gameGrid).append(document.createElement('table'));

	for (row =0; row < 4; row++){
		var r = document.createElement('div');
		r.setAttribute("id", "row " + row);
		$(r).addClass('tr');
		for (col = 0; col < 4; col++){
			var c = document.createElement('td');
			$(c).addClass('col');
			c.setAttribute("id", row + " " + col); //establishing grid system
			//add image
			var i = document.createElement('img');
			//$(r).data(false); //pair has not been found
			i.setAttribute("src", "img/tile" + (tiles[row* 4 + col]) + ".jpg");  
			$(c).append(i);
			$(r).append(c);
		}
		$(table).append(r);
	}

	draw(imageNumbers);


	
	//play game!
}

function draw(){


}

function redraw(){

}

