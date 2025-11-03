import { Link, useLoaderData } from "react-router";



export default function Explore() {
    const usrs = useLoaderData();

    return (

        <ul>
            {usrs.map(user => (
                <li key={user.id}>
                    <Link to={`/explore/${user.id}`}>{user.name}</Link>
                </li>
            ))}
        </ul>

    )
}