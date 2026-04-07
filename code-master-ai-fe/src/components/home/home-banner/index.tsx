import React from "react";
import codeEditorImg from '../../../assets/Code Editor.png';
import { useNavigate } from "react-router-dom";
import AnimateOnScroll from "../../../utils/animateOnScroll";
const HomeBaner = () => {
    const navigate = useNavigate();
    return (
        <section className="h-[90vh] w-full bg-gradient-to-r from-brand-50 to-brand-200 flex items-center">
            <div className="w-full px-14 flex">
                <AnimateOnScroll defaultClasses="opacity-0 -translate-x-10">
                    <div className="flex-1 flex flex-col gap-2 justify-center">
                        <div className="font-medium text-brand-700 bg-brand-50 shadow-md  rounded-full flex items-center gap-2 w-fit px-4 py-1">
                            <div className="w-1 h-1 bg-brand-700 rounded-full "></div>
                            NỀN TẢNG HỌC TẬP AI THẾ HỆ MỚI</div>
                        <div className="text-6xl font-extrabold text-brand-700 mt-2">
                            Nâng tầm kỹ năng
                            lập trình cùng
                            <p className="text-brand-600">CodeMaster AI</p></div>
                        <div className="text-brand-700 font-light pr-24">Học lập trình từ con số 0 với lộ trình bài bản, hỗ trợ từ trí tuệ
                            nhân tạo và tham gia trực tiếp vào các dự án thực tế quy mô
                            lớn.</div>
                        <div className="flex justify-start space-x-3 mt-6">
                            <div onClick={() => navigate("/course")} className="font-medium shadow-sm bg-brand-600 text-white px-5 py-2 rounded-full cursor-pointer hover:bg-brand-700">Xem khóa học</div>
                            <div onClick={() => navigate("/course")} className="font-medium shadow-sm bg-white text-brand-600 px-5 py-2 rounded-full cursor-pointer hover:bg-brand-700">Bắt đầu học ngay</div>
                        </div>
                    </div>
                </AnimateOnScroll>
                <AnimateOnScroll defaultClasses="opacity-0 translate-x-10">

                    <div className="flex-1 flex justify-center">
                        <img src={codeEditorImg} alt="" className="max-w-md border-8 border-brand-50 rounded-3xl shadow-lg max-w-lg" />
                    </div>
                </AnimateOnScroll>
            </div>
        </section>
    )
}

export default HomeBaner;