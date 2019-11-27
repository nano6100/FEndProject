// Enemies our player must avoid
const Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.height = 65;
    this.width = 95;
    this.collision = false;
    this.speed = 100;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (this.x > ctx.canvas.width + this.width) {
        this.x = -200 * Math.floor(Math.random() * 4) + 1;
    } else {
        this.x += ((Math.random() * this.speed) * 5) * dt;

    }

    //check for collision with player
    if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.width, this.height)) {
        this.collision = true;
        if (player) {
            player.x = 202;
            player.y = 400;
            if (player.life != 0) {
                player.life -= 1;

                document.getElementById('lifePool').innerHTML = player.life;
            } else {
                GameEnd();
                let content = document.querySelector('.modal-content');
                content.firstElementChild.innerText = "THE BUGS ATE YOU!!!\n Your Score was: " + player.score + "\n And you reach Level (" + player.Lvl + ")";
                modal.setAttribute("style", "display:block;");

            }

        }
    } else {
        this.collision = false;
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class

const Player = function(x, y) {

    this.x = x;
    this.y = y;
    this.height = 75;
    this.width = 65;
    this.life = 5;
    this.score = 0;
    this.Lvl = 1;
    this.sprite = 'images/char-boy.png'
};
// This class requires an update(), 
Player.prototype.update = function(dt) {
    if (this.y == -15) {
        this.x = 202;
        this.y = 400;
        this.score += 100;
        this.Lvl += 1;

        allEnemies.forEach(enemy => {
            if (enemy.speed < 700) {
                enemy.speed += 60;
                console.log("FASTER!!");
            }
        })
        document.getElementById('Score').textContent = this.score;
        document.getElementById('Lvl').textContent = this.Lvl;
        console.log("you made it to safety")
    }

};
//rendering the player in the canves
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//and a handleInput() method.
Player.prototype.handleInput = function(move) {
    //hight and width of each..."square" 
    const horiz = 101;
    const verti = 83;

    if (move === 'left' && this.x - horiz >= 0) {
        this.x -= horiz;
    }
    if (move === 'right' && this.x + horiz < ctx.canvas.width) {
        this.x += horiz;
    }
    if (move === 'down' && this.y + verti < ctx.canvas.height - 200) {
        this.y += verti;
    }
    if (move === 'up' && this.y - verti > 0 - player.height) {
        this.y -= verti;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let player = new Player(202, 400);



let enemyPosition = [55, 140, 230];
const allEnemies = enemyPosition.map((y, index) => {
    return new Enemy((-200 * (index + 1)), y);
})




// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


//detect when player is near the enemy
function collision(px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

//When your game End
function GameEnd() {
    //Restart Button of the modal
    let restart = document.querySelector(".RstBtn");
    restart.addEventListener("click", function() {
        location.reload(true);
    })
}