import React, { useEffect, useState } from 'react';

const RecommendationList = ({ cvId }) => {
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await fetch(`/api/recommendations/${cvId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                // Vérifier si la réponse est ok
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des recommandations');
                }

                const data = await response.json();
                setRecommendations(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des recommandations', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [cvId]);

    if (loading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            {recommendations.length === 0 ? (
                <p>Aucune recommandation pour ce CV.</p>
            ) : (
                recommendations.map((rec) => (
                    <div key={rec._id}>
                        <p>{rec.message}</p>
                        <p><strong>Par :</strong> {rec.userId.username}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default RecommendationList;
