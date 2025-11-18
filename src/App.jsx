import { useState } from 'react'
import './App.css'

function App() {
  const [notes, setNotes] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const addNote = () => {
    if (inputValue.trim()) {
      const newNote = {
        id: Date.now(),
        text: inputValue.trim(),
        createdAt: new Date().toLocaleString()
      }
      setNotes([...notes, newNote])
      setInputValue('')
    }
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addNote()
    }
  }

  return (
    <div className="app-container">
      <div className="app-header">
        <h1>📝 My Notes</h1>
        <p className="subtitle">Keep your thoughts organized</p>
      </div>

      <div className="input-section">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="🔍 Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="note-input-container">
          <textarea
            className="note-input"
            placeholder="Write your note here... (Press Enter to add)"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            rows="4"
          />
          <button className="add-button" onClick={addNote}>
            Add Note
          </button>
        </div>
      </div>

      <div className="notes-section">
        <div className="notes-header">
          <h2>Your Awesome Notes ({filteredNotes.length})</h2>
        </div>
        
        {filteredNotes.length === 0 ? (
          <div className="empty-state">
            <p>No notes yet. Start writing!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map(note => (
              <div key={note.id} className="note-card">
                <div className="note-content">
                  <p className="note-text">{note.text}</p>
                  <span className="note-date">{note.createdAt}</span>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => deleteNote(note.id)}
                  aria-label="Delete note"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
