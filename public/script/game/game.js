// enrty point of the whole game of life application
import GameEngine from "./game.engine/engine.js";
import RenderEngine from "./render.engine/render.js";

// import the patterns name from the pattern.json file to the select element
fetch("/script/game/data/patterns.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const select = document.getElementById("pattern");
    data.forEach((pattern) => {
      const option = document.createElement("option");
      option.value = pattern.name;
      option.textContent = pattern.name;
      select.appendChild(option);
    });
  });

// create a new game engine
const gameEngine = new GameEngine(new RenderEngine());

// Initialize CodeMirror
const patternEditor = document.querySelector(".pattern-editor");
const editorArea = document.getElementById("code");
var editor = CodeMirror.fromTextArea(editorArea, {
  lineNumbers: true, // Show line numbers
  mode: "javascript", // Set editor mode (e.g., JavaScript)
  theme: "default", // Set editor theme (optional)
});

// Set initial code content
var initialCode = `// pattern you need to add to the pattern library of the game of life
{
    "name" : "Your Pattern Name",
    "cells" : [
        [0, 0],
        [0, 1],
    ]
}
`;

editor.setValue(initialCode);

// add pattern button
const addBtn = document.getElementById("addPattern");
addBtn.addEventListener("click", () => {
  patternEditor.style.display = "flex";
});
// save button of the editor
const saveBtn = document.getElementById("editor-save");
saveBtn.addEventListener("click", () => {
  let code = editor.getValue();
  // Remove single line comments
  code = code.replace(/\/\/.*/g, "");

  // Remove multi-line comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, "");
  const pattern = JSON.parse(code);

  // check if the pattern is valid
  if (!pattern.name || !pattern.cells) {
    alert("Invalid pattern");
    return;
  }

  // save the pattern to the game pattern file
});

const cancelBtn = document.getElementById("editor-cancel");
cancelBtn.addEventListener("click", () => {
  patternEditor.style.display = "none";
});
