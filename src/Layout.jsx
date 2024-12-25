import React, { useState } from "react";
import Header from "./component/Header/Header.jsx";
import Sidebar from "./component/Sidebar.jsx";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 ml-64 md:ml-0 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
