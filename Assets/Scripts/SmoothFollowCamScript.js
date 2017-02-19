public var target : GameObject;
var velocity : Vector2;
var smoothTime : float = 0.1;

function Start () {
   
}

function LateUpdate () {
    transform.position.x = Mathf.SmoothDamp (transform.position.x, target.transform.position.x, velocity.x, smoothTime);
    transform.position.y = Mathf.SmoothDamp (transform.position.y, target.transform.position.y, velocity.y, smoothTime);
}
