import './App.css';
import { useState } from 'react';

type Note = {
    id: number,
    title: string,
    content: string
}

const App = () => {

    const [notes, setNotes] = useState<Note[]>([
        {
            id: 1,
            title: "test note 1",
            content: "bla bla note1",
        },
        {
            id: 2,
            title: "test note 2 ",
            content: "bla bla note2",
        },
        {
            id: 3,
            title: "test note 3",
            content: "bla bla note3",
        },
        {
            id: 4,
            title: "test note 4 ",
            content: "bla bla note4",
        },
        {
            id: 5,
            title: "test note 5",
            content: "bla bla note5",
        },
        {
            id: 6,
            title: "test note 6",
            content: "bla bla note6",
        },
    ]);

    const [title, setTitle] = useState(''); //ties setTitle to be the mutator function
    const [content, setContent] = useState('');
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const handleNoteClick = (note: Note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
    }

    const handleAddNote = (event: React.FormEvent) => {
        event.preventDefault();

        const newNote: Note = {
            id: notes.length + 1,
            title: title,
            content: content,
        };
        setNotes([newNote, ...notes]);
        setTitle('');
        setContent('');
    };

    const handleUpdateNote = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedNote) {
            return
        } else {
            const updatedNote = {
                id: selectedNote.id,
                title: title,
                content: content,
            }
            const updatedNotesList = notes.map((note) => //map function iterates through the array that called it
                note.id === selectedNote.id ? updatedNote : note);
            setNotes(updatedNotesList);
            setTitle('');
            setContent('');
            setSelectedNote(null);
        }
    }
    const handleCancel = () => {
        setTitle('');
        setContent('');
        setSelectedNote(null);
    }

    return (
        <div className="app-container">
            <form
                className="note-form"
                onSubmit={(event) =>
                    selectedNote
                        ? handleUpdateNote(event)
                        : handleAddNote(event)}>
                <input
                    value={title}
                    onChange={(event) =>
                        setTitle(event.target.value)
                    }
                    placeholder="Title"
                    required />
                <textarea
                    value={content}
                    onChange={(event) =>
                        setContent(event.target.value)
                    }
                    placeholder="Content"
                    rows={10}
                    required />
                {selectedNote ? ( //conditionally renders elements VERY COOL
                    <div className='edit-buttons'>
                        <button type='submit'>Save</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                ) : (
                    <button type="submit">Add Note</button>
                )};

            </form>
            <div className="notes-grid">
                {notes.map((note) => (
                    <div
                        className="note-item"
                        onClick={() => handleNoteClick(note)}>
                        <div className="notes-header">
                            <button>x</button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default App;
