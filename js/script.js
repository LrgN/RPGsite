$(document).ready(function(){

//creates audio variables for music/sound
var audio = new Audio('./sounds/fight.mp3');
var hitAudio = new Audio('./sounds/hit.wav');
var healAudio = new Audio('./sounds/cure.wav');
var killAudio = new Audio('./sounds/kill.wav');
var mAttack = new Audio('./sounds/somersalt.wav');
// audio.play();

//Sets beginning of game variables
	var monsterHP = 20, userHP = 20;
	var monsterMP = 20, userMP = 20;
	var userDMG, monsterDMG;
	var defend, mDefend;
	var medic = 0; mHeal = 0;
	var choice;
	var clicked = false;

	//animates character coming onto screen
	$('#monster').animate({	right: "0px", bottom: "-10px"});
	$('#user').animate({	left: "-40px", bottom: "10px"});
	//animates player character to show that the knight attacked
	var userAttack = function(){
	  $('#user').animate({left: "+=30px"}, 'fast')
	  $('#user').animate({left: "-=30px"}, 'fast')
	  $('#userDamage').html("<h1>" + monsterDMG + "</h1>").animate({bottom: "+=60px", opacity: "0", color: "red"}, 1000, function(){
	  	$('#userDamage').html("").css({bottom: "-=60px", opacity: "1"});
	  });	
	  
	}
	//animates monster character to show that the monster attacked
	var monsterAttack = function(){
		$('#monster').animate({right: "+=30px"}, 'fast')
		$('#monster').animate({right: "-=30px"}, 'fast')
		$('#monsterDamage').html("<h1>" + userDMG + "</h1>").animate({bottom: "+=40px", opacity: "0"}, 1000, function(){
	  	$('#monsterDamage').html("").css({bottom: "-=40px", opacity: "1"});
	  });
	}	


	function monsterChoice() {
		//checks to see if monster has available MP for heal if so it runs
	  if(monsterMP < 10){
	    monsterDecision = 1 + (Math.floor(Math.random() * 2));
	      switch (monsterDecision) {
	      case 1:
	        monsterDMG = 1 + (Math.floor(Math.random() * 10));
	        mDefend = 1;
	        mHeal = 0;
	        monsterAttack();
	        break;
	      case 2:
	        monsterDMG = 0;
	        mDefend = 2;
	        mHeal = 0;
	        break;
	      };
	  //runs if monster has available MP to heal
	  }else{
		monsterDecision = 1 + (Math.floor(Math.random() * 3));
		
			switch (monsterDecision) {
				//monster attacks
				case 1:
					monsterDMG = 1 + (Math.floor(Math.random() * 10));
					mDefend = 1;
					mHeal = 0;
					monsterAttack();
					break;
				//monster defends
				case 2:
					monsterDMG = 0;
					mDefend = 2;
					mHeal = 0;
					break;
				//monster heals
				case 3:
					monsterDMG = 0;
					mDefend = 1;
					mHeal = 5;
					monsterMP -= 10;
					break;
		}	
	  	}

	};

	//Assigns numbers for user choice algorithm based on user selection
	function userChoice() {
		switch (choice) {
			case "attack":
				userDMG = 1 + (Math.floor(Math.random() * 10));
				defend = 1;
				uHeal = 0;
				break;
			case "defend":
				userDMG = 0;
				defend =  2;
				uHeal = 0;
				break;
			case "heal":
				userDMG = 0;
				defend = 1;
				uHeal = 5;
				userMP -= 10;
				break;
		}

	};

	//algorithm to change HP based on user and monster choices
	function battle() {
		monsterHP = (monsterHP - (userDMG / mDefend)) + mHeal;
		userHP = (userHP - (monsterDMG / defend)) + uHeal;
	};

	//Corrects for HP going below zero
	function belowZero() {
	  if(userHP <= 0){
	    userHP = 0;
	  }
	  if(monsterHP <=0){
	    monsterHP = 0;
	  }
	}

	//Shows dialogue for battle to users
	function dialogue() {

		if(choice == "attack" && monsterDecision == 1){
			$('#battle-dialogue').empty().append("You took " + (monsterDMG / defend) + " points of damage.  You inflicted " + (userDMG / mDefend) + " points of damage. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.");
	 		userAttack();
	 		hitAudio.play();
		}
		else if(choice == "attack" && monsterDecision == 2){
			$('#battle-dialogue').empty().append("You swing your sword at the monster for " + (userDMG/mDefend) + " but he deflects most of your damage. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.")
	    userAttack();
	    hitAudio.play();
	  }
		else if(choice == "attack" && monsterDecision == 3){
			$('#battle-dialogue').empty().append("You strike the monster for " + userDMG + " HP and the monster heals himself " + mHeal + " HP You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left and " + monsterMP + " MP left.");
	    userAttack();
	    hitAudio.play();
		}
		else if(choice == "defend" && monsterDecision == 1){
			$('#battle-dialogue').empty().append("You hold up your shield and the monster strikes you for " + (monsterDMG/defend) + " HP You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.");
			monsterAttack();
			mAttack.play();
		}
		else if(choice == "defend" && monsterDecision == 2){
			$('#battle-dialogue').empty().append("You both curl up in the fetal position like wussies. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.");
		}
		else if(choice == "defend" && monsterDecision == 3){
			$('#battle-dialogue').empty().append("You hold up your shield with the monster heals himself " + mHeal + " HP. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left and " + monsterMP + " MP left.");
		}
		else if(choice == "heal" && monsterDecision == 1){
			$('#battle-dialogue').empty().append("You heal yourself for " + medic + " HP, but the monster attacked you for " + monsterDMG + " You have " + userHP + " HP left. and " + userMP + " MP left.  The monster has " + monsterHP + " HP left.");
			monsterAttack();
			healAudio.play();
		}
		else if(choice == "heal" && monsterDecision == 2)
			{
			$('#battle-dialogue').empty().append("You heal yourself for " + medic + " HP and the monster raises his arms in defense. You have " + userHP + " HP left and " + userMP + " MP left.  The monster has " + monsterHP + " HP left.");
			healAudio.play();
			}
		else if(choice == "heal" && monsterDecision == 3){
			$('#battle-dialogue').empty().append("You heal yourself for " + medic + " HP while the monster heals himself for " + mHeal + " HP... You have " + userHP + " HP left and " + userMP + " MP left.  The monster has " + monsterHP + " HP left and " + monsterMP + " MP left.");
			healAudio.play();
		}
		else{
			$('#battle-dialogue').empty().append("Not sure what happened here...");
		}
		
	};

	//Determines if game is over that begins endgame animation
	function endGame() {
		if(userHP <= 0){
			$("#user").toggle("explode");
		  $("#user-menu").hide();
		  audio.pause();
		  var defeatAudio = new Audio('./sounds/defeat.mp3');
			defeatAudio.play();
	    $("#battle-dialogue").empty().append("YOU'VE BEEN DEFEATED!");
	    $("#skeleton").animate({right: "200px", height: "400px", width: "400px"});
	    $("#monster").animate({right: "200px"});
		}
		else if(monsterHP <=0){
	  
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
		choice = "attack";
		clicked = true;
		if(clicked == true){
			monsterChoice();
			userChoice();
			battle();
	    belowZero();
			dialogue();
			endGame();
			clicked = false;
		}else{
			var clicked = false;
		}
			
	});
	$('#defend').click(function() {
			choice = "defend";
			clicked = true; 
	    if(clicked == true){
	    monsterChoice();
	    userChoice();
	    battle();
	    dialogue();
	    endGame();
	    clicked = false;
	  }else{
	    var clicked = false;
	  }
	});
	$('#heal').click(function() {
	  if(userMP < 10){
	    alert("Your MP is too low")
	  }else{
			choice = "heal"; 
			clicked = true;
	      if(clicked == true){
	        monsterChoice();
	        userChoice();
	        battle();
	        dialogue();
	        endGame();
	        clicked = false;
	      }else{
	    var clicked = false;
	      }
	  }
	});

})