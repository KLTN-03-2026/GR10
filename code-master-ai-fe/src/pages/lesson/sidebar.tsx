import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ data }: any) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed top-[72px] left-0 h-[calc(100vh-72px)] w-5 group z-40">
      <aside className="absolute top-0 left-0 h-full w-72 bg-white shadow-xl transform -translate-x-full transition-all duration-300 group-hover:translate-x-0">

        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="font-bold text-brand-700">
            Nội dung khóa học
          </h2>
          <p className="text-sm text-gray-500">
            {data.length} bài học
          </p>
        </div>

        {/* LIST */}
        <ul className="p-4 space-y-2 overflow-y-auto h-[calc(100%-80px)]">
          {data.map((item: any) => {
            const active = location.pathname === item.path;

            return (
              <li
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`p-3 rounded-lg cursor-pointer transition
                  ${
                    active
                      ? "bg-brand-100 border-l-4 border-brand-500"
                      : "hover:bg-gray-100"
                  }`}
              >
                <div className="font-medium text-brand-700">
                  {item.title}
                </div>
                <div className="text-xs text-gray-500">
                  {item.description}
                </div>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;