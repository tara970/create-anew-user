import { Link } from "react-router-dom";

export const Navbar = () =>
{
    return (<div>
              <Link to = "/">Home</Link>
              <Link to = "/login">Login</Link>
              <Link to = "/users">Users</Link>
              <Link to = "/user">User</Link>
            </div>)
}