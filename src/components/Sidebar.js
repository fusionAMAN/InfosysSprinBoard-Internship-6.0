import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>🚦 Fleet Manager</h2>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/vehicles">Vehicles</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
