using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace completed{

	public abstract class Fighter : MonoBehaviour {
		public UnityEngine.UI.Slider healthBar;

		public int health;
		public int maxSpeed;
		public int turnSpeed;
		public int level;

		public float speed;


		public void takeDamage(int damage){
			health -= damage;
			if (health <= 0) {
				Destroy (gameObject);
			}
			healthBar.value = health;
		}

		public void setSpeed(float newSpeed){
			speed = newSpeed;
			if (speed > maxSpeed) {
				speed = maxSpeed;
			}
		}

		public void pointTo(Vector3 moveDirection){
			float targetAngle = Mathf.Atan2(moveDirection.y, moveDirection.x) * Mathf.Rad2Deg;
			transform.rotation = Quaternion.Slerp( transform.rotation, 
				Quaternion.Euler( 0, 0, targetAngle+270 ), 
				turnSpeed * Time.deltaTime );
		}

		public void moveToward(Vector3 currentPosition, Vector3 moveDirection){
			Vector3 target = moveDirection*speed + currentPosition;
			transform.position = Vector3.Lerp( currentPosition, target, Time.deltaTime);
		}

		public Vector3 get2DDistanceVector(Vector3 from, Vector3 to){
			Vector3 moveDirection = to - from;
			moveDirection.z = 0;
			return moveDirection;
		}


	}

}

