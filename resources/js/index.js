var notes;
var count = 0;

document.addEventListener("DOMContentLoaded", function() {
    notes = document.getElementById("notes");

    document.getElementById("create-note").addEventListener("click", createNote);
});

function createNote() {
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
        removeButton.setAttribute("id", "remove-button-" + ++count);
        removeButton.setAttribute("type", "button");
        removeButton.appendChild(document.createTextNode("X"));

        return removeButton;
    }

    function addNewNode() {
        var note = document.createElement("li");
        note.setAttribute("id", "note-id-" + count);
        note.appendChild(createNoteContainer());

        notes.appendChild(note);
    }

    function removeNote() {
        var note = document.getElementById("note-id-" + count);
        note.remove();
    }

    function addRemoveEvent() {
        document.getElementById("remove-button-" +count).addEventListener("click", removeNote);
    }

    addNewNode();
    addRemoveEvent();
}
