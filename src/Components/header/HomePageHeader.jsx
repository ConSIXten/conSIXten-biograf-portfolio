import { useNavigate } from 'react-router';
import { useAuth } from '../../utilities/useAuth';
import './HomePageHeader.css';
import SearchBar from '../SearchBar';

export default function HomePageHeader() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleAvatarClick = () => {
        if (currentUser) {
            navigate('/profile');
        } else {
            navigate('/login');
        }
    };

    return (
        <>
            <div className="homepage-header">
                <div className="welcome-section">
                    {currentUser ? (
                        <>
                            <p className="welcome-text">Welcome Back,</p>
                            <h1 className="user-name">{currentUser.username}</h1>
                        </>
                    ) : (
                        <>
                            <p className="welcome-text">Get started here</p>
                            <button className="login-button bg-blue text-white font-bold" onClick={handleAvatarClick}>
                                Go to Log-In
                            </button>
                        </>
                    )}
                </div>
                <div className="profile-avatar" onClick={handleAvatarClick}>
                    <div className="avatar-placeholder">
                        <span>{currentUser ? currentUser.username.charAt(0) : '?'}</span>
                    </div>
                </div>
            </div>
            <div>
                <SearchBar />
            </div>
        </>
    );
}