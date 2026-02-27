import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function PublicLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default PublicLayout;