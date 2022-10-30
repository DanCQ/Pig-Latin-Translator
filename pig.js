let englishText = document.querySelector(".english-text");
let pigLatinText = document.querySelector(".pig-latin-text");


function pigLatin(str) {
    
  let word = str;
  let oneVowel = /\s?([aeiou])\s?/gi //contains only one vowel
  let vowel = /\s?([aeiou]\w+)\s?/gi; //starts with a vowel, followed by other characters
  let novowel = /\s?([^aeiou][^aeiou]+)\s?/gi; //doesn't start with a vowel, or have any vowels in the word
  let consonant = /\s?([^aeiou]+)(\w+)\s?/gi; //doesn't start with a vowel, followed by other characters
  

  if(oneVowel.test(str)) {

    word = str[0].toUpperCase()+str.slice(1); //makes new 1st letter uppercase, adds rest of string
    word = word.replace(oneVowel, " $1way "); //if word contains only one vowel
  }
  if(vowel.test(str)) {

    word = str[0].toUpperCase()+str.slice(1); //makes new 1st letter uppercase, adds rest of string
    word = word.replace(vowel, " $1way "); //if word starts /w a vowel, adds "way" at the end
  } 
  if(novowel.test(str)) {
    word = str.replace(novowel, " $1ay "); //if word doesn't start or contain any vowels, adds "ay" at end
  }
  if (consonant.test(str)) { //if word starts with a consonant, and contains vowels
    word = str[0].toLowerCase()+str.slice(1); //makes 1st consonant lowercase, adds rest of string
    word = word.replace(consonant, " $2$1ay "); //sends 1st consonant to the end, and adds "ay" to the end
    word = word[1].toUpperCase()+word.slice(2); //makes new 1st letter uppercase, adds rest of string
  }
    

  pigLatinText.innerHTML = word; 

  if(pigLatinText.innerHTML == "") {
  //if user deletes all characters, initial message returns
    pigLatinText.innerHTML = "Pig Latin here...";
  }
}


englishText.addEventListener('input', function() {
  
  let string = englishText.value;
  
  pigLatin(string);
  
});

