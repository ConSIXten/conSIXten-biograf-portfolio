import { NavLink } from "react-router"
import './navigation.scss'

export default function Navigation() {

    return (
        <nav className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore">Explore</NavLink>
            <NavLink to="/contact">Contact</NavLink>

        </nav>
    )
}