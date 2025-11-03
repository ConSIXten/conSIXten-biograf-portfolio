import { NavLink } from 'react-router';
import './footer.css';

export default function Footer() {
    return (
        <footer className="bottom-navigation">
            <nav className="nav-container">
                <NavLink
                    to="/"
                    className="nav-item"
                    aria-label="Home"
                >
                    {({ isActive }) => (
                        <>
                            <svg
                                className="nav-icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={isActive ? "#54A8E5" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                                    stroke={isActive ? "#54A8E5" : "#8e95a9"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/explore"
                    className="nav-item"
                    aria-label="Explore"
                >
                    {({ isActive }) => (
                        <>
                            <svg
                                className="nav-icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke={isActive ? "#54A8E5" : "#8e95a9"}
                                    strokeWidth="2"
                                />
                                <path
                                    d="M16.2426 7.75736L14.1213 14.1213L7.75736 16.2426L9.87868 9.87868L16.2426 7.75736Z"
                                    fill={isActive ? "#54A8E5" : "#8e95a9"}
                                    stroke={isActive ? "#54A8E5" : "#8e95a9"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/saved"
                    className="nav-item"
                    aria-label="Saved"
                >
                    {({ isActive }) => (
                        <>
                            <svg
                                className="nav-icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill={isActive ? "#54A8E5" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                                    stroke={isActive ? "#54A8E5" : "#8e95a9"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to="/profile"
                    className="nav-item"
                    aria-label="Profile"
                >
                    {({ isActive }) => (
                        <>
                            <svg
                                className="nav-icon"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                                    stroke={isActive ? "#54A8E5" : "#8e95a9"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="12"
                                    cy="7"
                                    r="4"
                                    stroke={isActive ? "#54A8E5" : "#8e95a9"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </>
                    )}
                </NavLink>
            </nav>
        </footer>
    );
}
