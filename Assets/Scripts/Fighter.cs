using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace completed{

	public abstract class Fighter : MonoBehaviour {
		public UnityEngine.UI.Slider healthBar;

       
        public int maxHealth;
		public int maxSpeed;
		public int turnSpeed;

        [HideInInspector]
        public int level;
        [HideInInspector]
        public double health;
        [HideInInspector]
        public float speed;


		public void takeDamage(int damage){
			health -= damage;
			healthBar.value = (int)health;
		}

        public void heal(double amount){
            health += amount;
            if (health > maxHealth){
                health = maxHealth;
            }
            healthBar.value = (int)health;
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

