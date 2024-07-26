import { Link } from "react-router-dom";
import "../assets/css/header.css";
const Header = () => {
  return (
    <div className="header">
      <h3>
        <Link style={{ textDecoration: "none", color: "ghostwhite" }} to="/">
          Wellness Retreats
        </Link>
      </h3>
    </div>
  );
};

export default Header;
