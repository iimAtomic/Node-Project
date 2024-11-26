import React, { useState } from 'react';

const AddRecommendation = ({ cvId, onSuccess }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`/api/recommendations/${cvId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            if (response.ok) {
                setMessage('');
                onSuccess();
            } else {
                console.error('Erreur lors de l’ajout de la recommandation');
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                placeholder="Laissez une recommandation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
            />
            <button type="submit">Envoyer</button>
        </form>
    );
};

export default AddRecommendation;
