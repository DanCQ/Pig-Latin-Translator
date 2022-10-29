let englishText = document.querySelector(".english-text");
let pigLatinText = document.querySelector(".pig-latin-text");


function pigLatin(str) {
    
    let word = str;
    let vowel = /^([aeiou])(\w+)$/gi; //starts with a vowel, followed by other characters
    let novowel = /^([^aeiou])([^aeiou]+)$/gi; //doesn't start with a vowel, or have any vowels in the word
    let consonant = /^([^aeiou]+)(\w+)$/gi; //doesn't start with a vowel, followed by other characters
  
    if(vowel.test(str) ) {
      word = str[0].toUpperCase()+str.slice(1); //makes new 1st letter uppercase, adds rest of string
      word = word.replace(vowel,"$1$2way"); //if word starts /w a vowel, adds "way" at the end
    } else if (novowel.test(str)) {
      word = str[0].toUpperCase()+str.slice(1); //makes new 1st letter uppercase, adds rest of string
      word = word.replace(novowel, "$1$2ay"); //if word doesn't start or contain any vowels, adds "ay" at end
    } else if (consonant.test(str)) { //if word starts with a consonant, and contains vowels
      word = str[0].toLowerCase()+str.slice(1); //makes 1st consonant lowercase, adds rest of string
      word = word.replace(consonant,"$2$1ay"); //sends 1st consonant to the end, and adds "ay" to the end
      word = word[0].toUpperCase()+word.slice(1); //makes new 1st letter uppercase, adds rest of string
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

