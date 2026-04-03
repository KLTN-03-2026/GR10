import { GetCategoryNames } from "../../data/course";
import { useEffect, useState } from "react";
import { CourseCard } from "../../components/courseCart";
import {
  CompassOutlined,
  SearchOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Dropdown, type MenuProps } from "antd";
import { GetCourses } from "../../api/course";

export interface ICourse {
  _id: string;
  title: string;
  description: string;
  price: number;
  level: string;
  thumbnail: string;
  status: string;
  category: {
    _id: string;
    category_name: string;
  };
}

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <span>Phổ biến</span>,
  },
  {
    key: "2",
    label: <span>Giá tăng dần</span>,
  },
  {
    key: "3",
    label: <span>Giá giảm dần</span>,
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tất cả");
  const [coursesData, setCourses] = useState<ICourse[]>([]);
  const [categories, setCategories] = useState<string[]>(["Tất cả"]);

  const filteredCourses =
    selectedCategory === "Tất cả"
      ? coursesData
      : coursesData.filter(
          (course) => course.category.category_name === selectedCategory
        );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesRes, categoryNames] = await Promise.all([
          GetCourses(),
          GetCategoryNames(),
        ]);

        setCourses(coursesRes.data);
        setCategories(["Tất cả", ...categoryNames]);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-brand-25 text-slate-800">
      <div className="mx-auto w-full max-w-7xl px-6 py-12 md:px-10 xl:px-0">
        <section className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-3xl font-black tracking-tight text-brand-700 md:text-5xl">
              Tất cả khóa học
            </h1>
            <p className="text-sm font-normal leading-relaxed text-slate-600 md:text-xl">
              Khám phá các lộ trình học tập từ cơ bản đến nâng cao cùng chuyên
              gia AI hàng đầu Việt Nam.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center">
            <button
              type="button"
              className="flex items-center gap-3 self-start rounded-2xl border border-brand-100 bg-gray-200 px-7 py-3.5 font-bold text-brand-700 transition-colors hover:bg-gray-100"
            >
              <CompassOutlined />
              <span>Nhận tư vấn lộ trình</span>
            </button>
          </div>
        </section>

        <section className="z-30 mb-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <div className="w-full md:flex-1">
                <label className="flex items-center rounded-2xl border border-brand-100 bg-white px-5 py-3.5 shadow-sm">
                  <span className="mr-3 text-slate-400">
                    <SearchOutlined />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm kiếm khóa học, kỹ năng, công nghệ..."
                    className="w-full border-none bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                  />
                </label>
              </div>

              <div className="flex w-full gap-3 overflow-x-auto pb-2 md:w-auto md:pb-0">
                <div className="flex rounded-2xl border border-brand-100 bg-white p-1 shadow-sm">
                  <button
                    type="button"
                    className="rounded-xl bg-brand-600 px-7 py-2.5 text-sm font-bold text-white shadow"
                  >
                    Miễn phí
                  </button>
                  <button
                    type="button"
                    className="rounded-xl px-7 py-2.5 text-sm font-bold text-slate-600 transition-colors hover:bg-brand-25"
                  >
                    Trả phí
                  </button>
                </div>

                <Dropdown menu={{ items }} placement="bottomLeft">
                  <div className="flex cursor-pointer gap-2 rounded-2xl border border-brand-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm outline-none">
                    Mới nhất
                    <div className="flex items-center font-bold">
                      <DownOutlined />
                    </div>
                  </div>
                </Dropdown>
              </div>
            </div>

            <div className="flex gap-2.5 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                    selectedCategory === category
                      ? "bg-brand-700 text-white shadow-lg"
                      : "border border-brand-100 bg-white text-slate-600 hover:bg-brand-25"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </section>
      </div>
    </main>
  );
}