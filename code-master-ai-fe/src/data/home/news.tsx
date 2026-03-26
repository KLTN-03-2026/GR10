export interface IPost {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  tag: "hot" | "new" | "guide";
}

export const posts: IPost[] = [
  {
    id: 1,
    category: "CÔNG NGHỆ",
    title: "Tương lai của AI trong việc hỗ trợ lập trình viên",
    description:
      "Khám phá cách ChatGPT và Copilot đang thay đổi cách chúng ta viết code hằng ngày, từ gợi ý hàm đến tối ưu hiệu suất dự án.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    tag: "hot",
  },
  {
    id: 2,
    category: "FRONTEND",
    title: "React 19 có gì mới? Những cập nhật đáng chú ý",
    description:
      "Những cải tiến vượt bậc về performance và trải nghiệm nhà phát triển trong phiên bản mới nhất mà frontend dev không nên bỏ qua.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    tag: "new",
  },
  {
    id: 3,
    category: "SỰ NGHIỆP",
    title: "Lộ trình học Web từ con số 0 dành cho người chuyển ngành",
    description:
      "Đừng quá lo lắng nếu bạn không bắt đầu từ ngành CNTT. Đây là lộ trình nền tảng giúp bạn đi từ HTML/CSS đến dự án thực tế đầu tiên.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    tag: "guide",
  },
];