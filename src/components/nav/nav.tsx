import { Button, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { logout } from "@thoughtspot/visual-embed-sdk";

export const Nav = () => {
  const location = useLocation();
  return (
    <Menu
      style={{ position: "fixed", height: "48px", width: "100vw" }}
      selectedKeys={[location.pathname]}
      mode="horizontal"
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/liveboard">
        <Link to="/liveboard">Liveboard</Link>
      </Menu.Item>
      <Menu.Item key="/viz">
        <Link to="/viz">Viz</Link>
      </Menu.Item>
      <Menu.Item key="/search-bar">
        <Link to="/search-bar">Search Bar</Link>
      </Menu.Item>
      <Menu.Item key="/search">
        <Link to="/search">Search</Link>
      </Menu.Item>
      <Menu.Item key="/full">
        <Link to="/full">Full App</Link>
      </Menu.Item>
      <Menu.Item key="/multi-viz">
        <Link to="/multi-viz">Multi Viz</Link>
      </Menu.Item>
      <Menu.Item key="/api">
        <Link to="/api">REST Api</Link>
      </Menu.Item>
      <Menu.Item key="/prerender">
        <Link to="/prerender">Prerender</Link>
      </Menu.Item>
      <Menu.Item key="/viz-table">
        <Link to="/viz-table">Table Viz</Link>
      </Menu.Item>
      <Menu.Item key="logout" style={{ marginLeft: "auto" }}>
        <Button type="link" onClick={() => logout(true)}>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
};
