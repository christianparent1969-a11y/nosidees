import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './AuthContext'
import Header from './components/Header'
import Home from './pages/Home'
import Article from './pages/Article'
import NewIdea from './pages/NewIdea'
import Auth from './pages/Auth'

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idee/:id" element={<Article />} />
          <Route path="/nouvelle-idee" element={<NewIdea />} />
          <Route path="/connexion" element={<Auth />} />
        </Routes>
        <footer className="footer">Foyer — un espace pour partager des idées</footer>
      </div>
    </AuthProvider>
  )
}
