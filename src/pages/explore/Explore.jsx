import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router';
import TabToggle from '../../Components/tabToggle/TabToggle';
import TopMovies from '../../Components/topMovies/TopMovies';
import RecommendedMovies from '../../Components/recommendedMovies/RecommendedMovies';
import SearchBar from '../../Components/SearchBar';
import './Explore.css';

export default function Explore() {
    const [activeTab, setActiveTab] = useState('now-showing');
    const [showSearch, setShowSearch] = useState(false);
    const { setSearchCallback } = useOutletContext();

    // Register search toggle function with Layout
    useEffect(() => {
        setSearchCallback(() => () => setShowSearch(!showSearch));
    }, [showSearch, setSearchCallback]);

    const tabs = [
        { value: 'now-showing', label: 'Now Showing' },
        { value: 'upcoming', label: 'Upcoming' }
    ];

    return (
        <>
            {showSearch && <SearchBar onClose={() => setShowSearch(false)} />}

            {!showSearch && (
                <>
                    <TabToggle
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                        tabs={tabs}
                    />

                    <TopMovies type={activeTab} />

                    <RecommendedMovies />
                </>
            )}
        </>
    );
}