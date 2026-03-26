import { CheckCircleOutlined, CodeOutlined, CodepenOutlined, EyeOutlined, ManOutlined, RobotOutlined, RocketOutlined } from "@ant-design/icons";
import React from "react";

const Introduce = () => {
  return (
    <main className="bg-gray-50">

      {/* HERO */}
      <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div>
            <span className="bg-brand-100 text-brand-700 px-4 py-1 rounded-full text-sm font-semibold">
              VỀ CHÚNG TÔI
            </span>

            <h1 className="text-4xl md:text-5xl font-extrabold mt-6 leading-tight">
              Cách mạng hóa <br />
              việc học <span className="text-brand-500">Lập trình</span> với AI
            </h1>

            <p className="text-gray-600 mt-5 max-w-xl">
              CodeMaster AI không chỉ là một nền tảng học tập trực tuyến thông
              thường. Chúng tôi kết hợp lộ trình bài bản, bài tập thực hành phong
              phú và sức mạnh của trí tuệ nhân tạo để cá nhân hóa hành trình trở thành
              kỹ sư phần mềm của bạn.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-brand-500 text-white px-6 py-3 rounded-xl shadow hover:bg-brand-600 transition">
                Bắt đầu ngay
              </button>

              <button className="bg-white px-6 py-3 rounded-xl hover:bg-gray-200 transition">
                Tìm hiểu thêm
              </button>
            </div>
          </div>


          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              className="rounded-2xl shadow-xl w-full object-cover"
              alt=""
            />
          </div>

        </div>
      </section>

      {/* MISSION */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <RocketOutlined className="text-3xl"/>
            <h3 className="font-semibold text-lg mb-3">Sứ mệnh</h3>
            <p className="text-gray-600">
              Cung cấp nền tảng học lập trình chất lượng cao, dễ tiếp cận cho
              mọi người thông qua công nghệ hiện đại. Chúng tôi tin rằng bất kì
              ai cũng có thể trở thành lập trình viên giỏi nếu có phương pháp học tập đúng đắn.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm">
            <EyeOutlined className="text-3xl"   />
            <h3 className="font-semibold text-lg mb-3">Tầm nhìn</h3>
            <p className="text-gray-600">
              Trở thành hệ sinh thái đào tạo công nghệ hàng đầu ứng dụng AI tại
              Việt Nam, kiến tạo thế hệ nhân sự chất lượng cao cho thị trường toàn cầu.
            </p>
          </div>

        </div>
      </section>

      {/* CORE VALUES */}
      <section className="w-full py-20 text-center">
        <h2 className="text-2xl font-extrabold">Giá trị cốt lõi</h2>
        <div className="w-16 h-1 bg-brand-500 mx-auto mt-3 rounded"></div>

        <div className="max-w-7xl mx-auto px-6 mt-12 grid md:grid-cols-4 gap-6">
  {[
    {
      icon: <CodepenOutlined />,
      title: "Học theo lộ trình",
      desc: "Các khóa học được thiết kế bài bản từ cơ bản đến nâng cao.",
    },
    {
      icon: <CodeOutlined />,
      title: "Thực hành thực tế",
      desc: "Hơn 70% thời lượng là bài tập và dự án thực hành.",
    },
    {
      icon: <CheckCircleOutlined />,
      title: "Chấm bài tự động",
      desc: "Hệ thống AI giúp đánh giá và phản hồi nhanh.",
    },
    {
      icon: <RobotOutlined />,
      title: "AI hỗ trợ 24/7",
      desc: "Trợ lý AI giải đáp mọi thắc mắc khi học.",
    },
  ].map((item, i) => (
    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm text-center">
      
      {/* ICON */}
      <div className="w-12 h-12 bg-brand-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <span className="text-brand-500 text-2xl">
          {item.icon}
        </span>
      </div>

      <p className="font-semibold">{item.title}</p>
      <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
    </div>
  ))}
</div>
      </section>

      {/* STATS */}
      <section className="w-full bg-brand-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 text-center gap-6">
          {[
            ["10,000+", "Học viên tin tưởng"],
            ["100+", "Khóa học chuyên sâu"],
            ["500+", "Bài tập thực hành"],
            ["24/7", "Hỗ trợ kỹ thuật"],
          ].map((item, i) => (
            <div key={i}>
              <h2 className="text-3xl font-bold">{item[0]}</h2>
              <p className="text-sm opacity-90 mt-1">{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="w-full py-20 text-center">
        <h2 className="text-2xl font-bold">Đội ngũ thành lập web</h2>
        <div className="w-16 h-1 bg-brand-500 mx-auto mt-3"></div>

        <div className="max-w-7xl mx-auto px-6 mt-12 grid md:grid-cols-3 gap-8">
          {[
            { name: "Nguyễn Văn An", role: "Lead Fullstack Developer" },
            { name: "Trần Thị Minh", role: "Data Scientist & AI Expert" },
            { name: "Lê Hoàng Nam", role: "Mobile App Architect" },
          ].map((m, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden">
              <div className="h-40 bg-gray-200 flex items-center justify-center text-3xl">
                <ManOutlined />
              </div>
              <div className="p-5">
                <h4 className="font-semibold">{m.name}</h4>
                <p className="text-sm text-gray-500">{m.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full pb-20 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-brand-600 to-brand-700 text-white text-center p-12 rounded-3xl">
          <h2 className="text-3xl font-bold">
            Bạn đã sẵn sàng để trở thành Master?
          </h2>

          <p className="mt-3 text-sm opacity-90">
            Bắt đầu hành trình học ngay hôm nay cùng CodeMaster AI
          </p>

          <button className="mt-8 bg-brand-200 text-black px-7 py-3 rounded-xl hover:bg-brand-100 transition">
            Bắt đầu học ngay
          </button>
        </div>
      </section>

    </main>
  );
};

export default Introduce;