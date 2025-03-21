import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside style={{ width: "200px", background: "#ddd", padding: "10px", height: "100vh" }}>
      <h3>Sidebar</h3>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
