using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

namespace completed{

	public class Player : Fighter {

		public GameObject bullet;
        public UnityEngine.UI.Slider XPBar;
        public UnityEngine.UI.Text Info;

        public int phaseDistance;
		public int minDistanceForPhase;
        public int maxMousePlayerDistance;

        [HideInInspector]
        public float phaseCooldown;
        [HideInInspector]
        public float sensitivity;
        [HideInInspector]
        public float regen;
        [HideInInspector]
        public int xp;
        [HideInInspector]
        public int xpRequiredForLevelUp;
        [HideInInspector]
        public int killCount;
        [HideInInspector]
        public bool canPhase;

        public void gainXp(int amount) {
            xp += amount;
            if (xp > xpRequiredForLevelUp){
                levelUp();
                xp = 0;
            }
            XPBar.value = xp;
        }

        public void setInfoText(){
            string phaseStatus = (canPhase) ? "Ready" : "Not Ready";
            Info.text = "Level: " + level + " Kill Count: " + killCount + " "+ phaseStatus;
        }

        void levelUp(){
            level++;
            maxHealth += 10;
            regen += (float)0.02;
            maxSpeed += 10;
            sensitivity += (float)0.1;
            xpRequiredForLevelUp += (level) * xpRequiredForLevelUp;
            XPBar.maxValue = xpRequiredForLevelUp;
        }

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

		// Use this for initialization
		void Start () {
            level = 1;
            health = maxHealth;
            xpRequiredForLevelUp = 100;
            xp = 0;
            killCount = 0;
            sensitivity = 1;
            canPhase = true;
            phaseCooldown = 0;
            setInfoText();
            regen = (float)0.02;
		}
	
		// Update is called once per frame
		void Update () {
            //Health regen
            heal(regen);

			Vector3 currentPosition = transform.position;//just assigning a var because we'll use this a bunch of times

			//Find direction to go int
			Vector3 moveDirection = get2DDistanceVector(currentPosition, Camera.main.ScreenToWorldPoint(Input.mousePosition));

			//Use length of vector
			float mousePlayerDistance = moveDirection.magnitude;
            //cap the point at which length affects speed
            if (mousePlayerDistance > maxMousePlayerDistance) mousePlayerDistance = maxMousePlayerDistance;

			//find the direction vector, aka make the length one
			if(moveDirection != Vector3.zero)
				moveDirection.Normalize();

			pointTo(moveDirection);

			//set speed According to distance from ship to mouse 
			setSpeed(mousePlayerDistance*sensitivity);

			moveToward(currentPosition, moveDirection);

            // once he can't phase, and enough time passed 
            if (!canPhase && Time.time > phaseCooldown){ 
                canPhase = true; //Can now phase
                setInfoText();
            }

            if (Input.GetButtonDown("Fire1")) {//take away Down on end for rapid fire
				shootBullet(currentPosition, moveDirection);
			}

			if (Input.GetButtonDown("Fire2")) {//take away Down on end for rapid fire

				if(mousePlayerDistance > minDistanceForPhase && canPhase){
					phase(currentPosition, moveDirection);
                    phaseCooldown = Time.time + 3f;
                    canPhase = false;
                    setInfoText();
                }

			}

        }

        void OnTriggerEnter2D(Collider2D obj){
            //Name of the object that collided with the enemy
            var name = obj.gameObject.name;

            if (name == "enemy(Clone)")
            {
                takeDamage(25);
                if (health <= 0) SceneManager.LoadScene("MainScene");
            }
        }
    }
}
