/**
 * Complete the implementation of parseStory.
    * 
    * parseStory retrieves the story as a single string from story.txt
    * (I have written this part for you).
    * 
    * In your code, you are required (please read this carefully):
    * - to return a list of objects
    * - each object should definitely have a field, `word`
    * - each object should maybe have a field, `pos` (part of speech)
    * 
    * So for example, the return value of this for the example story.txt
    * will be an object that looks like so (note the comma! periods should
    * be handled in the same way).
    * 
    * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
    * Output: [
    *  { word: "Louis", pos: "noun" },
    *  { word: "went", pos: "verb", },
    *  { word: "to", },
    *  { word: "the", },
    *  { word: "store", pos: "noun" }
    *  { word: "," }
    *  ....
    * 
    * There are multiple ways to do this, but you may want to use regular expressions.
    * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
    */
 function parseStory(rawStory) {

    // SPLIT THE TEXT INTO AN ARRAY OF STRINGS ON EACH MATCH OF THE REGULAR EXPRESSION.
    // YOU DON'T NEED THE G FLAG WHEN USING SPLIT
    let result = rawStory.split(/[,.\s]/);
    // \b IS BOUNDARY. THE BEGINNING OF A WORD.
    // \w+ MATCHES ALL ALPHANUMERIC CHARS
    // n|v|a MATCHES ANY OF THE ALTERNATIVES
    let posPart = /\b\w+\[(n|v|a)\]/g;
    let wordPart = /\b\w+\b/g;
  
    // THE ARRAY THAT CONTAINS OUR WORD OBJECTS
    const arrOfObj = [];
  
    // THE FOREACH LOOP THAT LOOPS THROUGH EACH SPLITTED STRING AND APPLIES OUR CONDITIONS
    result.forEach((e) => {
      // THE OBJECTS THAT WILL BE CREATED FOR EACH WORD
      let newObj = {};
      // IF THE STRING MATCHES OUR REGEX REQUIREMENTS (posPart), THEN...
      if (e.match(posPart)) {
        //IF THE STRING INCLUDES [n]...
        if (e.includes("[n]")) {
          //THEN TAKE THE SUBSTRING STARTING FROM THE BEGINNING ALL THE WAY UNTIL 3 CHARACTERS BEFORE THE END OF THE STRING
          let word = e.substring(0, e.length - 3);
          //ON THE SUBSTRING, APPLY OUR FUNCTION THAT CREATES CONTENT INSIDE newObj
          arrOfObj.push(createObjectWordAndPOS(newObj, word, "noun"));
        }
        if (e.includes("[v]")) {
          let word = e.substring(0, e.length - 3);
          arrOfObj.push(createObjectWordAndPOS(newObj, word, "verb"));
        }
        if (e.includes("[a]")) {
          let word = e.substring(0, e.length - 3);
          arrOfObj.push(createObjectWordAndPOS(newObj, word, "adjective"));
        }
        //OR, IF THE STRING MATCHES OUR OTHER REGEX REQUIREMENT (wordPart), THEN...
      } else if (e.match(wordPart)) {
        //ON THE STRING (NOT SUBSTRING BC THIS TIME THERE IS NO NEED TO CREATE SUBSTRING), APPLY OUR OTHER FUNCTION THAT CREATES CONTENT INSIDE newObj
        arrOfObj.push(createObjectWord(newObj, e));
      }
    });
    console.log(arrOfObj);
  
    //FUNCTION THAT WE APPLY ON REGULAR STRINGS (WITHOUT POS). CREATES THE WORD KEY AND ADDS THE STRING AS ITS VALUE
    function createObjectWord(obj, val) { //FONKSIYON ISMINI DEGISTIR
      obj["word"] = val;
      return obj;
    }
    //FUNCTION THAT WE APPLY ON POS STRINGS. CREATES THE ADDITIONAL pos KEY AND GIVES IT THE POS VALUE.
    function createObjectWordAndPOS(obj, wordVal, posVal) { //FONKSIYON ISMINI DEGISTIR
      obj["word"] = wordVal;
      obj["pos"] = posVal;
      return obj;
    }
    //RETURN THE ARRAY OF WORD OBJECTS
    return arrOfObj;
  }
  
  /**
   * All your other JavaScript code goes here, inside the function. Don't worry about
   * the `then` and `async` syntax for now.
   * 
   * You'll want to use the results of parseStory() to display the story on the page.
   */
  getRawStory().then(parseStory).then((processedStory) => {
    console.log(processedStory);
  });
  