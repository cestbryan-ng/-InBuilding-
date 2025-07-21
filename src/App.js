import React, { useState } from 'react';
import './SumCalculator.css';

const SumCalculator = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [sum, setSum] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://votre-api.com/somme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre1: parseFloat(number1),
          nombre2: parseFloat(number2)
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors du calcul');
      }

      const data = await response.json();
      setSum(data.somme);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="calculator-container">
      <h2>Calculateur de somme</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="number1">Premier nombre:</label>
          <input
            id="number1"
            type="number"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="number2">Deuxième nombre:</label>
          <input
            id="number2"
            type="number"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Calcul en cours...' : 'Calculer la somme'}
        </button>
      </form>

      {sum !== null && (
        <div className="result">
          <h3>Résultat:</h3>
          <p>La somme est: {sum}</p>
        </div>
      )}

      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default SumCalculator;