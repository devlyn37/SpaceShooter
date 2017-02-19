// Public variable that contains the speed of the enemy
var moveSpeed : int = 2;

private var moveDirection : Vector3;
private var animator : Animator;	

// Function called when the enemy is created
function Start () {
	animator = GetComponent("Animator");
}

function Update(){
	animator = GetComponent("Animator");
 	var currentPosition = transform.position;
	var player = GameObject.FindGameObjectWithTag ("Player").transform;

	moveDirection = player.position - currentPosition;
    moveDirection.z = 0; 

    //find the direction vector, aka make the length one
    if(moveDirection != Vector2.Zero)
        moveDirection.Normalize();

	var target = moveDirection*moveSpeed + currentPosition;
    transform.position = Vector3.Lerp( currentPosition, target, Time.deltaTime);
   
}

// Function called when the object goes out of the screen
function OnBecameInvisible() {
    // Destroy the enemy
    //Destroy(gameObject);
} 

function OnTriggerEnter2D(obj) {
    // Name of the object that collided with the enemy
    var name = obj.gameObject.name;

    // If the enemy collided with a bullet
    if (name == "bullet(Clone)") {
        // Destroy itself (the enemy) and the bullet
        Destroy(gameObject);
        Destroy(obj.gameObject);
    }

    // If the enemy collided with the spaceship
    if (name == "spaceship") {
        // Destroy itself (the enemy) to keep things simple
        Destroy(gameObject);
    }
} 