import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './App1.css';

const App1 = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const connexion =  async () => {
        setError(null);
        setSuccess(false)

        if (username == '') {
            setError("Nom d'utilisateur vide");
            return;
        }
        if (password == '') {
            setError('Mot de passse vide');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/connexion', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la connexion');
            }

            const data = await response.json();
            if (!data.success) {
                throw new Error('Compte inexistant');
            }

            setId(data.id);
            setSuccess(true);
            setUsername('');
            setPassword('');
        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const inscription = () => {
        navigate('/inscription');
    }

    return (
        <div className='main-container'>
            <div className='decorative-image'>
                <img
                    src="./image/ordinateur-portable.png"
                    alt="Image décorative"
                />
            </div>

            <div className='connexion-container'>
                <h2 className='connexion-title'>Connexion</h2>
                <h3 className='connexion-title'>Acceder à notre plateforme en ligne de vente d'ordinateur</h3>
                <form>
                    <div className='champ'>
                        <label htmlFor='username'>Nom d'utilisateur</label>
                        <input
                            id='username'
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className='champ'>
                        <label htmlFor='password'>Mot de passe</label>
                        <div className='password-container'>
                            <input
                                id='password'
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button className='mdp' onClick={() => setShowPassword(!showPassword)} type='button'>
                                <img
                                    src={showPassword ? './image/montrer-le-mot-de-passe2.png' : './image/montrer-le-mot-de-passe.png'}
                                    style={{ width: '20px', height: '20px' }}
                                    alt="Toggle password visibility"
                                />
                            </button>
                        </div>
                        <div className='inscription'>
                            <button type='button' onClick={inscription}>
                                Pas de compte ? S'inscrire
                            </button>
                        </div>
                    </div>

                    <button type='button' disabled={loading} onClick={connexion}>
                        {loading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>

                {success && (
                    <div className='success'>
                        <label>Connexion réussie !</label>
                    </div>
                )}

                {error != null && (
                    <div className='error'>
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default App1;