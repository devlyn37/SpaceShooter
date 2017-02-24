// Public variable that contains the speed of the enemy
var moveSpeed : int = 2;
public var maxHealth : int = 100;	
public var healthBar : UnityEngine.UI.Slider;  
private var moveDirection : Vector3;
private var health : int = maxHealth;


// Function called when the enemy is created
function Start () {
	healthBar.value = health;
}

function Update(){
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
    //Destroy the enemy
    //Destroy(gameObject);
} 

function OnTriggerEnter2D(obj) {
    // Name of the object that collided with the enemy
    var name = obj.gameObject.name;

    // If the enemy collided with a bullet
    if (name == "bullet(Clone)") {
        // Destroy itself (the enemy) and the bullet
        takeDamage(50);
        Destroy(obj.gameObject);
    }

    // If the enemy collided with the spaceship
    if (name == "spaceship") {
        // Destroy itself (the enemy) to keep things simple
        Destroy(gameObject);
    }

} 

function takeDamage(damage){

	health -= damage;

	//If player dies load main menu
	if(health <= 0){
    	Destroy(gameObject);
	}

	healthBar.value = health;
}
