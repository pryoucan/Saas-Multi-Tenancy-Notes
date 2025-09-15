const BASE_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('authToken');

const apiFetch = async (endpoint, options = {}) => {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    options.headers = headers;
    
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    const resData = await response.json();

    if (!response.ok) {
        throw { message: resData.message || 'Something went wrong', status: response.status };
    }
    return resData;
};

export const login = (credentials) => apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
});

export const getNotes = () => apiFetch('/notes');
export const createNote = (noteData) => apiFetch('/notes', {
    method: 'POST',
    body: JSON.stringify(noteData)
});
export const updateNote = (id, noteData) => apiFetch(`/notes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(noteData)
});
export const deleteNote = (id) => apiFetch(`/notes/${id}`, { method: 'DELETE' });