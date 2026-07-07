import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'

export default function Article() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [idea, setIdea] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let active = true
    supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data, error }) => {
        if (!active) return
        if (error || !data) setNotFound(true)
        else setIdea(data)
      })
    return () => {
      active = false
    }
  }, [id])

  const handleDelete = async () => {
    if (!window.confirm('Supprimer définitivement cette idée ?')) return
    await supabase.from('articles').delete().eq('id', id)
    navigate('/')
  }

  if (notFound) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Cette idée n'existe plus.</h3>
          <Link to="/" className="btn" style={{ marginTop: 16 }}>
            Retour au foyer
          </Link>
        </div>
      </div>
    )
  }

  if (!idea) return <div className="container loading">Chargement…</div>

  const isAuthor = user && user.id === idea.author_id

  return (
    <div className="container">
      <div className="article-page">
        <div className="idea-meta">
          <span className="spark">●</span>
          {idea.author_name || 'Anonyme'} ·{' '}
          {new Date(idea.created_at).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <h1>{idea.title}</h1>
        <div className="article-body">{idea.content}</div>

        {isAuthor && (
          <div className="article-actions">
            <button className="btn" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
