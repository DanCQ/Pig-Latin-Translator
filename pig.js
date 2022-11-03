const englishText = document.querySelector(".english-text");
const h1 = document.querySelector(".h1");
const pigLatinText = document.querySelector(".pig-latin-text");


//allows viewing of background image on title click 
h1.addEventListener("click", function() { 
  const body = document.querySelector(".body");
  const footer = document.querySelector(".footer");
  const main = document.querySelector(".main");

  body.style.height = "100vh";
  body.style.width = "100vw";
  footer.style.visibility = "hidden";
  main.style.opacity = "0.0";

  setTimeout(function() {
    
    body.style.height = "auto";
    body.style.width = "auto";
    footer.style.visibility = "visible";
    main.style.opacity = "0.96";

  }, 4500); //waits 4.5 seconds to run
});

//plays pig sounds
window.onclick = function() {
  
  const oink = new Audio("assets/oink.mp3");
  
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


  //loop tests every word
  for(let i = 0; i < words.length; i++) {
    
    words[i] = specialTest(words[i]); //word[i] receives result from function call

  }
    
  
  function specialTest(word) {

    let specialCheck = false; //resets at function start
    word = word.split(""); //word is split into single character array
      
    //check each character for special character
    word.forEach(character => {
        
      if(special.test(character) | punctuation.test(character)) { 
          
        specialCheck = true; //only if it exists
      } 
    });

    word = word.join(""); //make array into string

    //assigns function result to word
    if(specialCheck) {
      word = specialSearch(word); //if true
    } else {
      word = notSpecial(word); //if false
    }

    return word; //sends result to for loop
  }

  
  //transforms words without punctuation
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
    let obj = {}; 
    let erase = {};

    word = word.split(""); //splits word into single character array

    //search for special character
    word.forEach(index => {

      obj = {  //reinitializes object
        character: "",
        position: 0
      }; 

      if(special.test(index)) { //test
        obj.character = index.match(special);  //stores the exact character
        obj.position = word.indexOf(index); //records position in word
        array.push(obj);  //sends object to array
      }
    });

    //delete special characters before alteration
    word.forEach(index => { 

      erase = {  //reinitializes object
        character: "",
        position: 0
      }; 

      if(special.test(index)) { //test
        erase.character = index.match(special);  //stores the exact character
        erase.position = word.indexOf(index);  //records position in word
        word.splice(erase.position,1); //deletes character from word
      }
    });

    word = word.join(""); //joins word array back to string

    //exact rules decribed above in notSpecial function
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
    array.forEach(obj => {  //iterates through every special character stored in array

      if(obj.position == 0) { //if position was at the beginning adds to beginning
        word = obj.character + word;
      } else if(obj.position == size && obj.character != "\'") { //if position was at the end adds to the end
        word = word + obj.character;
      } else if(conAnswer) {
        obj.position = obj.position - conMatch.length; //corrects for alteration placements
        word = word.split(""); //the individual word is split into a single character array
        word.splice(obj.position,0,obj.character); //target is placed in its original recorded index
        word = word.join(""); //the array is coverted back into a string 
      } else {
        word = word.split(""); //the individual word is split into a single character array
        word.splice(obj.position,0,obj.character); //target is placed in its original recorded index
        word = word.join(""); //the array is coverted back into a string     
      }
    });

    conAnswer = false; //resets if it was true 
    return word;
  }


  words = words.join(" "); //the words array is converted back into a string

  pigLatinText.innerHTML = words; //displays string in textbox
  
  //if user deletes all characters, initial message returns
  if(pigLatinText.innerHTML == "") {

    pigLatinText.innerHTML = "Pig Latin here...";
  }

}


//starts translation as user writes
englishText.addEventListener('input', function() {
  
  let string = englishText.value; //stores value from english text box
  
  pigLatin(string);

});

