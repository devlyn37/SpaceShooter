using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.SceneManagement;

public class Menu : MonoBehaviour {

	public Canvas MainCanvas;

	void Awake(){
		
	}

	public void LoadOn(){
		SceneManager.LoadScene(1);
	}


}
