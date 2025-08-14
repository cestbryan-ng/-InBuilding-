import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App1.css';

const App2 = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const inscription = async () => {
        setError(null);
        setSuccess(false);
        if (!verifiication(password)) return
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/inscription', {
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
                throw new Error('Erreur lors de l\'inscription');
            }

            const data = await response.json();
            if (!data.success) 
                throw new Error('Erreur d\'inscription');
            
            setSuccess(true);
            setUsername('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            console.error('Erreur:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const connexion = () => {
        navigate('/');
    }

    const verifiication = (password) => {
        if (username === '') {
            setError("Nom d'utilisateur vide");
            return false;
        }
        if (password === '') {
            setError('Mot de passse vide');
            return false;
        }
        if (confirmPassword === '') {
            setError('Confirmer le mot de passe');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas');
            return false;
        }
        if (password.length < 8) {
            setError('Choisir un mot de passe d\'au moins 8 caractères');
            return false;
        }
        if (password.toUpperCase() === password || password.toLowerCase() === password) {
            setError('Le mot de passe doit contenir des minuscules et des majuscules');
            return false;
        }
        let compteur = 0;
        let chiffres = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        for (let i = 0; i < password.length; i++) {
            if (chiffres.includes(password[i])) compteur++; 
        }
        if (compteur >= 2) {
            return true;
        } else {
            setError('Le mot de passe doit contenir au moins 2 chiffres');
            return false;
        }
    }

    return (
        <div className='main-container'>
            <div className='decorative-image'>
                <img
                    src="./image/enregistrement-en-ligne.png"
                    alt="Image décorative"
                />
            </div>

            <div className='connexion-container'>
                <h2 className='connexion-title'>Inscription</h2>
                <h3 className='connexion-title'>Créer un compte pour accéder à notre plateforme en ligne de vente d'ordinateur</h3>
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
                    </div>

                    <div className='champ'>
                        <label htmlFor='password'>Confirmer le mot de passe</label>
                        <div className='password-container'>
                            <input
                                id='password'
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button className='mdp' onClick={() => setShowConfirmPassword(!showConfirmPassword)} type='button'>
                                <img
                                    src={showConfirmPassword ? './image/montrer-le-mot-de-passe2.png' : './image/montrer-le-mot-de-passe.png'}
                                    style={{ width: '20px', height: '20px' }}
                                    alt="Toggle password visibility"
                                />
                            </button>
                        </div>
                        <div className='inscription'>
                            <button type='button' onClick={connexion}>
                                Déjà un compte ? Se connecter
                            </button>
                        </div>
                    </div>

                    <button type='button' disabled={loading} onClick={inscription}>
                        {loading ? 'Inscription en cours...' : 'S\'inscrire'}
                    </button>
                </form>

                {success && (
                    <div className='success'>
                        <label>Inscription réussie !</label>
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

export default App2;