import React from "react";
import { BookOpen, Pencil, HelpCircle, Code } from "lucide-react";
interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode; // component icon hoặc path
}
const featureList: FeatureItem[] = [
  {
    id: 1,
    title: "Bài học",
    description: "Video bài giảng chất lượng cao, súc tích và dễ hiểu.",
    icon: <BookOpen />
  },
  {
    id: 2,
    title: "Bài tập",
    description: "Hệ thống bài tập vận dụng ngay sau mỗi kiến thức mới.",
    icon: <Pencil />
  },
  {
    id: 3,
    title: "Quiz",
    description: "Kiểm tra nhanh kiến thức để củng cố nền tảng vững chắc.",
    icon: <HelpCircle />
  },
  {
    id: 4,
    title: "Thực hành Code",
    description: "Code trực tiếp trên trình duyệt với sự hỗ trợ của AI.",
    icon: <Code />
  }
];
const HomeRoute = () => {
  return (
    <div className="bg-brand-50 py-12 px-4 flex flex-col gap-12">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="w-72 text-2xl text-brand-700 font-bold text-center">
          Lộ trình học tập chuyên nghiệp
        </div>
        <div className="text-xs font-normal text-gray-600 w-2/6 text-center">Chúng tôi xây dựng quy trình học khép kín giúp bạn không chỉ hiểu lý thuyết mà còn
          thành thạo kỹ năng thực hành.</div>
      </div>
      <div className="flex gap-12 px-4">
        {featureList.map((item, index) => (
          <div key={index} className="flex flex-col bg-white rounded-3xl px-14 py-10 w-fit justify-center items-center text-center cursor-pointer transform transition-all duration-300 ease-out
    hover:-translate-y-2 hover:shadow-lg">
            <div className="rounded-full mb-6 text-brand-700 bg-brand-25 w-16 h-16 flex items-center justify-center">
              {item.icon}

            </div>
            <div className="text-lg font-semibold text-brand-700">{`${item.id}. ${item.title}`}</div>
            <div className="text-gray-600 ">{item.description}</div>
          </div>
        ))}
      </div>
    </div>

  )
}


export default HomeRoute;