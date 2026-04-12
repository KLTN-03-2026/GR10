import { useParams } from "react-router-dom";
import { lessons } from "./fakeData";

const LessonPage = () => {
  const { id } = useParams();

  const lesson = lessons.find((l) => l.id === Number(id));

  if (!lesson || lesson.type !== "lesson") {
    return <div>Không có bài học</div>;
  }

  return (
    <>
      {/* CONTENT */}
      <div className="bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">
          {lesson.title}
        </h1>

        <p className="text-gray-500 mb-6">
          {lesson.description}
        </p>

        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {lesson.content}
        </div>
      </div>

      {/* COMPLETE SECTION */}
      <div className="mt-10 bg-brand-50 rounded-2xl p-6 text-center">
        <h3 className="font-semibold text-lg mb-2 text-brand-700">
          Bạn đã hoàn thành bài học này?
        </h3>

        <p className="text-brand-500 mb-6 text-sm">
          Đánh dấu hoàn thành để tiếp tục học và nhận chứng chỉ cuối khóa.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-brand-500 text-white px-6 py-2 rounded-full hover:bg-brand-700 transition">
            ✔ Hoàn thành bài học
          </button>

          <button className="border border-brand-300 px-6 py-2 rounded-full hover:bg-brand-100 transition">
            Bài học tiếp theo →
          </button>
        </div>
      </div>
    </>
  );
};

export default LessonPage;