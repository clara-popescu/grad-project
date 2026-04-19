let stickyNote, textInput, panel, question;
let submitBtn;
let responses = [];
let isTyping = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  select('body').style('user-select', 'none'); // disable text selection when moving the answer

  // Create a panel div and style it.
  panel = createDiv('');
  panel.size(400, 100);
  panel.position(
    (windowWidth - panel.width) / 2,
    windowHeight - panel.height - 100
  );
  panel.style('border', '3px solid rgb(97,0,0)');
  panel.style('border-radius', '20px');
  panel.style('padding', '5px');
  
  // flex layout
  panel.style('display', 'flex');
  panel.style('flex-direction', 'column');
  panel.style('align-items', 'center');
  panel.style('gap', '10px'); // add spacing between elements
  
  // question and input
  question = createDiv('how are you feeling today?')
  panel.style('font-size', '30px');

  textInput = createInput('');
  textInput.size(200);
  
  submitBtn = createButton('submit');
  submitBtn.attribute('disabled', '');
  
  // Add input and btns to the panel.
  question.parent(panel);
  textInput.parent(panel);
  submitBtn.parent(panel);

  // Call functions when button is pressed and when text is input.
  submitBtn.mousePressed(addStickyNote);
  textInput.input(handleInput);
}

// Update stickyNote's HTML when text is input.
function handleInput() {
  // let value = textInput.value().trim();

  // disable if empty, enable if not
  if (textInput.value().trim().length === 0) {
    submitBtn.attribute('disabled', '');
  } else {
    submitBtn.removeAttribute('disabled');
  }
  
  // if the user started typing, create a new note
  if (!isTyping && textInput.value().length > 0) {
    newStickyNote();
    isTyping = true;
  }
  
  if (stickyNote) {
    stickyNote.html(textInput.value());    
  }
}

// Create a new div element and style it
function newStickyNote() {
  stickyNote = createDiv('...');
  stickyNote.position(5, 5);
  stickyNote.style('font-size', '40px');
  stickyNote.style('background', 'rgb(224,224,224)');
  stickyNote.style('padding', '5px 10px');
  stickyNote.style('border-radius', '20px');
  
  // Make the note draggable.
  stickyNote.draggable();
}

// Add each sticky note to the array so it stays on screen
function addStickyNote() {
  console.log('submitted');
  responses.push(stickyNote);
  
  stickyNote.style('background', 'rgb(182,182,182)');
  textInput.value('');
  submitBtn.attribute('disabled', '');
  isTyping = false;
}

function draw() {
}