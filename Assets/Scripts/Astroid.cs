using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace completed
{

    public class Astroid : Fighter
    {

        // Use this for initialization
        void Start(){

        }

        // Update is called once per frame
        void Update(){
            var currentPosition = transform.position;
            var player = GameObject.FindGameObjectWithTag("Player").transform;

            Vector3 moveDirection = get2DDistanceVector(currentPosition, player.position);

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
                if (health <= 0) Destroy(gameObject);
            }

            if (name == "spaceship")
            {
                // Destroy itself (the enemy) to keep things simple
                Destroy(gameObject);
            }

        }
    }

}