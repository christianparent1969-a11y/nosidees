import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'

export default function NewIdea() {
  const { user, loading } = useAuth()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  if (loading) return <div className="container loading">Chargement…</div>

  if (!user) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Connecte-toi pour partager une idée.</h3>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/connexion')}>
            Se connecter
          </button>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!title.trim() || !content.trim()) {
      setError('Le titre et le contenu ne peuvent pas être vides.')
      return
    }
    setSaving(true)
    const { data, error: insertError } = await supabase
      .from('articles')
      .insert({
        title: title.trim(),
        content: content.trim(),
        author_id: user.id,
        author_name: user.user_metadata?.username || user.email,
      })
      .select()
      .single()
    setSaving(false)
    if (insertError) {
      setError("Une erreur est survenue, réessaie.")
      return
    }
    navigate(`/idee/${data.id}`)
  }

  return (
    <div className="container">
      <div className="form-page wide">
        <h1>Partager une idée</h1>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="title">Titre</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="En une phrase, quelle est ton idée ?"
            />
          </div>
          <div className="field">
            <label htmlFor="content">Développe ton idée</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écris librement…"
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={saving}>
              {saving ? 'Publication…' : 'Publier'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
