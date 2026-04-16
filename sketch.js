let stickyNote, textInput, panel;
let submitBtn, addStickyNoteBtn;
let responses = [];

function setup() {
  createCanvas(400, 400);

  // Create a panel div and style it.
  panel = createDiv('how are you feeling today?');
  panel.position(20, 300);
  panel.size(700, 200);
  panel.style('background', 'rgb(112,137,218)');
  panel.style('font-size', '30px');
  panel.style('padding', '5px');
  panel.style('text-align', 'center');
  
  // Create a text input and style it.
  textInput = createInput('');
  textInput.size(200);
  
  //Create submit btn
  submitBtn = createButton('submit');
  addStickyNoteBtn = createButton('new sticky note')
  submitBtn.style('font-size', '20px');
  addStickyNoteBtn.style('font-size', '20px');
  
  // Add input and btns to the panel.
  textInput.parent(panel);
  addStickyNoteBtn.parent(panel);
  submitBtn.parent(panel);

  // Call functions when buttons are pressed and when text is input.
  addStickyNoteBtn.mousePressed(newStickyNote);
  submitBtn.mousePressed(addStickyNote);
  textInput.input(handleInput);
}

// Update stickyNote's HTML when text is input.
function handleInput() {
  stickyNote.html(textInput.value());
}

// Create a new div element and style it
function newStickyNote() {
  stickyNote = createDiv('...');
  stickyNote.position(5, 5);
  // stickyNote.size(80, 20);
  stickyNote.style('font-size', '40px');
  stickyNote.style('background', 'orchid');
  // stickyNote.style('padding', '5px');
  
  // Make the note draggable.
  stickyNote.draggable();
}

// Add each sticky note to the array so it stays on screen
function addStickyNote() {
  console.log('submitted');
  responses.push(panel);
}

function draw() {
}