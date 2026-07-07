import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'
import { supabase } from '../supabaseClient'

export default function Header() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="spark">●</span> Foyer
      </Link>
      <nav className="header-nav">
        {user ? (
          <>
            <Link to="/nouvelle-idee" className="btn btn-primary">
              Partager une idée
            </Link>
            <button className="btn btn-text" onClick={handleLogout}>
              Se déconnecter
            </button>
          </>
        ) : (
          <Link to="/connexion" className="btn">
            Se connecter
          </Link>
        )}
      </nav>
    </header>
  )
}
