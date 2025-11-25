import { useState, useEffect } from 'react';
import Loading from './components/Loading.jsx';
import { AppContext } from './context/context.js';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';

function App() {
  // --- CONFIGURATION ---
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  // --- API HELPER ---
  const api = axios.create({ baseURL: BACKEND_URL });

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
        <AppContext.Provider value={{ BACKEND_URL, api }}> 
        <Header />
        <Main />
        <Footer />
        </AppContext.Provider>
      </div>
  );
}

export default App;