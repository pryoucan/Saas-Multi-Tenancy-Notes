import React, { useState, useEffect } from 'react';

const NoteDetail = ({ note, onSave, onDelete }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        setTitle(note ? note.noteTitle : '');
        setContent(note ? note.noteContent : '');
    }, [note]);

    const handleSave = (e) => {
        e.preventDefault();
        onSave({ noteTitle: title, noteContent: content });
    };

    const handleDelete = (e) => {
        e.preventDefault();
        onDelete();
    }

    if (!note) {
        return <div className="main-content"><h2>Select a note or create a new one.</h2></div>;
    }

    return (
        <div className="main-content">
            <h2>{note._id ? 'Edit Note' : 'Create New Note'}</h2>
            <form onSubmit={handleSave} className="note-form">
                <input
                    type="text"
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Note Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="form-buttons">
                    <button type="submit">Save Note</button>
                    {note._id && (
                        <button className="delete-button" onClick={handleDelete}>Delete Note</button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default NoteDetail;