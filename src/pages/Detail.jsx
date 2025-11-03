import { useLoaderData } from "react-router"

export default function Detail() {
    const user = useLoaderData();

    return  (
        <>
        <p>user details</p>
        <h2>{user.name}</h2>
        </>

    )
}