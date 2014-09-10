/**
 * Created by Adrien on 10/09/2014.
 */
var Player = function(){

  /**
   * Player conf
   * @type {number}
   */
  this.horizontalSpeed = 500;
  this.jumpSpeed = 1500;
  this.jumpGravity = 7000;
  this.gravitySlow = 2000;

  /**
   * Player world collision + animation
   */
  var collision = this.collision = game.add.sprite(game.world.centerX, game.world.centerY,
    'player');
  collision.anchor.x = 0.5;
  collision.anchor.y = 0.5;
  game.physics.arcade.enable(collision);

  collision.body.gravity.y = this.gravitySlow;
  collision.body.width= 80;
  collision.body.height= 160;

  collision.body.collideWorldBounds = true;
  collision.frame = 0;

  /**
   * Sword
   */
  var sword = this.sword = game.add.sprite(collision.x, collision.y);
  sword.width = 80;
  sword.height = 40;

  game.physics.arcade.enable(sword);

  /**
   * Hitbox
   */
  var hitbox = this.hitbox = game.add.sprite(collision.x, collision.y);
  hitbox.width = 40;
  hitbox.height = 120;

  game.physics.arcade.enable(hitbox);


  /**
   * Player informations
   */
  this.direction = 'left';
}

Player.prototype.move = function(cursor){
  if(!this.collision.body.onFloor() && this.collision.body.newVelocity.y >= 0){
    this.collision.body.gravity.y = this.gravitySlow;
  }
  if (cursor.left.isDown) {
    this.direction = 'left';
    this.collision.frame =2;
    this.collision.body.velocity.x = -1*this.horizontalSpeed;
  }
  else if (cursor.right.isDown) {
    this.direction = 'right';
    this.collision.frame = 3;
    this.collision.body.velocity.x = this.horizontalSpeed;
  }
  else {
    if(this.direction === 'left'){
      this.collision.frame = 1
    } else {
      this.collision.frame = 0;
    }
    this.collision.body.velocity.x = 0;
  }
  if ((cursor.up.isDown)
    && this.collision.body.onFloor()) {
    this.collision.body.gravity.y = this.jumpGravity;
    this.collision.body.velocity.y = -1 * this.jumpSpeed;
  }
  this.sword.x = this.collision.x + 20;
  this.sword.y = this.collision.y;
  this.hitbox.x = this.collision.x - this.hitbox.body.halfWidth;
  this.hitbox.y = this.collision.y - this.hitbox.body.halfHeight;
}