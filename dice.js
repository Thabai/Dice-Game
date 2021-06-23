

const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

init();


document.querySelector('.btn-roll').addEventListener('click', function(){
	if (gamePlaying) {
		// 1. random number
		let dice = Math.floor(Math.random() * 6) +1;

		// 2. display result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice' + dice + '.png';

		// 3. Update round score if the rolled number is not 1
		if (dice !== 1) {
			hideRolledMsg();
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			//disable button
			disableBtn(btnRoll, 1000);
			document.querySelector('.player-'+activePlayer+'-rolled-1').style.visibility = 'visible';
			nextPlayer();		
		}
	}	
});

document.querySelector('.btn-hold').addEventListener('click', function(){
		if (gamePlaying) {
			// Add current score to global score
			scores[activePlayer] += roundScore;	

			//Update the UI
			document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

			//check if player won the game
			if (scores[activePlayer] >= 30) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner-' + activePlayer);
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
				gamePlaying = false;

			} else {
				nextPlayer();
			}
		}
});

function nextPlayer() {
	//next player
		var icons = document.getElementsByTagName('button');
		for(i=0;i<icons.length;i++){
			icons[i].classList.remove(activePlayer);
		}
		
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active-' + activePlayer);
		activePlayer ===0 ? activePlayer = 1 : activePlayer = 0;
		//stop score being carried over to other player
		roundScore = 0;
		
		for(i=0;i<icons.length;i++){
			icons[i].classList.add(activePlayer);
		}
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('active-' + activePlayer);
		document.querySelector('#current-0').textContent = '0';
		document.querySelector('#current-1').textContent = '0';
}

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	hideRolledMsg()
	
	document.querySelector('#name-0').textContent = 'Enter name';
	document.querySelector('#name-1').textContent = 'Enter name';
	document.querySelector('.player-0-panel').classList.add('active-0');
	document.querySelector('.player-0-panel').classList.remove('winner-0');
	document.querySelector('.player-1-panel').classList.remove('winner-1');

}

function disableBtn(btn, time) {
	   //disable button
		btn.disabled = true;
      	setTimeout(function(){btn.disabled = false;},time);
}

function hideRolledMsg(){
	document.querySelector('.player-0-rolled-1').style.visibility = 'hidden';
	document.querySelector('.player-1-rolled-1').style.visibility = 'hidden';
}

//rules tab
document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-rules').addEventListener('click', function(){
	    let games = document.getElementsByClassName('game-panel');
		for(i=0;i<games.length;i++){
			games[i].style.display = 'none';
		}
	    
	    document.querySelector('.btn-back').style.display = 'block';
		let rules = document.getElementsByClassName('rules-panel');
		for(i=0;i<rules.length;i++){
			rules[i].style.display = 'block';
		}
	
});

document.querySelector('.btn-back').addEventListener('click', function(){
	    let games = document.getElementsByClassName('game-panel');
		for(i=0;i<games.length;i++){
			games[i].style.display = 'block';
		}
	    
	    document.querySelector('.btn-back').style.display = 'none';
		let rules = document.getElementsByClassName('rules-panel');
		for(i=0;i<rules.length;i++){
			rules[i].style.display = 'none';
		}
	
});
