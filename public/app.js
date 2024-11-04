// Selecting Elements
const noteBtn = document.querySelector(".note-button");
const notesContainer = document.querySelector(".notes-container");
let noteIdCounter = 0; // Counter for unique IDs

// Load notes from local storage on page load
window.onload = function () {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach((note) => createNote(note)); // Create notes from stored data
};

// Handle create note
function createNote(content = "") {
  noteIdCounter++; // Increment the counter for a new note ID
  const html = `
    <div class="note relative w-full max-w-[500px] min-h-[150px] bg-white text-[#333] p-5 outline-none rounded-md my-5" data-id="${noteIdCounter}">
        <p
          contenteditable="true"
          class="input-box outline-none"
          data-id="${noteIdCounter}"
          style="padding-right: 40px;"
        >${content}</p>
        <img
          class="absolute right-4 bottom-4 w-7 cursor-pointer delete-note"
          src="images/delete.png"
          data-id="${noteIdCounter}"
        />
    </div>    
  `;
  notesContainer.insertAdjacentHTML("beforeend", html);
  saveNotes(); // Save notes to local storage after adding a new one
}

// Save notes to local storage
function saveNotes() {
  const notes = [];
  const noteElements = notesContainer.querySelectorAll(".note");
  noteElements.forEach((note) => {
    const content = note.querySelector(".input-box").textContent;
    notes.push(content);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Event listener for the create note button
noteBtn.addEventListener("click", () => createNote());

// Event delegation for delete functionality
notesContainer.addEventListener("click", (event) => {
  // Check if the clicked element has the "delete-note" class
  if (event.target.classList.contains("delete-note")) {
    // Get the data-id from the delete icon
    const noteIdToDelete = event.target.getAttribute("data-id");

    // Find the specific note container with the matching data-id and remove it
    const noteToDelete = notesContainer.querySelector(
      `.note[data-id="${noteIdToDelete}"]`
    );

    if (noteToDelete) {
      noteToDelete.remove(); // Remove the entire note container from the DOM
    }
    saveNotes(); // Update local storage
  }
});
