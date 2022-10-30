let englishText = document.querySelector(".english-text");
let pigLatinText = document.querySelector(".pig-latin-text");


function pigLatin(str) {
    
  let words = str.split(" "); //turns user sentence into array separated at blank spaces

  let oneVowel = /^([aeiou])$/gi; //contains only one vowel
  let vowel = /^([aeiou]\w+)$/gi; //starts with a vowel, followed by other characters
  let novowel = /^([^aeiou][^aeiou]+)$/gi; //doesn't start with a vowel, or have any vowels in the word
  let consonant = /^([^aeiou]+)(\w+)$/gi; //doesn't start with a vowel, followed by other characters


  for(let i = 0; i < words.length; i++) {

    if(oneVowel.test(words[i])) {
      words[i] = words[i].replace(oneVowel, "$1way"); //if word contains only one vowel
    } else if(vowel.test(words[i])) {
      words[i] = words[i].replace(vowel, "$1way"); //if word starts /w a vowel, adds "way" at the end
    } 
    if(novowel.test(words[i])) {
      words[i] = words[i].replace(novowel, "$1ay"); //if word doesn't start or contain any vowels, adds "ay" at end
    } else if (consonant.test(words[i])) { //if word starts with a consonant, and contains vowels
      words[i] = words[i].replace(consonant, "$2$1ay"); //sends 1st consonant to the end, and adds "ay" to the end
    }
  }

  words = words.join(" ");

/*
  word = str[0].toLowerCase()+str.slice(1); //makes 1st consonant lowercase, adds rest of string
  word = word[1].toUpperCase()+word.slice(2); //makes new 1st letter uppercase, adds rest of string
*/
    
  pigLatinText.innerHTML = words; 

  if(pigLatinText.innerHTML == "") {
  //if user deletes all characters, initial message returns
    pigLatinText.innerHTML = "Pig Latin here...";
  }
}


englishText.addEventListener('input', function() {
  
  let string = englishText.value;
  
  pigLatin(string);
  
});

