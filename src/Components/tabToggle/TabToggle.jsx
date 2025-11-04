import './TabToggle.css';

export default function TabToggle({ activeTab, onTabChange, tabs }) {
    return (
        <div className="tab-toggle-container flex gap-3 p-4 bg-dark-secondary rounded-lg m-4">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    className={`tab-toggle-button flex-1 p-3 rounded fs-base font-semibold cursor-pointer transition ${activeTab === tab.value ? 'active' : ''}`}
                    onClick={() => onTabChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}
