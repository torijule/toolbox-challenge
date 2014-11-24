/*Victoria Wellington
Java Script for assignment four
To simulate playing a memory game */

"use strict";

document.addEventListener('DOMContentLoaded', onReady);

var $gameGrid = ('gameGrid');
var secondClick;
var tiles;
var lastImg;
var remainingImagePairs;
var attempts;
var startTime;
var refresh;

function onReady() {




	document.getElementById("startGame").addEventListener("click", startGame);
	window.addEventListener("resize", draw);  

 
	//start 
}



function startGame(){
	//initalizing
	secondClick = true;
	remainingImagePairs = 8;
	startTime = _.now();
	attempts = 0;
	document.getElementById("winner").style.display = "none";

	var table = $(gameGrid).append(document.createElement('table'));
	if (!table.size ==0){
		table.empty();  //rebuild grid from scratch
	}

	var totalImages = 32;
	var imageNumbers = [];
	var i;
	for (i = 0; i < totalImages; i++){
		imageNumbers.push(i + 1);
	}
	imageNumbers = _.shuffle(imageNumbers);  //picking tiles to use

	var imagesInPlay = imageNumbers.slice(0, 8);
	var row;
	var col;
	var clone = imagesInPlay.slice(0)
	tiles = imagesInPlay.concat(imagesInPlay);  //get pairs for each image


	tiles = _.shuffle(tiles);

	var w = $(window).width;
	var h = $(window).height;


	for (row =0; row < 4; row++){
		var r = document.createElement('div');
		r.setAttribute("id", "row " + row);
		$(r).addClass('tr');
		for (col = 0; col < 4; col++){
			var c = document.createElement('td');
			$(c).addClass('col');
			c.setAttribute("id", row + " " + col); //establishing grid system
			//add image
			var i = document.createElement('input');
			var imageID = row * 4 + col;
			i.setAttribute("type", "image");
			i.setAttribute("src", "img/tile" + (tiles[imageID]) + ".jpg");  
			i.setAttribute("onclick", "imageClicked("+imageID+")");
			var tile = {id: imageID, showing: false}
			$(i).data(tile); //keeping track if match was found
			console.log(tile);
			i.setAttribute("id", row * 4 + col);
			if (w > h){
				$(i).css("width", (h / 5));
			} else {
				$(i).css("width", (w / 4));
			}
			$(c).append(i);
			$(r).append(c);
		}
		$(table).append(r);
	}

	draw();
	refresh = window.setInterval(draw, 1000);


	
	//play game!
}

function draw(){
	var row, col;
	var w = $(window).width;
	var h = $(window).height;
	for (row = 0; row < 4; row++){
		for (col = 0; col <4; col++){
			var pic = document.getElementById(row * 4 + col);
			if ($(pic).data().showing == false){
				pic.setAttribute("src", "img/tile-back.png")
			} else {
				pic.setAttribute("src", "img/tile" + (tiles[row * 4 + col]) +".jpg");
			}
			if (w > h){
				$(pic).css("width", (h / 10));
			} else {
				$(pic).css("width", (w / 4));
			}
		}

	}
	time = Math.floor((_.now() - startTime) / 1000);
	var setTime = $('#time').text(time);
	var setAttempts = $('#attempts').text(attempts);
	var setPairings = $('#pairs').text(remainingImagePairs);

}


function imageClicked(imageID){

	secondClick = !secondClick;


	if (!secondClick){
		var image = document.getElementById(imageID);
		lastImg = imageID  //note which image this is
		//image.setAttribute("src", "img/tile" + tiles[imageID] + ".jpg");
		$(image).data('showing', true);
		draw();
	} else {
		attempts++;
		var image = document.getElementById(imageID);
		var last = document.getElementById(lastImg);
		$(last).data('showing', true);
		$(image).data('showing', true);
		draw();
	
		//success
		if (tiles[imageID] == tiles[lastImg]){
			
			remainingImagePairs--;
		} else {  //failure
			window.setTimeout(function(){
				$(last).data('showing', false);
				$(image).data('showing', false);
				console.log(last + "   " + image);
				draw();
			}, 1000);
		}
		
		if (remainingImagePairs === 0){
			document.getElementById("winner").style.display = "inline";
			clearInterval(refresh);
		}
	}  //end of guess
}

