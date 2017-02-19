public var turnSpeed : int;
public var bullet : GameObject;
public var maxSpeed : int;
public var sensitivity : int = 3;
public var maxHealth : int = 100;
public var PhaseDistance : int = 150;
public var DistanceForPhase : int = 5;

private var moveDirection : Vector3;
private var damage : int = 0;

function start(){

	

}

function Update(){

    var currentPosition = transform.position;//just assigning a var because we'll use this a bunch of times

    //find move direction
    var moveToward = Camera.main.ScreenToWorldPoint(Input.mousePosition);
    moveDirection = moveToward - currentPosition;
    moveDirection.z = 0; 

    var distanceBetweenMouseAndPlayer = moveDirection.magnitude;
    
    //find the direction vector, aka make the length one
    if(moveDirection != Vector2.Zero)
        moveDirection.Normalize();

    //rotate character towards mouse
    var targetAngle = Mathf.Atan2(moveDirection.y, moveDirection.x) * Mathf.Rad2Deg;
    transform.rotation = Quaternion.Slerp( transform.rotation, 
                         Quaternion.Euler( 0, 0, targetAngle+270 ), 
                         turnSpeed * Time.deltaTime );
    
    //move character topwards mouse
    var moveSpeed = distanceBetweenMouseAndPlayer*sensitivity;//adjust speed based on how far away the mouse and player are from eachother

    if(moveSpeed>maxSpeed){//cap the speed
	moveSpeed = maxSpeed;
	}

    var target = moveDirection*moveSpeed + currentPosition;
    transform.position = Vector3.Lerp( currentPosition, target, Time.deltaTime);
    
    //shoot bullet
    if (Input.GetButtonDown("Fire1")) {//take away Down on end for rapid fire
        // Create a new bullet at “transform.position” 
        // Which is the current position of the ship
        var bull = Instantiate(bullet, currentPosition+moveDirection*.4, transform.rotation);//moveDirection*.4 is there to spawn the bullet slightly ahead of the spaceship

        bull.GetComponent("Rigidbody2D").velocity = (20+moveSpeed)*moveDirection;//moveSpeed part of bullet velocity, so it gets the ships velocity as well 

    }

     if (Input.GetButtonDown("Fire2")) {//take away Down on end for rapid fire

     	if(distanceBetweenMouseAndPlayer > DistanceForPhase){
     		var collide = GetComponent("BoxCollider2D");
     		collide.enabled = false;
        	transform.position = Vector3.Lerp(currentPosition, currentPosition+moveDirection*PhaseDistance, Time.deltaTime);
        	collide.enabled = true;
        }

    }
}

function OnTriggerEnter2D(obj) {
    // Name of the object that collided with the enemy
    var name = obj.gameObject.name;

    if (name == "enemy(Clone)") {

		//deplete health
        damage += 25;
        //if your health is too low game over
        //dont worry about destroying the enemy its own script handles that
        if(damage >= maxHealth){
        	Application.LoadLevel (0);
        }
    }

   
} 





/*var depth = 5.0;
public var bullet : GameObject;
var thrust =5;


function Update() {

    var r2d = GetComponent("Rigidbody2D");

    var mousePos = Input.mousePosition;

    var wantedPos = Camera.main.ScreenToWorldPoint(Vector3(mousePos.x, mousePos.y, depth));

    r2d.velocity = wantedPos;

    if (Input.GetKeyDown("space")) {//getdownisd
        // Create a new bullet at “transform.position” 
        // Which is the current position of the ship
        // Quaternion.identity = add the bullet with no rotation
        Instantiate(bullet, transform.position, Quaternion.identity);
    }
}*/