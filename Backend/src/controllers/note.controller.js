import { Note } from '../models/note.model.js';

const createNote = async (req, res) => {
  try {
    const { noteTitle, noteContent } = req.body;

    if (!noteTitle) {
      return res.status(400).json({ message: 'Note title is required' });
    }

    const {_id: userId, tenantId } = req.user; 

    const note = await Note.create({
      noteTitle,
      noteContent,
      tenantId,
      authorId: userId,
    });

    return res.status(201).json(note);
  } catch (error) {
    return res.status(500).json({ message: 'Note creation failed', error: error.message });
  }
};


const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ tenantId: req.user.tenantId });

        return res.status(200).json(notes);

    } catch (error) {
        return res.status(404).json({ message: 'Notes not found', error: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.tenantId.toString() !== req.user.tenantId.toString()) {
            return res.status(404).json({ message: 'Note not found' });
        }

        return res.status(200).json(note);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch note', error: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { noteTitle, noteContent } = req.body;
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.tenantId.toString() !== req.user.tenantId.toString()) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.noteTitle = noteTitle || note.noteTitle;
        note.noteContent = noteContent !== undefined ? noteContent : note.noteContent;

        const updatedNote = await note.save();
        return res.status(200).json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: 'Failed to update note', error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        if (note.tenantId.toString() !== req.user.tenantId.toString()) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await Note.findByIdAndDelete(req.params.id);

        return res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Failed to delete note', error: error.message });
    }
};

export { createNote, getNotes, getNoteById, updateNote, deleteNote };