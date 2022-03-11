import { Outlet, NavLink } from "react-router-dom";

function Navbar() {
    return <nav>
        <h2>Puzzle 2048</h2>
        <div className="links">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/leaderboard">Leaderboard</NavLink>
        </div>
        <Outlet/>
    </nav>
}

export default Navbar;