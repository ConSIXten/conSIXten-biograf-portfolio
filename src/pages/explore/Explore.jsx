import { useState } from 'react';
import TabToggle from '../../Components/tabToggle/TabToggle';
import TopMovies from '../../Components/topMovies/TopMovies';
import RecommendedMovies from '../../Components/recommendedMovies/RecommendedMovies';
import './Explore.css';

export default function Explore() {
    const [activeTab, setActiveTab] = useState('now-showing');

    const tabs = [
        { value: 'now-showing', label: 'Now Showing' },
        { value: 'upcoming', label: 'Upcoming' }
    ];

    return (
        <>
            <TabToggle
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs}
            />

            <TopMovies type={activeTab} />

            <RecommendedMovies />
        </>
    );
}