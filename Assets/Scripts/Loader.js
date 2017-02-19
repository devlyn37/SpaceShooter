public var player : GameObject;
public var background : GameObject;
var velocity : Vector2;
var smoothTime : float = 0.1;

function start(){
		var startPos = transform.position;
		Instantiate(background, startPos, Quaternion.Identity);
		Instantiate(player, startPos, Quaternion.Identity);

}

function LateUpdate () {
	//Find the Player GameObject using it's tag and store a reference to its transform component.
	//var player1 = GameObject.FindGameObjectWithTag ("Player");
    //transform.position.x = Mathf.SmoothDamp (player1.position.x, player1.transform.position.x, velocity.x, smoothTime);
   // transform.position.y = Mathf.SmoothDamp (player1.position.y, player1.transform.position.y, velocity.y, smoothTime);
}

