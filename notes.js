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
  
   getRawStory()
   .then(parseStory)
   .then((processedStory) => {
     madLibsEdit(processedStory);
     madLibsPreview()
     hotKey()
   });
 
 function madLibsEdit(story) {
   // CREATE THE DOM ELEMENTS WHERE THE EDIT AND PREVIEW PARAGRAPHS WILL BE
   const editDiv = document.querySelector(".madLibsEdit");
   const paragraph = document.createElement("p");
   const previewDiv = document.querySelector(".madLibsPreview");
   const preParagraph = document.createElement("p");
 
   editDiv.appendChild(paragraph);
   previewDiv.appendChild(preParagraph);
 
   // CREATE A COUNTER THAT WILL ASSIGN AN id FOR EACH INPUT AND PREVIEW FIELD
   let inputCounter = 0;
   let spanCounter = 0;
   
  // LOOP OVER EACH OBJECT IN THE ARRAY AND DO THE FOLLOWING
   story.forEach((e) => {
  // IF THE OBJECT INCLUDES THE noun PART OF SPEECH...
     if (e.pos === "noun") {
  // CREATE AN INPUT FIELD
       let input = document.createElement("input");
  // GIVE IT AN id BASED ON ITS ORDER; AND THE OTHER STUFF
       input.setAttribute("id", "input" + inputCounter);
       input.setAttribute("class", "input");
       input.setAttribute("placeholder", "noun");
       input.setAttribute("maxlength", "20");
  // INCREASE THE COUNTER
       inputCounter++;
  // ADD THE FIELD TO THE paragraph ELEMENT
       paragraph.appendChild(input);
 
  // CREATE A span ELEMENT
       const span = document.createElement("span");
  // GIVE IT AN id BASED ON ITS ORDER
       span.setAttribute("id", "span" + spanCounter);
  // GIVE 5 underscores AS ITS (INITIAL) VALUE
       span.innerHTML = "_____";
  // INCREASE THE COUNTER
       spanCounter++;
  // ADD THE SPAN TO THE PREVIEW PARAGRAPH
       preParagraph.appendChild(span);
 
     } else if (e.pos === "verb") {
       let input = document.createElement("input");
       input.setAttribute("type", "text");
       input.setAttribute("id", "input" + inputCounter);
       input.setAttribute("class", "input");
       input.setAttribute("placeholder", "verb");
       input.setAttribute("maxlength", "20");
       inputCounter++;
       paragraph.appendChild(input);
 
       const span = document.createElement("span");
       span.setAttribute("id", "span" + spanCounter);
       span.innerHTML = "_____";
       spanCounter++;
       preParagraph.appendChild(span);
 
     } else if (e.pos === "adjective") {
       let input = document.createElement("input");
       input.setAttribute("type", "text");
       input.setAttribute("id", "input" + inputCounter);
       input.setAttribute("class", "input");
       input.setAttribute("placeholder", "adjective");
       input.setAttribute("maxlength", "20");
       inputCounter++;
       paragraph.appendChild(input);
 
       const span = document.createElement("span");
       span.setAttribute("id", "span" + spanCounter);
       span.innerHTML = "_____";
       spanCounter++;
       preParagraph.appendChild(span);
 
  // IF THE OBJECT IS NOT POS...
     } else {
  // CREATE SPAN AREAS FOR EACH NORMAL (no POS) WORD AND ADD THEM TO THE EDIT AND PREVIEW PARAGRAPHS
       let normalWordEdit = document.createElement("span");
       let normalWordPreview = document.createElement("span");
       normalWordEdit.innerText = e.word + " ";
       normalWordPreview.innerText = e.word + ' ';
       paragraph.appendChild(normalWordEdit)
       preParagraph.appendChild(normalWordPreview);
     }
   }
 )}
 
  // THIS IS THE FUNCTION THAT TAKES THE USER INPUT FROM EACH INPUT FIELD AND ADDS IT TO ITS CORRESPONDING SPAN FIELD IN THE PREIVEW PARAGRAPH
 function madLibsPreview() {
   const inputLength = document.querySelectorAll("input").length
  // ITERATE OVER EACH INPUT FIELD AND...
   for (let i = 0; i < inputLength; i++) {
     const input = document.querySelector(`#input${i}`);
  // IF YOU FIND ANY USER INPUT...
     input.addEventListener("input", () => {
  // TAKE THAT INPUT DATA AND STORE IT
       localStorage.setItem(input.id, input.value)
       
       const span = document.querySelector(`#span${i}`);
  
  // USE THE id PART OF THE DATA TO FIND OUT WHERE TO SHOW THE USER'S TEXT INPUT IN THE PREVIEW AREA
       if (input.value){
         span.innerHTML = " " + input.value + " ";
  // IF YOU FIND NO INPUT IN AN INPUT FIELD, ITS CORRESPONDING SPAN AREA SHOULD REMAIN THE SAME
       } else {
         span.innerHTML = "_____";
       }
     })
   }
 }
 
 function hotKey() {
   let allInput = document.querySelectorAll(".input");
   for (let i = 0; i < allInput.length; i++) {
     allInput[i].addEventListener("keydown", function (event) {
       if (event.keyCode === 13) {
         event.preventDefault();
         if (allInput[i + 1]) {
           allInput[i + 1].focus();
         } else if (i === allInput.length - 1) {
           document.querySelector(`#input0`).focus();
         }
       }
     });
   }
 }