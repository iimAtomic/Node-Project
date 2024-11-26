import React from 'react';
import AddRecommendation from '../components/AddRecommendation';
import RecommendationList from '../components/RecommendationList';

const CVDetailPage = ({ cvId }) => {
    return (
        <div>
            <h1>Détails du CV</h1>
            {/* Section des recommandations */}
            <h2>Recommandations</h2>
            <AddRecommendation cvId={cvId} onSuccess={() => window.location.reload()} />
            <RecommendationList cvId={cvId} />
        </div>
    );
};

export default CVDetailPage;
