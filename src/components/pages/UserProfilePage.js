import React, { useEffect, useState } from 'react';

const UserProfilePage = () => {
    const [recommendations, setRecommendations] = useState([]);

    // Récupérer les recommandations de l'utilisateur
    useEffect(() => {
        const fetchUserRecommendations = async () => {
            try {
                const response = await fetch('/api/recommendations/user', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setRecommendations(data);
                } else {
                    console.error('Erreur lors de la récupération des recommandations');
                }
            } catch (error) {
                console.error('Erreur réseau :', error);
            }
        };

        fetchUserRecommendations();
    }, []);

    // Supprimer une recommandation
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/recommendations/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                setRecommendations((prev) => prev.filter((rec) => rec._id !== id));
            } else {
                console.error('Erreur lors de la suppression de la recommandation');
            }
        } catch (error) {
            console.error('Erreur réseau :', error);
        }
    };

    return (
        <div>
            <h1>Recommandations reçues</h1>
            {recommendations.map((rec) => (
                <div key={rec._id}>
                    <p>{rec.message}</p>
                    <button onClick={() => handleDelete(rec._id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
};

export default UserProfilePage;
