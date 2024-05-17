let notes = JSON.parse(localStorage.getItem('notes')) || [];

function addOrUpdateNote() {
    const title = document.getElementById('noteTitle').value;
    const text = document.getElementById('noteText').value;
    const date = new Date().toLocaleString();
    const index = findNoteIndex(title);
    if (index !== -1) {
        notes[index].text = text;
        notes[index].date = date;
    } else {
        const note = { title, text, date };
        notes.push(note);
    }
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function findNoteIndex(title) {
    return notes.findIndex(note => note.title === title);
}

function displayNotes() {
    const noteList = document.getElementById('noteList');
    noteList.innerHTML = '';
    notes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        if (note.archived) noteItem.classList.add("archived");
        noteItem.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.text}</p>
            <p>Created at: ${note.date}</p>
            <button onclick="archiveNote(${index})" class="btn btn-primary">Archive</button>
            <button onclick="deleteNote(${index})" class="btn btn-danger">Delete</button>
            <button onclick="editNote('${note.title}')" class="btn btn-warning">Edit</button>
        `;
        noteList.appendChild(noteItem);
    });
}

function editNote(title) {
    const index = findNoteIndex(title);
    if (index !== -1) {
        document.getElementById('noteTitle').value = notes[index].title;
        document.getElementById('noteText').value = notes[index].text;
    }
}

function archiveNote(index) {
    notes[index].archived = true;
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

displayNotes();