import React from 'react';
import { useAuth } from '../context/AuthContext';

const NoteList = ({ notes, selectedNote, onSelectNote, onNewNote }) => {
    const { logout } = useAuth();
    return (
        <div className="sidebar">
            <div>
                <h2>My Notes</h2>
                <button onClick={onNewNote}>+ New Note</button>
                <ul className="note-list">
                    {notes.map(note => (
                        <li
                            key={note._id}
                            className={`note-list-item ${selectedNote && selectedNote._id === note._id ? 'selected' : ''}`}
                            onClick={() => onSelectNote(note)}
                        >
                            <h3>{note.noteTitle || 'Untitled Note'}</h3>
                        </li>
                    ))}
                </ul>
            </div>
            <button className="logout-button" onClick={logout}>Logout</button>
        </div>
    );
};

export default NoteList;