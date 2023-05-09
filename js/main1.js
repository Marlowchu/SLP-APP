const draggableElements = document.querySelectorAll(".draggable");
const droppableElements = document.querySelectorAll(".droppable");

  const scoreSection = document.querySelector(".score");
  const correctSpan = scoreSection.querySelector(".correct");
  const totalSpan = scoreSection.querySelector(".total");
  const playAgainBtn = scoreSection.querySelector("#play-again-btn");

let correct = 0;
let total = 0;
let picks = [];
let pickid = "";
let red = []
let blue = []
let green = []
let yellow = []

draggableElements.forEach(elem => {
  elem.addEventListener("dragstart", dragStart); // Fires as soon as the user starts dragging an item - This is where we can define the drag data
  // elem.addEventListener("drag", drag); // Fires when a dragged item (element or text selection) is dragged
  // elem.addEventListener("dragend", dragEnd); // Fires when a drag operation ends (such as releasing a mouse button or hitting the Esc key) - After the dragend event, the drag and drop operation is complete

 // console.log(elem.attributes.getNamedItem("data").value);

  //elem.attributes.getNamedItem("data").value = JSON.parse(elem.id)

  switch(elem.attributes.getNamedItem("data").value) {

    case "red":
      red = JSON.parse(elem.id)
    break;
    case "blue":
      blue = JSON.parse(elem.id)
    break;
    case "green":
      green = JSON.parse(elem.id)
    break;
    case "yellow":
      yellow = JSON.parse(elem.id)
    break;

  }



});

droppableElements.forEach(elem => {
  elem.addEventListener("dragenter", dragEnter); // Fires when a dragged item enters a valid drop target
  elem.addEventListener("dragover", dragOver); // Fires when a dragged item is being dragged over a valid drop target, repeatedly while the draggable item is within the drop zone
  elem.addEventListener("dragleave", dragLeave); // Fires when a dragged item leaves a valid drop target
  elem.addEventListener("drop", drop); // Fires when an item is dropped on a valid drop target
});

// Drag and Drop Functions

//Events fired on the drag target

function dragStart(event) {
  //picks = JSON.parse(event.target.id)
  picks = event.target.attributes.getNamedItem("data").value
  pickid = event.target.id
  
  event.dataTransfer.setData("text", event.target.attributes.getNamedItem("data").value); // or "text/plain" but just "text" would also be fine since we are not setting any other type/format for data value
  
}

//Events fired on the drop target

function dragEnter(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.add("droppable-hover");
  }
}

function dragOver(event) {
  if(!event.target.classList.contains("dropped")) {
    event.preventDefault(); // Prevent default to allow drop
  }
}

function dragLeave(event) {
  if(!event.target.classList.contains("dropped")) {
    event.target.classList.remove("droppable-hover");
  }
}

function drop(event) {
  event.preventDefault(); // This is in order to prevent the browser default handling of the data
  event.target.classList.remove("droppable-hover");
  const draggableElementData = event.dataTransfer.getData("text"); // Get the dragged data. This method will return any data that was set to the same type in the setData() method
  const droppableElementData = event.target.getAttribute("data-draggable-id");
  let dragId = event.id;
  let isCorrectMatching = false;
  total++;

  switch(draggableElementData) {

    case "red":
      isCorrectMatching = match (red,droppableElementData);
    break;
    case "blue":
      isCorrectMatching = match (blue,droppableElementData);
    break;
    case "green":
      isCorrectMatching = match (green,droppableElementData);
    break;
    case "yellow":
      isCorrectMatching = match (yellow,droppableElementData);
    break;

  }

  
  //const isCorrectMatching = draggableElementData === droppableElementData;
  if(isCorrectMatching) {

    event.target.classList.add("droppable-correct");
    setTimeout(() => {
      event.target.classList.remove("droppable-correct");
    }, 300);

    const draggableElement = document.getElementById(pickid);
    // event.target.classList.add("dropped");
     event.target.style.backgroundColor = draggableElement.style.color; // This approach works only for inline styles. A more general approach would be the following: 
    event.target.style.backgroundColor = window.getComputedStyle(draggableElement).color;

    correct++;

// do this went nomore days are availible
    // draggableElement.classList.add("dragged");
    // draggableElement.setAttribute("draggable", "false");

    // event.target.insertAdjacentHTML("afterbegin", `<i class="fas fa-${draggableElementData}"></i>`);
  }
else {
  event.target.classList.add("droppable-incorrect");
  setTimeout(() => {
    event.target.classList.remove("droppable-incorrect");
  }, 300);
}
  scoreSection.style.opacity = 0;
    setTimeout(() => {
      correctSpan.textContent = correct;
      totalSpan.textContent = total;
      scoreSection.style.opacity = 1;
    }, 200);

    if (red.length == 0 && blue.length == 0 && green.length == 0 && yellow.length == 0 ) {
      
      playAgainBtn.style.display = "block";
      setTimeout(() => {
        playAgainBtn.classList.add("play-again-btn-entrance");
      }, 200);

    }
    // if (confirm ("Good Job!, play again?") == true) 
    // location.reload();

}

function match (med, day){
let yes = false
med.forEach(item => {

  if (!yes){

    if (item == day){

      let remove = null;
  
      switch(picks) {
  
        case "red":
          remove = red.indexOf(item)
          red.splice(remove, 1)   
          yes = true;
          if (red.length == 0){
            document.getElementById(pickid).classList.add("dragged");
            document.getElementById(pickid).setAttribute("draggable", "false");
          }
        break;
        case "blue":
          remove = blue.indexOf(item)
          blue.splice(remove, 1)   
          yes = true;
          if (blue.length == 0){
            document.getElementById(pickid).classList.add("dragged");
            document.getElementById(pickid).setAttribute("draggable", "false");
          }
        break;
        case "green":
          remove = green.indexOf(item)
          green.splice(remove, 1)   
          yes = true;
          if (green.length == 0){
            document.getElementById(pickid).classList.add("dragged");
            document.getElementById(pickid).setAttribute("draggable", "false");
          }
        break;
        case "yellow":
          remove = yellow.indexOf(item)
          yellow.splice(remove, 1)   
          yes = true;
          if (yellow.length == 0){
            document.getElementById(pickid).classList.add("dragged");
            document.getElementById(pickid).setAttribute("draggable", "false");
          }
        break;
    
      }
      
    }
  }



}) 

return yes;
}

