public var turnSpeed : int;
public var bullet : GameObject;
public var healthBar : UnityEngine.UI.Slider;  
public var maxSpeed : int;
public var sensitivity : int = 3;
public var maxHealth : float = 100;
public var PhaseDistance : int = 150;
public var DistanceForPhase : int = 5;
public var killCount : int = 0;

private var health : float = maxHealth;
private var currSpeed : int = 0;

function start(){
	healthBar.value = health;

}

function Update(){

    var currentPosition = transform.position;//just assigning a var because we'll use this a bunch of times

    //Find direction to go int
    var moveDirection = get2DDistanceVector(currentPosition, Camera.main.ScreenToWorldPoint(Input.mousePosition));

    //Use length of vector
    var mousePlayerDistance = moveDirection.magnitude;
    
    //find the direction vector, aka make the length one
    if(moveDirection != Vector2.Zero)
        moveDirection.Normalize();

    rotateToDirection(moveDirection);

    //set speed According to distance from ship to mouse 
	setSpeed(mousePlayerDistance*sensitivity);

    moveToward(currentPosition, moveDirection);

    if (Input.GetButtonDown("Fire1")) {//take away Down on end for rapid fire
    	shootBullet(currentPosition, moveDirection);
    }

     if (Input.GetButtonDown("Fire2")) {//take away Down on end for rapid fire

     	if(mousePlayerDistance > DistanceForPhase){
     		phase(currentPosition, moveDirection);
        }

    }
}

function OnTriggerEnter2D(obj) {
    //Name of the object that collided with the enemy
    var name = obj.gameObject.name;

    if (name == "enemy(Clone)") {
		takeDamage(25);
    }

} 

function moveToward(currentPosition, moveDirection){
	var target = moveDirection*currSpeed + currentPosition;
    transform.position = Vector3.Lerp( currentPosition, target, Time.deltaTime);
}

function setSpeed(speed){
	currSpeed = speed;
	if(currSpeed > maxSpeed){//cap the speed
		currSpeed = maxSpeed;
	}

}

function rotateToDirection(moveDirection){
	var targetAngle = Mathf.Atan2(moveDirection.y, moveDirection.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.Slerp( transform.rotation, 
                         Quaternion.Euler( 0, 0, targetAngle+270 ), 
                         turnSpeed * Time.deltaTime );
}

function get2DDistanceVector(currentPosition, moveToward){
	//find move direction
    //var moveToward = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    moveDirection = moveToward - currentPosition;
    moveDirection.z = 0;

    return moveDirection;
}

function shootBullet(currentPosition, moveDirection){
	//Instantiate a bullet with appropriate velocity a little past the ship
	var bull = Instantiate(bullet, currentPosition+moveDirection*.4, transform.rotation);//moveDirection*.4 is there to spawn the bullet slightly ahead of the spaceship
    bull.GetComponent("Rigidbody2D").velocity = (20+currSpeed)*moveDirection;//moveSpeed part of bullet velocity, so it gets the ships velocity as well 
}

//Dash forward with invincibility 
function phase(currentPosition , moveDirection){
	//get the component for collision
	var collide = GetComponent("BoxCollider2D");
	//turn it off
    collide.enabled = false;
    //move the ship in current direction by public var phaseDistance
    transform.position = Vector3.Lerp(currentPosition, currentPosition+moveDirection*PhaseDistance, Time.deltaTime);
    //turn collisions back on
    collide.enabled = true;
}


function takeDamage(damage){

	health -= damage;

	//If player dies load main menu
	if(health <= 0){
    	Application.LoadLevel (0);
	}

	healthBar.value = health;
}

