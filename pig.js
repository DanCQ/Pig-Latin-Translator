function pigLatin(str) {
  
    let word = str;
    let vowel = /^([aeiou])(\w+)$/gi;
    let novowel = /^([^aeiou])([^aeiou]+)$/gi;
    let consonant = /^([^aeiou]+)(\w+)$/gi;
  
    if(vowel.test(str) ) {
      word = str.replace(vowel,"$1$2way");
    } else if (novowel.test(str)) {
      word = str.replace(novowel, "$1$2ay");
    } else if (consonant.test(str)) {
      word = str.replace(consonant,"$2$1ay");
    }
  
    console.log(word);
    return word;
  }