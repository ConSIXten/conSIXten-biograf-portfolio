// Mock movie data for testing and fallback when API is unavailable
export const mockMovies = [
    {
        id: 1,
        title: "The Dark Knight",
        overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets.",
        poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
        release_date: "2008-07-18",
        vote_average: 9.0,
        vote_count: 32000,
        genre_ids: [28, 80, 18, 53],
        adult: false,
        original_language: "en",
        original_title: "The Dark Knight",
        popularity: 100.0,
        video: false
    },
    {
        id: 2,
        title: "Inception",
        overview: "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets is offered a chance to regain his old life as payment for a task considered to be impossible: \"inception\".",
        poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
        release_date: "2010-07-16",
        vote_average: 8.8,
        vote_count: 35000,
        genre_ids: [28, 878, 53],
        adult: false,
        original_language: "en",
        original_title: "Inception",
        popularity: 95.0,
        video: false
    },
    {
        id: 3,
        title: "Interstellar",
        overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
        poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        backdrop_path: "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
        release_date: "2014-11-07",
        vote_average: 8.6,
        vote_count: 33000,
        genre_ids: [12, 18, 878],
        adult: false,
        original_language: "en",
        original_title: "Interstellar",
        popularity: 90.0,
        video: false
    },
    {
        id: 4,
        title: "The Shawshank Redemption",
        overview: "Framed in the 1940s for the double murder of his wife and her lover, upstanding banker Andy Dufresne begins a new life at the Shawshank prison, where he puts his accounting skills to work for an amoral warden.",
        poster_path: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
        backdrop_path: "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
        release_date: "1994-09-23",
        vote_average: 9.3,
        vote_count: 25000,
        genre_ids: [18, 80],
        adult: false,
        original_language: "en",
        original_title: "The Shawshank Redemption",
        popularity: 85.0,
        video: false
    },
    {
        id: 5,
        title: "Pulp Fiction",
        overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
        poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
        backdrop_path: "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
        release_date: "1994-10-14",
        vote_average: 8.9,
        vote_count: 27000,
        genre_ids: [53, 80],
        adult: false,
        original_language: "en",
        original_title: "Pulp Fiction",
        popularity: 80.0,
        video: false
    }
];

export const mockMovieDetails = {
    id: 1,
    title: "The Dark Knight",
    overview: "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/hkBaDkMWbLaf8B1lsWsKX7Ew3Xq.jpg",
    release_date: "2008-07-18",
    vote_average: 9.0,
    vote_count: 32000,
    runtime: 152,
    genres: [
        { id: 28, name: "Action" },
        { id: 80, name: "Crime" },
        { id: 18, name: "Drama" },
        { id: 53, name: "Thriller" }
    ],
    credits: {
        crew: [
            {
                id: 525,
                name: "Christopher Nolan",
                job: "Director",
                department: "Directing"
            }
        ]
    },
    videos: {
        results: []
    },
    similar: {
        results: []
    }
};