var monsterHP = 20, userHP = 20;
var monsterMP = 20, userMP = 20;
var userDMG, monsterDMG;
var defend, mDefend;
var medic = 0; mHeal = 0;
var choice;
var clicked = false;

function monsterChoice() {
  if(monsterMP < 10){
    monsterDecision = 1 + (Math.floor(Math.random() * 2));
      switch (monsterDecision) {
      case 1:
        monsterDMG = 1 + (Math.floor(Math.random() * 10));
        mDefend = 1;
        mHeal = 0;
        break;
      case 2:
        monsterDMG = 0;
        mDefend = 2;
        mHeal = 0;
        break;
      };
  }else{
	monsterDecision = 1 + (Math.floor(Math.random() * 3));
	
		switch (monsterDecision) {
			case 1:
				monsterDMG = 1 + (Math.floor(Math.random() * 10));
				mDefend = 1;
				mHeal = 0;
				break;
			case 2:
				monsterDMG = 0;
				mDefend = 2;
				mHeal = 0;
				break;
			case 3:
				monsterDMG = 0;
				mDefend = 1;
				mHeal = 5;
				monsterMP -= 10;
				break;
	}	
  	}

};

function userChoice() {
	switch (choice) {
		case "attack":
			userDMG = 1 + (Math.floor(Math.random() * 10));
			defend = 1;
			medic = 0;
			console.log("action attack happens");
			break;
		case "defend":
			userDMG = 0;
			defend =  2;
			medic = 0;
			break;
		case "heal":
			userDMG = 0;
			defend = 1;
			medic = 5;
			userMP -= 10;
			break;
	}

};

function battle() {
	monsterHP = (monsterHP - (userDMG / mDefend)) + mHeal;
	userHP = (userHP - (monsterDMG / defend)) + medic;

};

function dialogue() {

	if(choice == "attack" && monsterDecision == 1){
		alert("You took " + (monsterDMG / defend) + " points of damage.  You inflicted " + (userDMG / mDefend) + " points of damage. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.");
	}
	else if(choice == "attack" && monsterDecision == 2){
		alert("You swing your sword at the monster for " + (userDMG/mDefend) + " but he deflects most of your damage. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.")
	}
	else if(choice == "attack" && monsterDecision == 3){
		alert("You strike the monster for " + userDMG + " HP and the monster heals himself " + mHeal + " HP You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left and " + monsterMP + " MP left.");
	}
	else if(choice == "defend" && monsterDecision == 1){
		alert("You hold up your shield and the monster strikes you for " + (monsterDMG/defend) + " HP You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.");
	}
	else if(choice == "defend" && monsterDecision == 2){
		alert("You both curl up in the fetal position like wussies. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left.");
	}
	else if(choice == "defend" && monsterDecision == 3){
		alert("You hold up your shield with the monster heals himself " + mHeal + " HP. You have " + userHP + " HP left.  The monster has " + monsterHP + " HP left and " + monsterMP + " MP left.");
	}
	else if(choice == "heal" && monsterDecision == 1){
		alert("You heal yourself for " + medic + " HP, but the monster attacked you for " + monsterDMG + " You have " + userHP + " HP left. and " + userMP + " MP left.  The monster has " + monsterHP + " HP left.");
	}
	else if(choice == "heal" && monsterDecision == 2)
		{
		alert("You heal yourself for " + medic + " HP and the monster raises his arms in defense. You have " + userHP + " HP left and " + userMP + " MP left.  The monster has " + monsterHP + " HP left.");
		}
	else if(choice == "heal" && monsterDecision == 3){
		alert("You heal yourself for " + medic + " HP while the monster heals himself for " + mHeal + " HP... You have " + userHP + " HP left and " + userMP + " MP left.  The monster has " + monsterHP + " HP left and " + monsterMP + " MP left.");
	}
	else{
		alert("Not sure what happened here...");
	}
	
};


function endGame() {
	if(userHP <= 0){
		alert("YOU'RE DEAD!!");
	}
	else if(monsterHP <=0){
		alert("You defeated the monster!");
	}
	else{

	}
};

$('.attack').click(function() {
	choice = "attack";
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
$('.defend').click(function() {
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
$('.heal').click(function() {
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