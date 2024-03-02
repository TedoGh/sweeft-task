import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-wrapper">
          <Link to={"/"}>
            <h1 style={{ fontWeight: "700" }}>Logo</h1>
          </Link>
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/history"} className="nav-link">
                  History
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
