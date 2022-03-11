import { Outlet, NavLink } from "react-router-dom";

function Navbar() {
    return <nav>
        <h2>Puzzle 2048</h2>
        <div className="links">
            <NavLink to="/"><i className="fa fa-home"></i></NavLink>
            <NavLink to="/leaderboard"><i className="fa fa-trophy"></i></NavLink>
        </div>
        <Outlet/>
    </nav>
}

export default Navbar;