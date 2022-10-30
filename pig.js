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
      words[i] = words[i][0].toLowerCase()+words[i].slice(1);
      words[i] = words[i].replace(consonant, "$2$1ay"); //sends 1st pattern to the end, and adds "ay" to the end
      words[i] = i == 0 ? words[i][0].toUpperCase()+words[i].slice(1) : words[i]; //capitalizes 1st letter only if word is 1st in the sentence
    }
  }


  words = words.join(" ");

  pigLatinText.innerHTML = words; 
  
  //if user deletes all characters, initial message returns
  if(pigLatinText.innerHTML == "") {

    pigLatinText.innerHTML = "Pig Latin here...";
  }

}


englishText.addEventListener('input', function() {
  
  let string = englishText.value;
  
  pigLatin(string);
  
});

