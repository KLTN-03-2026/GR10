import React from "react";
import { posts } from "../../../data/home/news";
import { ExportOutlined } from "@ant-design/icons";
import AnimateOnScroll from "../../../utils/animateOnScroll";
const HomeNews = () => {
    return (
        <AnimateOnScroll>
            <div className="flex flex-col gap-8 px-12 py-12 bg-white">
                <div className="text-2xl text-brand-700 font-bold shadow-sm">Tin tức công nghệ</div>
                <div className="flex gap-10">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-brand-25 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
                        >
                            {/* IMAGE */}
                            <div className="h-56 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* CONTENT */}
                            <div className="p-6 flex flex-col gap-2 flex-1">
                                <p className="text-xs font-bold text-brand-700 uppercase tracking-wide">
                                    {post.category}
                                </p>

                                <h3 className="text-lg font-bold text-brand-700 line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                                    {post.description}
                                </p>

                                <p className="text-brand-700 font-bold flex items-center gap-2 mt-2">
                                    Đọc thêm
                                    <ExportOutlined />
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimateOnScroll>
    )
}


export default HomeNews;