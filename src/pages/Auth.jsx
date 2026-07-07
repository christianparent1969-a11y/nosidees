import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

export default function Auth() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setInfo('')
    setBusy(true)

    if (mode === 'signup') {
      const { data, error: signupError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { username: username.trim() || email.split('@')[0] } },
      })
      setBusy(false)
      if (signupError) {
        setError(signupError.message)
        return
      }
      if (data.session) {
        navigate('/')
      } else {
        setInfo('Compte créé ! Vérifie ta boîte mail pour confirmer ton adresse, puis connecte-toi.')
        setMode('login')
      }
    } else {
      const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
      setBusy(false)
      if (loginError) {
        setError(loginError.message)
        return
      }
      navigate('/')
    }
  }

  return (
    <div className="container">
      <div className="form-page">
        <h1>{mode === 'login' ? 'Se connecter' : 'Créer un compte'}</h1>
        {error && <div className="form-error">{error}</div>}
        {info && <div className="form-error" style={{ background: 'rgba(107,122,94,0.15)', borderColor: 'rgba(107,122,94,0.4)', color: '#a9c19a' }}>{info}</div>}
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="field">
              <label htmlFor="username">Nom affiché</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Comment veux-tu apparaître ?"
              />
            </div>
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="toi@exemple.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="6 caractères minimum"
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={busy}>
              {busy ? 'Un instant…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </div>
        </form>
        <div className="switch-link">
          {mode === 'login' ? (
            <>
              Pas encore de compte ?{' '}
              <button onClick={() => { setMode('signup'); setError(''); setInfo('') }}>Créer un compte</button>
            </>
          ) : (
            <>
              Déjà un compte ?{' '}
              <button onClick={() => { setMode('login'); setError(''); setInfo('') }}>Se connecter</button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
