document.addEventListener("DOMContentLoaded", function() {
    loadFromLocalStorage();

    document.getElementById("create-note").addEventListener("click", function () {
        createNote();
    });

    window.addEventListener("beforeunload", saveToLocalStorage);
});

function loadFromLocalStorage() {
    var storedNotes = localStorage.getItem("notes");

    if(storedNotes) {
        var notesArray = JSON.parse(storedNotes);

        for(var i = 0; i<notesArray.length; i++) {
            var storedNote = notesArray[i];
            createNote(storedNote.Title, storedNote.Content);
        }
    }
}

function saveToLocalStorage() {
    var notesArray = new Array();

    var notesContent = document.getElementsByClassName("note-container");

    if(notesContent) {
        for(var i = 0; i < notesContent.length; i++) {
            var title = notesContent[i].querySelector(".note-title").innerHTML;
            var content = notesContent[i].querySelector(".note-content").value;

            notesArray.push({Title: title, Content: content});
        }

        var jsonStr = JSON.stringify(notesArray);
        localStorage.setItem("notes", jsonStr);
    }
}

function createNote(title, content) {
    function createNoteContainer() {
        var noteContainer = document.createElement("div");
        noteContainer.setAttribute("class", "note-container");

        noteContainer.appendChild(createRemoveButton());
        noteContainer.appendChild(createNoteHeader());
        noteContainer.appendChild(createNoteContent());

        return noteContainer;
    }

    function createNoteHeader() {
        var noteHeader = document.createElement("h1");
        noteHeader.setAttribute("class", "note-title");
        noteHeader.setAttribute("contenteditable", "true");
        noteHeader.appendChild(document.createTextNode(("Edit me!")));

        return noteHeader;
    }

    function createNoteContent() {
        var noteContent = document.createElement("textarea");
        noteContent.setAttribute("class", "note-content");
        noteContent.setAttribute("placeholder", "Edit me!");

        return noteContent;
    }

    function createRemoveButton() {
        var removeButton = document.createElement("button");
        removeButton.setAttribute("class", "remove-button");
        removeButton.setAttribute("type", "button");
        removeButton.appendChild(document.createTextNode("X"));

        return removeButton;
    }

    function removeNote(note) {
        note.parentNode.removeChild(note);
    }

    function addRemoveEvent(note) {
        note.querySelector(".remove-button").addEventListener("click", function() {
            removeNote(note);
        });
    }

    function addNewNode(notes) {
        var note = document.createElement("li");
        note.appendChild(createNoteContainer());

        notes.appendChild(note);

        addRemoveEvent(note);
    }

    function setTitle(title) {
        if (title) {
            notes.lastElementChild.querySelector(".note-title").innerHTML = title;
        }
    }

    function setContent(content) {
        if (content) {
            notes.lastElementChild.querySelector(".note-content").innerHTML = content;
        }
    }

    var notes = document.getElementById("notes");

    addNewNode(notes);

    setTitle(title);
    setContent(content);
}
