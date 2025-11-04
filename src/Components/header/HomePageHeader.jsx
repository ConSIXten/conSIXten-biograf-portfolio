import './HomePageHeader.css';
import SearchBar from '../SearchBar';

export default function HomePageHeader() {
    const userName = "Osysyy";

    return (
        <>
        <div className="homepage-header">
            <div className="welcome-section">
                <p className="welcome-text">Welcome Back,</p>
                <h1 className="user-name">{userName}</h1>
            </div>
            <div className="profile-avatar">
                <div className="avatar-placeholder">
                    <span>{userName.charAt(0)}</span>
                </div>
            </div>
        </div>
        <div>
            <SearchBar />
        </div>
        </>
    );
}