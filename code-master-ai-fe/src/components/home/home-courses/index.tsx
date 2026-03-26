import React from "react";
import { allCourses } from "../../../data/home/courses";
import { courseOptions } from "../../../data/home/courses";
import { ShoppingCartOutlined } from "@ant-design/icons";

const HomeCourses = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('tat-ca');
    const filteredCourses = selectedCategory === 'tat-ca' ? allCourses.slice(0, 2) : allCourses.filter(course => course.category === selectedCategory).slice(0, 2);
    return (
        <div className="w-full h-[70vh] py-12 px-4 flex flex-col gap-6 ">
            <div className="text-2xl font-bold text-brand-700 text-center">
                Tất cả khóa học
            </div>
            <div className="flex justify-center  gap-4">
                {courseOptions.map((item, index) => (

                    <div key={index} className={`text-gray-600 text-sm w-fit bg-gray-100 font-bold rounded-full py-2 px-5 cursor-pointer hover:bg-gray-200 transition-colors duration-300 ${selectedCategory === item.value ? 'bg-green-900 text-white hover:bg-green-900 hover:cursor-not-allowed' : ''}`} onClick={() => setSelectedCategory(item.value)}>
                        {item.label}
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {filteredCourses.map((item, index) => (
                    <div key={index} className="flex justify-between ">
                        <div className="flex gap-4 items-center">
                            <div>
                                <img src={item.image} alt={item.title} className="w-52 h-24 object-cover rounded-lg" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-lg font-bold text-brand-600">{item.title}</div>
                                <div className="text-sm font-normal text-gray-500">{`${item.lessons} bài học • ${item.duration}`}</div>
                                <div className="text-xs font-normal text-gray-500">{`Học viên: ${item.students} • cập nhật: ${item.updatedAt}`}</div>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <div>
                                <div className="text-lg font-bold text-brand-700">{item.price.toLocaleString('vi-VN')}đ</div>
                                <div className="flex justify-end text-gray-500 text-xs line-through">{item.oldPrice?.toLocaleString('vi-VN')}đ</div>
                            </div>

                            <button className="bg-brand-500 text-white py-2 px-4 rounded-lg hover:bg-brand-600 transition-colors duration-300">
                                <ShoppingCartOutlined />
                            </button>

                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <div className="text-base font-bold text-brand-600 border border-2 rounded-full border-brand-600 px-4 py-2  cursor-pointer hover:bg-gray-100 hover:text-green-900 transition-colors duration-300">
                    Tải thêm khóa học
                </div>
            </div>
        </div>
    )
}


export default HomeCourses;