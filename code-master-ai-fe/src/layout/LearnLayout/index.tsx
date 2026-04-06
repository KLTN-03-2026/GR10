import Sidebar from "../../pages/lesson/sidebar";
import { lessons } from "../../pages/lesson/fakeData";
import { Outlet } from "react-router-dom";

const LearnLayout = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex">
      {/* SIDEBAR */}
      <Sidebar data={lessons} />

      {/* CONTENT */}
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LearnLayout;