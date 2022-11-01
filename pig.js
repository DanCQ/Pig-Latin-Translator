let englishText = document.querySelector(".english-text");
let pigLatinText = document.querySelector(".pig-latin-text");
let oink = new Audio("assets/oink.mp3");


window.onclick = function() {
  oink.play();
}


function pigLatin(str) {
    
  let words = str.split(" "); //turns user sentence into array separated at blank spaces

  let oneVowel = /^([aeiou])$/gi; //contains only one vowel
  let vowel = /^([aeiou][a-z]+)$/gi; //starts with a vowel, followed by other characters
  let novowel = /^([^aeiou][^aeiou]+)$/gi; //doesn't start with a vowel, or have any vowels in the word
  let consonant = /^([^aeiou@]+)([a-z]+)$/gi; //doesn't start with a vowel, followed by other characters

  let punctuation = /^([a-z]+|\s?)([^a-z]+)([a-z]+?|\s?|)$/ig; //matches special characters attached to a word
  let special = /[^a-z]+/ig; //targets the special character
  let position = 0; //to store special character index
  let size = 0; //to store length of word
  let target = ""; //used in for k loop


  //catches words with puctuations
  for(let k = 0; k < words.length; k++) {
     
    if(punctuation.test(words[k])) {

      target = words[k].match(special); //stores special character(s)
      position = words[k].indexOf(target); //stores index before alteration of special char
      size = words[k].length - 1; //stores length of word
      
      words[k] = words[k].replace(punctuation, "$1$3"); //deletes special chac from word

      //exact rules decribes below in for i loop
      if(oneVowel.test(words[k])) {
        words[k] = words[k].replace(oneVowel, "$1way"); 
      } else if(vowel.test(words[k])) {
        words[k] = words[k].replace(vowel, "$1way"); 
      } 
      if(novowel.test(words[k])) {
        words[k] = words[k].replace(novowel, "$1ay");
      } else if (consonant.test(words[k])) { 
        words[k] = words[k][0].toLowerCase()+words[k].slice(1);
        words[k] = words[k].replace(consonant, "$2$1ay"); 
        words[k] = k == 0 ? words[k][0].toUpperCase()+words[k].slice(1) : words[k]; 
      }

      //punctuation positioning after word alteration
      if(position == 0) { //if position was at the beginning adds to beginning
        words[k] = target + words[k];
      } else if(position == size) { //if position was at the end adds to the end
        words[k] = words[k] + target;
      } else {  
        words[k] = words[k].split(""); //the individual word is split into a single character array
        words[k].splice(position,0,target); //target is placed in its original recorded index
        words[k] = words[k].join(""); //the array is coverted back into a string
      }

    }
  }


  //transforms words without punctuation
  for(let i = 0; i < words.length; i++) {

    if(oneVowel.test(words[i])) {
      words[i] = words[i].replace(oneVowel, "$1way"); //if word contains only one vowel
    } else if(vowel.test(words[i])) {
      words[i] = words[i].replace(vowel, "$1way"); //if word starts /w a vowel, adds "way" at the end
    } 
    if(novowel.test(words[i])) {
      words[i] = words[i].replace(novowel, "$1ay"); //if word doesn't start or contain any vowels, adds "ay" at end
    } else if (consonant.test(words[i])) { //if word starts with a consonant, and contains vowels
      words[i] = words[i][0].toLowerCase()+words[i].slice(1);
      words[i] = words[i].replace(consonant, "$2$1ay"); //sends 1st pattern to the end, and adds "ay" to the end
      words[i] = i == 0 ? words[i][0].toUpperCase()+words[i].slice(1) : words[i]; //capitalizes 1st letter only if word is 1st in the sentence
    }
  }


  words = words.join(" "); //the words array is converted back into a string

  pigLatinText.innerHTML = words; //displays string in textbox
  
  //if user deletes all characters, initial message returns
  if(pigLatinText.innerHTML == "") {

    pigLatinText.innerHTML = "Pig Latin here...";
  }
  
}


englishText.addEventListener('input', function() {
  
  let string = englishText.value; //stores value from english text box
  
  pigLatin(string);
  
});

