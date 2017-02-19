using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Menu : MonoBehaviour {

	public Canvas MainCanvas;

	void Awake(){
		
	}

	public void LoadOn(){
		Application.LoadLevel (1);
	}


}
