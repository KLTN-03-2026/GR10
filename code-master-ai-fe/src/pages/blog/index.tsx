import React from "react";
import { Link } from "react-router-dom";

const News = () => {
  return (
    <main className="bg-gray-50">

      {/* HEADER */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-500 uppercase">Bản tin học thuật</p>

        <h1 className="text-4xl font-extrabold mt-2 text-brand-700">
          Tin tức công nghệ
        </h1>

        <p className="text-gray-600 mt-3 max-w-2xl">
          Cập nhật xu hướng mới nhất về lập trình và công nghệ để không bao giờ
          bị bỏ lại phía sau trong kỷ nguyên số.
        </p>
      </section>

      {/* FEATURED + SIDEBAR */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-2">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995"
              className="w-full h-[320px] object-cover rounded-2xl"
              alt=""
            />

            {/* TAG */}
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full">
                AI
              </span>
              <span className="bg-white text-black text-xs px-2 py-1 rounded-full">
                NỔI BẬT
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4">
            15 Tháng 5, 2026
          </p>

          <h2 className="text-2xl font-bold mt-2 text-brand-700">
            Xu hướng AI trong năm 2026: Từ Generative sang Agentic AI
          </h2>

          <p className="text-gray-600 mt-2">
            Khám phá cách các hệ thống AI đang chuyển mình từ việc tạo nội dung
            sang thực hiện các nhiệm vụ phức tạp một cách độc lập trong môi trường doanh nghiệp.
          </p>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* SUBSCRIBE */}
          <div className="bg-brand-700 text-white p-6 rounded-2xl">
            <h3 className="font-semibold text-lg">
              Đăng ký nhận tin tức mới nhất
            </h3>

            <p className="text-sm mt-2 opacity-90">
              Nhận thông báo về các khóa học và xu hướng công nghệ hàng tuần qua email.
            </p>

            <input
              type="text"
              placeholder="Email của bạn"
              className="w-full mt-4 px-4 py-2 rounded-lg text-black outline-none"
            />

            <button className="w-full mt-3 bg-white text-black py-2 rounded-lg font-medium">
              Đăng ký ngay
            </button>
          </div>

          {/* TAGS */}
          <div className="bg-white p-6 rounded-2xl">
            <h3 className="font-semibold mb-3">Chủ đề phổ biến</h3>

            <div className="flex flex-wrap gap-2">
              {[
                "#Frontend",
                "#Python",
                "#Cloud",
                "#DevOps",
                "#MachineLearning",
              ].map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* LIST POSTS */}
      <section className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">

  {[
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
      tag: "FRONTEND",
      title: "React có còn là lựa chọn hàng đầu cho năm 2025?",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      tag: "BACKEND",
      title: "Top ngôn ngữ lập trình nên học trong năm nay",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      tag: "HỆ THỐNG",
      title: "Microservices vs Monolith: Lựa chọn nào cho Startup?",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      tag: "BẢO MẬT",
      title: "Bảo mật API trong kỷ nguyên AI",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tag: "DỮ LIỆU",
      title: "Tương lai của Kỹ sư Dữ liệu trong năm 2026",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      tag: "MOBILE",
      title: "Flutter vs React Native: Cuộc chiến không hồi kết",
    },
  ].map((item) => (
    
    <Link
      to={`/news/${item.id}`}
      key={item.id}
      className="space-y-3 block cursor-pointer"
    >

      <div className="relative">
        <img
          src={item.img}
          className="w-full h-40 object-cover rounded-2xl"
          alt=""
        />

        <span className="absolute bottom-3 left-3 bg-white text-xs px-2 py-1 rounded-full">
          {item.tag}
        </span>
      </div>

      <p className="text-xs text-gray-500">12 Tháng 5, 2024</p>

      <h3 className="font-semibold hover:text-brand-600">
        {item.title}
      </h3>

      <p className="text-sm text-gray-500">
        Đọc thêm →
      </p>

    </Link>

  ))}

</section>

      {/* PAGINATION */}
      <section className="pb-16 flex justify-center items-center gap-2">

        <button className="w-8 h-8 border rounded-full">‹</button>

        {[1, 2, 3, "...", 10].map((p, i) => (
          <button
            key={i}
            className={`w-8 h-8 rounded-full ${
              p === 1 ? "bg-brand-600 text-white" : "border"
            }`}
          >
            {p}
          </button>
        ))}

        <button className="w-8 h-8 border rounded-full">›</button>

      </section>

    </main>
  );
};

export default News;