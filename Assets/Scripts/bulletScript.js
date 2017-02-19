
//within unity, you can add this to ther inpector page of the space ship

// Public variable 
public var speed : int = 6;//since this is public we can edit it from unity!
//explain what the colon does

// Function called once when the bullet is created
function Start () {
    // Get the rigidbody component
  //  var r2d = GetComponent("Rigidbody2D");

    // Make the bullet move upward
   // r2d.velocity.y = speed;
}

// Function called when the object goes out of the screen
function OnBecameInvisible() {
    // Destroy the bullet 
    Destroy(gameObject);
} 