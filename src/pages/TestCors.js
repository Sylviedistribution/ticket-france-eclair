import React from 'react';
import TestCors from './TestCors'; // adapte le chemin si nécessaire

function TestCors() {
    useEffect(() => {
      axios.get('http://localhost:8000/api/user/test', {
        withCredentials: true, // Important si tu utilises Sanctum ou les cookies
      })
      .then(response => {
        console.log("✅ Réponse reçue :", response.data);
      })
      .catch(error => {
        console.error("❌ Erreur CORS ou serveur :", error);
      });
    }, []);
  
    return <div>Test CORS lancé. Regarde la console.</div>;
  }
  
  export default TestCors;
