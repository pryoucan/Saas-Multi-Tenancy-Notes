import React, { useState, useEffect } from 'react';
import NoteList from '../components/NoteList';
import NoteDetail from '../components/NoteDetail';
import * as api from '../services/api';

const NotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);

    const refreshNotes = async () => {
        try {
            setError(null);
            setIsLoading(true);
            const fetchedNotes = await api.getNotes();
            setNotes(fetchedNotes);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        refreshNotes();
    }, []);

    const handleSelectNote = (note) => setSelectedNote(note);
    const handleNewNote = () => setSelectedNote({ noteTitle: '', noteContent: '' });

    const handleSaveNote = async (noteData) => {
        try {
            setError(null);
            if (selectedNote && selectedNote._id) {
                await api.updateNote(selectedNote._id, noteData);
            } else {
                await api.createNote(noteData);
            }
            await refreshNotes();
            setSelectedNote(null);
        } catch (err) {
            if (err.status === 403) {
                setShowUpgradeModal(true);
            } else {
                setError(err.message);
            }
        }
    };

    const handleDeleteNote = async () => {
        if (selectedNote && selectedNote._id && window.confirm('Are you sure you want to delete this note?')) {
            try {
                setError(null);
                await api.deleteNote(selectedNote._id);
                await refreshNotes();
                setSelectedNote(null);
            } catch (err) {
                setError(err.message);
            }
        }
    };

    if (isLoading) return <div className="loading">Loading Notes...</div>;

    return (
        <div className="app-container">
            {error && <div className="error-toast">{error}</div>}
            <NoteList
                notes={notes}
                selectedNote={selectedNote}
                onSelectNote={handleSelectNote}
                onNewNote={handleNewNote}
            />
            <NoteDetail
                note={selectedNote}
                onSave={handleSaveNote}
                onDelete={handleDeleteNote}
            />
            {showUpgradeModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Free Plan Limit Reached</h2>
                        <p>You have reached the maximum of 3 notes for the Free plan.</p>
                        <button onClick={() => alert('Upgrade functionality is handled by an Admin.')}>Upgrade to Pro</button>
                        <button className="close-button" onClick={() => setShowUpgradeModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesPage;