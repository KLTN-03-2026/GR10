import { categories, courses, getCategoryBadgeClass } from "../../data/course";
import { use, useEffect } from "react";
import { CourseCard } from "../../components/courseCart";
import { CompassOutlined, SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useState } from "react";
import { GetCourses } from "../../api/course";
import { get } from "node:http";
export interface ICourse {
    _id: string;
    title: string;
    description: string;
    price: number;
    level: string;
    thumbnail: string;
    status: string;
    category: string;
}
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Phổ biến
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Giá tăng dần
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Giá giảm dần
            </a>
        ),
    },
];
export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = useState<number | string>('Tất cả');
    const [coursesData, setCourses] = useState<ICourse[]>([]);
    const filteredCourses = selectedCategory === 'Tất cả'
        ? coursesData
        : coursesData.filter(course => course.category === selectedCategory);
    useEffect(() => {
        const fetchCourses = async () => {
            const data = await GetCourses();
            setCourses(data);
            // console.log(data);
        };

        fetchCourses();
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
                            Khám phá các lộ trình học tập từ cơ bản đến nâng cao cùng chuyên gia AI
                            hàng đầu Việt Nam.
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

                <section className=" z-30 mb-10  ">
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col items-center gap-4 md:flex-row">
                            <div className="w-full md:flex-1">
                                <label className="flex items-center rounded-2xl border border-brand-100 bg-white px-5 py-3.5 shadow-sm">
                                    <span className="mr-3 text-slate-400"><SearchOutlined /></span>
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

                                {/* <select className="rounded-2xl border border-brand-100 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm outline-none">
                                    <option>Mới nhất</option>
                                    <option>Phổ biến</option>
                                    <option>Giá tăng dần</option>
                                    <option>Giá giảm dần</option>
                                </select> */}
                                <Dropdown menu={{ items }} placement="bottomLeft">
                                    <div className="rounded-2xl border flex gap-2 border-brand-100 bg-white px-6 py-3 cursor-pointer text-sm font-bold text-slate-700 shadow-sm outline-none">
                                        Mới nhất
                                        <div className="flex items-center font-bold">{<DownOutlined />}</div>
                                    </div>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="flex gap-2.5 overflow-x-auto pb-2">
                            {categories.map((category, index) => {
                                return (
                                    <button
                                        key={category}
                                        type="button"
                                        onClick={() => setSelectedCategory(category)}
                                        className={`whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-bold transition-all ${selectedCategory === category
                                            ? 'bg-brand-700 text-white shadow-lg'
                                            : 'border border-brand-100 bg-white text-slate-600 hover:bg-brand-25'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCourses.map((course) => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </section>

                <div className="mt-16 flex justify-center">
                    <button
                        type="button"
                        className="flex items-center gap-3 rounded-2xl border-2 border-brand-600 px-10 py-4 font-bold text-brand-700 transition-colors hover:bg-brand-50"
                    >
                        <span>Tải thêm khóa học</span>
                        <span>{<DownOutlined />}</span>
                    </button>
                </div>

                <section className="relative mt-24 overflow-hidden rounded-[2.5rem] bg-brand-700 p-10 text-white shadow-2xl md:p-16">
                    <div className="absolute right-0 top-0 h-full w-1/2 opacity-5">
                        <div className="h-full w-full rounded-full bg-white blur-3xl" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center justify-between gap-12 md:flex-row">
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="mb-6 text-3xl font-black leading-tight md:text-4xl">
                                Lộ trình học tập cá nhân hóa
                            </h2>
                            <p className="mb-8 max-w-xl text-lg font-medium leading-relaxed text-brand-100 md:text-xl">
                                Bạn chưa biết bắt đầu từ đâu? Hãy để AI của chúng tôi thiết kế lộ trình
                                riêng phù hợp với năng lực và mục tiêu của bạn.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                                {['Đánh giá năng lực', 'Tài liệu chọn lọc', 'Cam kết đầu ra'].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold backdrop-blur-sm"
                                    >
                                        <span className="text-brand-200">✔</span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            type="button"
                            className="shrink-0 rounded-2xl bg-white px-12 py-5 font-black text-brand-700 transition-all hover:scale-105 hover:bg-brand-50"
                        >
                            Khám phá ngay
                        </button>
                    </div>
                </section>

                <section className="mt-16 rounded-[2rem] border border-brand-100 bg-brand-50 px-6 py-16 text-center md:px-10">
                    <h2 className="mb-6 text-3xl font-black text-brand-700 md:text-4xl">
                        Hàng ngàn học viên đã thay đổi sự nghiệp
                    </h2>
                    <p className="mx-auto mb-12 max-w-4xl text-lg font-medium leading-relaxed text-slate-600 md:text-xl">
                        Bắt đầu hành trình chinh phục công nghệ cùng CodeMaster AI ngay hôm nay.
                    </p>
                    <button
                        type="button"
                        className="rounded-[1.5rem] bg-brand-600 px-14 py-5 text-xl font-black text-white shadow-xl transition-all hover:-translate-y-1 hover:bg-brand-700"
                    >
                        Bắt đầu học ngay
                    </button>
                </section>
            </div>
        </main>
    );
}
