$(document).ready(function(){

//creates audio variables for music/sound
var audio = new Audio('./sounds/fight.mp3');
var hitAudio = new Audio('./sounds/hit.wav');
var healAudio = new Audio('./sounds/cure.wav');
var killAudio = new Audio('./sounds/kill.wav');
var mAttack = new Audio('./sounds/somersalt.wav');
// audio.play();

var introText = "On your way to the village of Anselton a monster jumps out of the bush...";
var splitIntro = introText.split("");

$('#monster').hide();
$('#user').hide();

var beginBattle = function(){
	console.log("hi");
	$('#user').show();
	$('#monster').show();
	$('#monster').animate({	right: "0px", bottom: "-10px"});
	$('#user').animate({	left: "-40px", bottom: "10px"});
}

//Intro sequence
$(splitIntro).each(function(index){
	var value = $(this);
	setTimeout( function(){
		$("#battle-dialogue").append(splitIntro[index]);
		if(index + 1 === splitIntro.length){
			beginBattle();
		}
	}, 100 * (index + 1));
})

//Creates character objects
var monster = {hp: 20,
								mp: 20,
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
							 clicked: false};
	
	// var monsterHP = 20, userHP = 20;
	// var monsterMP = 20, userMP = 20;
	// var userDMG, monsterDMG;
	// var defend, mDefend;
	// var medic = 0; mHeal = 0;
	// var choice;
	// var clicked = false;
	
	//animates player character to show that the knight attacked
	var userAttack = function(){
	  $('#user').animate({left: "+=30px"}, 'fast')
	  $('#user').animate({left: "-=30px"}, 'fast')
	  $('#userDamage').html("<h1>" + monster.damage + "</h1>").animate({bottom: "+=60px", opacity: "0", color: "red"}, 1000, function(){
	  	$('#userDamage').html("").css({bottom: "-=60px", opacity: "1"});
	  });	
	  
	}
	//animates monster character to show that the monster attacked
	var monsterAttack = function(){
		$('#monster').animate({right: "+=30px"}, 'fast')
		$('#monster').animate({right: "-=30px"}, 'fast')
		$('#monsterDamage').html("<h1>" + player.damage + "</h1>").animate({bottom: "+=40px", opacity: "0"}, 1000, function(){
	  	$('#monsterDamage').html("").css({bottom: "-=40px", opacity: "1"});
	  });
	}	


	function monsterChoice() {
		//checks to see if monster has available MP for heal if so it runs
	  if(monster.mp == 0){
	    monster.choice = 1 + (Math.floor(Math.random() * 2));
	      switch (monster.choice) {
	      case 1:
	        monster.damage = 1 + (Math.floor(Math.random() * 10));
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
		monster.choice = 1 + (Math.floor(Math.random() * 3));
		
			switch (monster.choice) {
				//monster attacks
				case 1:
					monster.damage = 1 + (Math.floor(Math.random() * 10));
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
					monster.mp -= 10;
					break;
		}	
	  	}

	};

	//Assigns numbers for user choice algorithm based on user selection
	function userChoice() {
		switch (player.choice) {
			case "attack":
				player.damage = 1 + (Math.floor(Math.random() * 10));
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
				player.mp -= 10;
				break;
		}

	};

	//algorithm to change HP based on user and monster choices
	function userTurn(){
		monster.hp = (monster.hp - (user.damage / monster.defend)) + monster.heal;
		if(player.choice == 'attack'){
			userAttack();
			hitAudio.play();
		}else if(player.choice == 'heal'){
			healAudio.play();
		}
	};

	function monsterTurn(){
		player.hp = (player.hp - (monster.damage / player.defend)) + player.heal;
		if(monster.choice == 1){
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

	//Determines if game is over that begins endgame animation
	function endGame() {
		if(player.hp <= 0){
			$("#user").toggle("explode");
		  $("#user-menu").hide();
		  audio.pause();
		  var defeatAudio = new Audio('./sounds/defeat.mp3');
			defeatAudio.play();
	    $("#battle-dialogue").empty().append("YOU'VE BEEN DEFEATED!");
	    $("#skeleton").animate({right: "200px", height: "400px", width: "400px"});
	    $("#monster").animate({right: "200px"});
		}
		else if(monster.hp <=0){
	  
		  $("#monster").toggle('explode');
			$("#user-menu").hide();
			audio.pause();
			var victoryAudio = new Audio('./sounds/victory.mp3');
			killAudio.play();
			victoryAudio.play();
		  $("#battle-dialogue").empty().append("You Defeated the Monster!");
		  $("#player").animate({left: "360px", height: "400px", width: "500px"});
	  	$("#user").animate({left: "160px"});
	  }

		else{

		}
	};

	//Event listener for user actions
	$('#attack').click(function() {
		player.choice = "attack";
		player.clicked = true;
		if(player.clicked == true){
			monsterChoice();
			userChoice();
			userTurn();
			monsterTurn(function(){

			}, 2000);
	    belowZero();
			// dialogue();
			endGame();
			player.clicked = false;
		}else{
			player.clicked = false;
		}
			
	});
	$('#defend').click(function() {
			player.choice = "defend";
			player.clicked = true; 
	    if(player.clicked == true){
	    monsterChoice();
	    userChoice();
	    userTurn();
	    monsterTurn(function(){

	    }, 2000);
	    belowZero();
	    // dialogue();
	    endGame();
	    player.clicked = false;
	  }else{
	    player.clicked = false;
	  }
	});
	$('#heal').click(function() {
	  if(player.mp < 10){
	    alert("Your MP is too low")
	  }else{
			player.choice = "heal"; 
			player.clicked = true;
	      if(player.clicked == true){
	        monsterChoice();
	        userChoice();
	        userTurn();
	        belowZero();
	        // dialogue();
	        endGame();
	        player.clicked = false;
	      }else{
	    		player.clicked = false;
	      }
	  }
	});

})