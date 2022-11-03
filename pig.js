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
  let consonant = /^([^aeiou]+)([a-z]+)$/gi; //doesn't start with a vowel, followed by other characters
  let punctuation = /^([a-z]+|\s?)([^a-z]+)([a-z]+?|\s?)$/gi; //catches special characters attached to words

  let capital = /^([A-Z])$/; //to target capital letters
  let capAnswer = false; // for capital letter test

  let special = /[^a-z]+/gi; //targets the special character


  
  for(let i = 0; i < words.length; i++) {
    
    words[i] = specialTest(words[i]);

  }
    
  function specialTest(word) {

    let specialCheck = false;
    word = word.split("");
      
    //check each character for special character
    word.forEach(character => {
        
      if(special.test(character) | punctuation.test(character)) { 
          
        specialCheck = true; //if it exists
      } 
    });

    word = word.join("");

    if(specialCheck) {
      word = specialSearch(word);
    } else {
      word = notSpecial(word);
    }

    return word;
  }


  function notSpecial(word) {

    if(oneVowel.test(word)) {
      word = word.replace(oneVowel, "$1way"); //if word contains only one vowel
    } else if(vowel.test(word)) {
      word = word.replace(vowel, "$1way"); //if word starts /w a vowel, adds "way" at the end
    } 
    if(novowel.test(word)) {
      word = word.replace(novowel, "$1ay"); //if word doesn't start or contain any vowels, adds "ay" at end
    } else if (consonant.test(word)) { //if word starts with a consonant, and contains vowels
     
      if(capital.test(word[0])) { //checks to see if 1st letter was capital
        capAnswer = true;
      }

      word = word[0].toLowerCase()+word.slice(1); //alteration moves 1st pattern to the back, so lowecase
      word = word.replace(consonant, "$2$1ay"); //sends 1st pattern to the end, and adds "ay" to the end
      
      if(capAnswer) {  //capitalizes 1st letter of word only if it was capital before alteration
        word = word[0].toUpperCase()+word.slice(1); 
        capAnswer = false;
      }
    }

    return word;
  }


  //transforms words with puctuations  
  function specialSearch(word) {

    let conMatch = ""; //to store consonant cluster match
    let conAnswer = false; //for consonant test
    let size = word.length - 1; //stores length of word
    let array = [];

    let obj = {
      character: "",
      position: 0
    }; 

    word = word.split("");

    word.forEach(index => {
      if(special.test(index)) {
        obj.character = index.match(special);
        obj.position = word.indexOf(index);
        array.push(obj);
        word.splice(obj.position,1);
        index--;
      }
    });

    word = word.join("");

    //exact rules decribed above in for i loop
    if(oneVowel.test(word)) {
      word = word.replace(oneVowel, "$1way"); 
    } else if(vowel.test(word)) {
      word = word.replace(vowel, "$1way"); 
    } 
    if(novowel.test(word)) {
      word = word.replace(novowel, "$1ay");
    } else if (consonant.test(word)) { 
      
      conAnswer = true; //for later use in positioning test below

      if(capital.test(word[0])) {  //checks to see if 1st letter was capital
        capAnswer = true;
      }
      
      conMatch = word.replace(consonant, "$1"); //store 1st consonant cluster
      word = word[0].toLowerCase()+word.slice(1);
      word = word.replace(consonant, "$2$1ay");

      if(capAnswer) {  //capitalizes 1st letter of word only if it was capital before alteration
        word = word[0].toUpperCase()+word.slice(1); 
        capAnswer = false; //reset
      }
    }

    //punctuation positioning after word alteration
    if(obj.position == 0) { //if position was at the beginning adds to beginning
      word = obj.character + word;
    } else if(obj.position == size && obj.character != "\'") { //if position was at the end adds to the end
      word = word + obj.character;
    } else if(conAnswer) {
      obj.position = obj.position - conMatch.length; //corrects for alteration placements
      word = word.split(""); //the individual word is split into a single character array
      word.splice(obj.position,0,obj.character); //target is placed in its original recorded index
      word = word.join(""); //the array is coverted back into a string     
      conAnswer = false; //prevents this section from running if false
    } else {
      word = word.split(""); //the individual word is split into a single character array
      word.splice(obj.position,0,obj.character); //target is placed in its original recorded index
      word = word.join(""); //the array is coverted back into a string     
    }

    return word;
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

