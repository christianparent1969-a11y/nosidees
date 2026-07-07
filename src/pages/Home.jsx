import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'à l\'instant'
  if (mins < 60) return `il y a ${mins} min`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `il y a ${hours} h`
  const days = Math.floor(hours / 24)
  return `il y a ${days} j`
}

export default function Home() {
  const [ideas, setIdeas] = useState(null)

  useEffect(() => {
    let active = true
    supabase
      .from('articles')
      .select('id, title, content, author_name, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (active && !error) setIdeas(data)
        if (active && error) setIdeas([])
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="container">
      <section className="hero">
        <h1>Un lieu pour faire vivre des idées.</h1>
        <p>
          Foyer rassemble des idées écrites par des gens curieux. Lis ce qui se
          partage ici, ou allume la tienne.
        </p>
      </section>

      {ideas === null && <div className="loading">Chargement du foyer…</div>}

      {ideas && ideas.length === 0 && (
        <div className="empty-state">
          <h3>Le foyer est encore vide.</h3>
          <p>Sois le premier à y déposer une idée.</p>
        </div>
      )}

      <div className="feed">
        {ideas &&
          ideas.map((idea) => (
            <Link to={`/idee/${idea.id}`} className="idea-card" key={idea.id}>
              <div className="idea-meta">
                <span className="spark">●</span>
                {idea.author_name || 'Anonyme'} · {timeAgo(idea.created_at)}
              </div>
              <h2>{idea.title}</h2>
              <p>{idea.content}</p>
            </Link>
          ))}
      </div>
    </div>
  )
}
