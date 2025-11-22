import React, { useState, useEffect } from 'react';
import Loading from './components/Loading.jsx';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';

// --- MAIN APP COMPONENT ---
function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const onLoad = () => setLoading(false)
    // mark loaded when window finishes loading
    window.addEventListener('load', onLoad)

    // fallback: ensure loading ends after 1.5s even if load event didn't fire
    const timer = setTimeout(() => setLoading(false), 1500)

    return () => {
      window.removeEventListener('load', onLoad)
      clearTimeout(timer)
    }
  }, [])

  if (loading) return <Loading />

  return (
      <div className="min-h-screen">
        <Header />
        <Main />
        <Footer />
      </div>
  );
}

export default App;