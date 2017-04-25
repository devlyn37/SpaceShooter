using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace completed
{

    public class Astroid : Fighter
    {

        // Use this for initialization
        void Start(){
            health = maxHealth;
        }

        // Update is called once per frame
        void Update(){
            Vector3 currentPosition = transform.position;
            GameObject player = GameObject.FindGameObjectWithTag("Player");
            

            Vector3 moveDirection = get2DDistanceVector(currentPosition, player.transform.position);

            //find the direction vector, aka make the length one
            if (moveDirection != Vector3.zero)
                moveDirection.Normalize();

            moveToward(currentPosition, moveDirection);
        }

        void OnTriggerEnter2D(Collider2D obj)
        {
            //Name of the object that collided with the enemy
            var name = obj.gameObject.name;

            if (name == "bullet(Clone)")
            {
                takeDamage(25);
                if (health <= 0){
                    //if an astroid is destoryed the player gains xp
                    GameObject player = GameObject.FindGameObjectWithTag("Player");
                    var playerInfo = player.GetComponent<Player>();
                    playerInfo.gainXp(10);
                    playerInfo.killCount++;
                    playerInfo.setInfoText();
                    Destroy(gameObject);
                }
            }

            if (name == "spaceship")
            {
                // Destroy itself (the enemy) to keep things simple
                Destroy(gameObject);
            }

        }
    }

}