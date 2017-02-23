using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace completed{

	public class Player : Fighter {

		public GameObject bullet;

		public int phaseDistance;
		public int sensitivity;
		public int minDistanceForPhase;

		void shootBullet(Vector3 currentPos, Vector3 moveDirection){
			var bull = Instantiate(bullet, currentPos+moveDirection*(float).4, transform.rotation);//moveDirection*.4 is there to spawn the bullet slightly ahead of the spaceship
            bull.GetComponent<Rigidbody2D>().velocity = (20 + speed) * moveDirection;
        }

		void phase(Vector3 currentPos, Vector3 moveDirection){
			//get the component for collision
			BoxCollider2D collide = (BoxCollider2D)GetComponent("BoxCollider2D");
			//turn it off
			collide.enabled = false;
			//move the ship in current direction by public var phaseDistance
			transform.position = Vector3.Lerp(currentPos, currentPos+(moveDirection*phaseDistance), Time.deltaTime);
			//turn collisions back on
			collide.enabled = true;
		}

		void OnTriggerEnter2D(GameObject obj) {
			//Name of the object that collided with the enemy
			var name = obj.gameObject.name;

			if (name == "enemy(Clone)") {
				takeDamage(25);
			}

		} 

		// Use this for initialization
		void Start () {
			
		}
	
		// Update is called once per frame
		void Update () {
			Vector3 currentPosition = transform.position;//just assigning a var because we'll use this a bunch of times

			//Find direction to go int
			Vector3 moveDirection = get2DDistanceVector(currentPosition, Camera.main.ScreenToWorldPoint(Input.mousePosition));

			//Use length of vector
			var mousePlayerDistance = moveDirection.magnitude;

			//find the direction vector, aka make the length one
			if(moveDirection != Vector3.zero)
				moveDirection.Normalize();

			pointTo(moveDirection);

			//set speed According to distance from ship to mouse 
			setSpeed(mousePlayerDistance*sensitivity);

			moveToward(currentPosition, moveDirection);

			if (Input.GetButtonDown("Fire1")) {//take away Down on end for rapid fire
				shootBullet(currentPosition, moveDirection);
			}

			if (Input.GetButtonDown("Fire2")) {//take away Down on end for rapid fire

				if(mousePlayerDistance > minDistanceForPhase){
					phase(currentPosition, moveDirection);
				}

			}
		}
	}
}
