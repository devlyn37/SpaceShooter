public var turnSpeed : int;
public var bullet : GameObject;
public var maxSpeed : int;
public var sensitivity : int = 3;
public var maxHealth : int = 100;

private var moveDirection : Vector3;
private var damage : int = 0;
private var shootMode : boolean;

function start(){
shootMode = false;
}

function Update(){

	if(Input.GetKeyDown("space")){
		shootMode = !shootMode;
	}

	if(shootMode){
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

        if (Input.GetButtonDown("Fire1")) {//take away Down on end for rapid fire
        // Create a new bullet at “transform.position” 
        // Which is the current position of the ship
        	var bull = Instantiate(bullet, currentPosition+moveDirection*.4, transform.rotation);//moveDirection*.4 is there to spawn the bullet slightly ahead of the spaceship
        	bull.GetComponent("Rigidbody2D").velocity = (10)*moveDirection;//moveSpeed part of bullet velocity, so it gets the ships velocity as well 
    	}

	}else{

		if(Input.GetKeyDown("up")){
			transform.position.y = transform.position.y+1;
			//transform.rotation = Quaternion.identity;
  	  		transform.rotation =  Quaternion.Euler( 0, 0, 0);
                             
		}
		if(Input.GetKeyDown("left")){
			transform.position.x = transform.position.x-1;
			//transform.rotation = Quaternion.identity+90;
  	  		transform.rotation = Quaternion.Euler( 0, 0, 90); 
                             
		}
		if(Input.GetKeyDown("down")){
			transform.position.y = transform.position.y-1;
			//transform.rotation = Quaternion.identity+180;
  	  		transform.rotation = Quaternion.Euler( 0, 0, 180);
                            
		}
		if(Input.GetKeyDown("right")){
			transform.position.x = transform.position.x+1;
		    targetAngle = Mathf.Atan2(1, 0) * Mathf.Rad2Deg;
  	  		transform.rotation = Quaternion.Euler( 0, 0, 270);
                            
		}

	}

}

function OnTriggerEnter2D(obj) {
    // Name of the object that collided with the enemy
    var name = obj.gameObject.name;

    // If the enemy collided with a bullet
    if (name == "enemy(Clone)") {

		//deplete health
        damage += 20;
        //if your health is too low game over
        //dont worry about destroying the enemy its own script handles that
        if(damage >= maxHealth){
        	Destroy(gameObject);

        }
    }

   
} 

