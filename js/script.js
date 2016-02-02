//hides content for later use
$('#menu-container').hide();
$('#stat-container').hide();
$('#monster').hide();
$('#user').hide();

$(document).ready(function(){

//creates audio variables for music/sound
var audio = new Audio('./sounds/fight.mp3');
var hitAudio = new Audio('./sounds/hit.wav');
var healAudio = new Audio('./sounds/cure.wav');
var killAudio = new Audio('./sounds/kill.wav');
var mAttack = new Audio('./sounds/somersalt.wav');
var introMusic = new Audio('./sounds/8bit.mp3');
var error = new Audio('./sounds/error.mp3');

var introText = "On your way to the village of Anselton a monster jumps out of the bush...";
var splitIntro = introText.split("");
var introOver = false;


//Populates the container div for battle, starts battle audio
var beginBattle = function(){
	$('#menu-container').show();
	$('#user').show();
	$('#monster').show();
	$('#battle-dialogue').hide();
	$('#stat-container').show().animate();
	appendStats();
	$('#monster').animate({	right: "0px", bottom: "-10px"});
	$('#user').animate({	left: "-40px", bottom: "10px"});
	audio.play();
}

//Intro sequence
$(splitIntro).each(function(index){
	introMusic.play();
	setTimeout( function(){
		$("#battle-dialogue").append(splitIntro[index]);
		if(index + 1 === splitIntro.length){
			$("#battle-dialogue").append("<p>Press Enter to Continue</p>");		
			document.addEventListener('keypress', function (e) {
    	var key = e.which || e.keyCode;
   		  if(introOver == false){
   		  	if (key === 13) { 
   		  	introMusic.pause();
      		beginBattle();
      		introOver = true;
    			}
   		  }

			});
		}
	}, 100 * (index + 1));
})

//Creates character objects
var monster = {hp: 30,
								mp: 10,
								damage: 0,
								defend: 0,
								heal: 0,
								choice: 0};
var player = {hp: 20,
							 mp: 20,
							 damage: 0,
							 defend: 0,
							 heal: 0,
							 choice: "",
							 clicked: false,
							 name: "Mark"};
	
	var showAction = function(){
		if(monster.damage > 0){
			$('#userDamage').html("<h1>" + Math.floor(monster.damage/player.defend) + "</h1>").animate({bottom: "+=60px", opacity: "0", color: "red"}, 1000, function(){
	  	$('#userDamage').html("").css({bottom: "-=60px", opacity: "1"});
			});
		}
		if(player.damage > 0){
			$('#monsterDamage').html("<h1>" + Math.floor(player.damage/monster.defend) + "</h1>").animate({bottom: "+=40px", opacity: "0", color: "red"}, 1000, function(){
	  	$('#monsterDamage').html("").css({bottom: "-=40px", opacity: "1"});
	  	});
		}
		if(player.choice == "heal"){
			$('#userHeal').html("<img src='./images/heal.png'>").animate({bottom: "-=40px", opacity: "0"}, 1000, function(){
				$('#userHeal').html("").css({bottom: "+=40px", opacity: "1"});
			})
		}
		if(monster.choice == 3){
			$('#monsterHeal').html("<img src='./images/heal.png'>").animate({bottom: "-=60px", opacity: "0"}, 1000, function(){
				$('#monsterHeal').html("").css({bottom: "+=60px", opacity: "1"});
			})
		}
	}

	//animates player character to show that the knight attacked
	var userAttack = function(){
	  $('#user').animate({left: "+=30px"}, 'fast')
	  $('#user').animate({left: "-=30px"}, 'fast')
	  if(monster.choice == 1){
	  	showAction();
	  }	
	}

	//animates monster character to show that the monster attacked
	var monsterAttack = function(){
		$('#monster').animate({right: "+=30px"}, 'fast')
		$('#monster').animate({right: "-=30px"}, 'fast')
		if(player.choice == "attack"){
			showAction();
		}
	}	

	//function to run through the monsters roll
	function monsterChoice() {
		//checks to see if monster has available MP for heal if so it runs
	  if(monster.mp == 0){
	    monster.choice = 1 + (Math.floor(Math.random() * 2));
	      switch (monster.choice) {
	      case 1:
	        monster.damage = 1 + (Math.floor(Math.random() * 5));
	        monster.defend = 1;
	        monster.heal = 0;
	        break;
	      case 2:
	        monster.damage = 0;
	        monster.defend = 2;
	        monster.heal = 0;
	        break;
	      };
	  //runs if monster has available MP to heal
	  }else{
		monster.choice = 1 + (Math.floor(Math.random() * 5));
		
			switch (monster.choice) {
				//monster attacks
				case 1:
				case 4:
				case 5:
					monster.damage = 1 + (Math.floor(Math.random() * 5));
					monster.defend = 1;
					monster.heal = 0;
					break;
				//monster defends
				case 2:
					monster.damage = 0;
					monster.defend = 2;
					monster.heal = 0;
					break;
				//monster heals
				case 3:
					monster.damage = 0;
					monster.defend = 1;
					monster.heal = 5;
					monster.mp -= 5;
					break;
		}	
	  	}

	};

	//Assigns numbers for battle algorithm based on user selection
	function userChoice() {
		switch (player.choice) {
			case "attack":
				player.damage = 1 + (Math.floor(Math.random() * 5));
				player.defend = 1;
				player.heal = 0;
				break;
			case "defend":
				player.damage = 0;
				player.defend =  2;
				player.heal = 0;
				break;
			case "heal":
				player.damage = 0;
				player.defend = 1;
				player.heal = 5;
				player.mp -= 5;
				break;
		}

	};

	//append stats function
	var appendStats = function(){
		$('#name').html("Character:" + player.name)
		$('#health').html("HP: " + player.hp);
		$('#magic').html("MP:   " + player.mp);
	}

	//algorithm to change HP based on user and monster choices
	function userTurn(){
		monster.hp = Math.floor((monster.hp - (player.damage / monster.defend)) + monster.heal);
		showAction();
		if(player.choice == 'attack'){
			userAttack();
			hitAudio.play();
		}else if(player.choice == 'heal'){
			healAudio.play();
		}
	};

	function monsterTurn(){
		player.hp = Math.floor((player.hp - (monster.damage / player.defend)) + player.heal);
		if(monster.choice === 1 || monster.choice === 4 || monster.choice === 5){
			monsterAttack();
			mAttack.play();
		}else if(monster.choice == 3){
			healAudio.play();
		}
	}

	//Corrects for HP going below zero
	function belowZero() {
	  if(player.hp <= 0){
	    player.hp = 0;
	  }
	  if(monster.hp <=0){
	    monster.hp = 0;
	  }
	}

	//Determines if game is over then begins endgame animation
	function endGame() {
		if(player.hp <= 0){
			$("#user").toggle("explode");
			$('#menu-container').hide();
		  $("#stat-container").hide();
		  audio.pause();
		  var defeatAudio = new Audio('./sounds/defeat.mp3');
			defeatAudio.play();
			$('#container').css({'background-image': 'none'}).animate({ backgroundColor: "#000000",
															 			  														color: "white"}, 2000);
	    $("#battle-dialogue").html("<h1>YOU'VE BEEN DEFEATED!</h1>");
	    $("#battle-dialogue").show();
	    $("#skeleton").animate({right: "200px", height: "400px", width: "400px"});
	    $("#monster").animate({right: "200px"});
		}
		else if(monster.hp <=0){
	  
		  $("#monster").toggle('explode');
			$("#menu-container").hide();
			$("#stat-container").hide();
			audio.pause();
			var victoryAudio = new Audio('./sounds/victory.mp3');
			killAudio.play();
			victoryAudio.play();	
		  $("#battle-dialogue").html("<h1>You Defeated the Monster!</h1>");
		  $("#battle-dialogue").show();
		  $("#player").animate({left: "360px", height: "400px", width: "500px"});
	  	$("#user").animate({left: "160px"});
	  }
	};

	var runGame = function(){
		player.clicked = true;
		if(player.clicked == true){
			monsterChoice();
			userChoice();
			userTurn();
			monsterTurn();
	    belowZero();
	    appendStats();
			// dialogue();
			endGame();
			player.clicked = false;
		}else{
			player.clicked = false;
		}
		setTimeout(function(){

		}, 1200)
	}

	//Event listener for user actions
	$('#attack').click(function() {
		player.choice = "attack";
		runGame();		
	});
	$('#defend').click(function() {
		player.choice = "defend";
		runGame();
	});
	$('#heal').click(function() {
	  if(player.mp == 0){
	    error.play();
	  }else{
			player.choice = "heal"; 
			runGame();
		};
	});
})