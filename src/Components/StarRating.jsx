import './StarRating.css';

export default function StarRating({ rating, maxStars = 5 }) {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        const filled = i <= Math.round(rating);
        stars.push(
            <svg
                key={i}
                className={`star ${filled ? 'star-filled' : 'star-empty'}`}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill={filled ? "#FFA500" : "none"}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10 1L12.5 7.5H19L14 11.5L16.5 18L10 14L3.5 18L6 11.5L1 7.5H7.5L10 1Z"
                    fill={filled ? "#FFA500" : "none"}
                    stroke="#FFA500"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    return <div className="star-rating flex align-center gap-1">{stars}</div>;
}
