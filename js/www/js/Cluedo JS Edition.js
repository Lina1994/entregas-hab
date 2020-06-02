"use strict";

/*En el ejercicio tendremos un array de sospechosos, 
cada uno con un nombre unos atributos físicos:

- Altura
- Color de ojos
- Tatuajes
- ...

Cada sospechoso además tiene una pista de quien ha sido 
el culpable de un crimen, por ejemplo. 
Uno puede saber que tiene los ojos de un cierto color. 
Cada sospechoso sabe sólo un dato del culpable y el propio 
culpable dará una pista verdadera, no mentirá. 
El dato de la pista es privado.

Tendremos un detective que se encargará de interrogar a 
los sospechosos y con los datos recopilados buscará al 
culpable.
*/

const names = ['Willy', 'Ivan', 'Ramiro'];
	const eyeColor = ['azul', 'marron', 'azul'];
	const height = ['bajo', 'alto', 'alto'];
	const tattooed = [true, false, false];
	const tip = [
	  {
	    height: 'alto',
	  },
	  {
	    eyeColor: 'marron',
	  },
	  {
	    tattooed: false,
	  },
	];
	
	class Suspect {
	  name;
	  eyeColor;
	  height;
	  tattooed;
	  #tip;
	  constructor(suspectData) {
	    this.name = suspectData.name;
	    this.eyeColor = suspectData.eyeColor;
	    this.height = suspectData.height;
	    this.tattooed = suspectData.tattooed;
	    this.#tip = suspectData.tip;
	  }
	}
	
	const mySuspect = new Suspect({
	  name: names[0],
	  eyeColor: eyeColor[0],
	  height: height[0],
	  tattoed: tattooed[0],
	  tip: tip[0],
	});
	
	const suspects = names.map((name, index) => {
	  return new Suspect({
	    name: name,
	    eyeColor: eyeColor[index],
	    height: height[index],
	    tattoed: tattooed[index],
	    tip: tip[index],
	  });
	});
	
	console.log(suspects);
