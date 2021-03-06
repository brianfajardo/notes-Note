console.log('Starting notes.js');

const fs = require('fs');

// Fetching for the notes if it exists already
const fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
    let notes = fetchNotes();
    let note = {
        title, /* ES6 */
        body
    };

    // Filters out an array with duplicates, with `true` as flag
    // If same title exist, do not overwrite the existing key pair (--body)
    let duplicateNotes = notes.find((note) => note.title === title);

    // If is not a duplicate, update notes-data.json
    if (duplicateNotes === undefined) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
};

const getAll = () => {
    console.log('Getting all notes');
};

const getNote = (title) => {
    let notes = fetchNotes();
    let findNote = notes.find(note => note.title === title)
    return findNote
};

const removeNote = (title) => {
    let notes = fetchNotes();
    let filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

const logNote = (note) => {
    console.log('--------------------------')
    console.log(`Title: ${note.title}`)
    console.log(`Body: ${note.body}`)
}

module.exports = {
    addNote, /* same as "addNote: addNote" (ES6) */
    getAll,
    getNote,
    removeNote,
    logNote
};