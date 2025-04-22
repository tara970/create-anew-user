import { Link } from "react-router-dom";

export const Navbar = () =>
{
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
          <Link className="navbar-brand" to="/">MyApp</Link>
          <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                      <Link className="nav-link" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                      <Link className="nav-link" to="/users">Users</Link>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
    )
}