export interface LessonItem {
  _id: string;
  title: string;
  content?: string;
  video_url?: string;
  lesson_order: number;
  course_id: string;
  createdAt: string;
  updatedAt: string;
}
export interface CourseDetail {
  _id: string;
  title: string;
  description: string;
  price: number;
  level: "beginner" | "intermediate" | "advanced" | string;
  thumbnail: string;
  status: "active" | "inactive" | string;
  category: {
    _id: string;
    category_name: string;
  };
  createdAt: string;
  updatedAt: string;
  learning_outcomes: string[];
  requirements: string[];

  lessons: LessonItem[];
}

export type TabKey = "intro" | "content" | "reviews";

export const courseData: CourseDetail = {
  _id: "69c14831a8044d29dee5072e",
  title: "Khóa học NestJS & MongoDB Pro",
  description: "Hướng dẫn xây dựng hệ thống Backend thực tế với NestJS.",
  price: 500000,
  level: "beginner",
  thumbnail:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAYcYtygdRE313omw7lm6O5CwdwDQjiN4nmyocivCDGsNrEa17LGafSFUQjr83UkgZG-QQuSSYrarsP9fsAxGvVJ5CWFQ2H6KIhJDUNleY7lKxQqWS5LJ1Uw7RFA3C8RP6MVvI0Eb7FqbtfG659frQvo6uRH3249UjI5ZOVLujPfWtvp1FVj8tSjw4ysaSRM2hh30b7mH5jaJxuiYxxP9A77YFRONL5O_06kU8JiZ1badVWo1ZJmQh9ooblGYzLMFSDEh7NX3BOD9TH",
  status: "active",
  category: {
    _id: "69c0c2c588d20ba04451e7ed",
    category_name: "Back-end",
  },
  learning_outcomes: [
    "Hiểu kiến trúc module, controller, service trong NestJS",
    "Kết nối và thao tác dữ liệu với MongoDB",
    "Xây dựng REST API thực tế, dễ mở rộng",
    "Tổ chức source code backend sạch và chuyên nghiệp",
  ],
  requirements: [
    "Có kiến thức cơ bản về JavaScript hoặc TypeScript",
    "Đã từng làm việc với Node.js là một lợi thế",
    "Cần có máy tính cài đặt Node.js và MongoDB",
  ],
  createdAt: "2026-03-23T14:03:29.565Z",
  updatedAt: "2026-03-23T14:03:29.565Z",
  lessons: [
    {
      _id: "69c9303da0431e0f9624db07",
      title: "Giới thiệu khóa học NestJS",
      content: "Tổng quan về NestJS và cách xây dựng backend hiện đại.",
      video_url: "https://example.com/video1",
      lesson_order: 1,
      course_id: "69c65140015539489200689d",
      createdAt: "2026-03-29T13:59:25.277Z",
      updatedAt: "2026-03-29T13:59:25.277Z",
    },
  ],
};

export const fakeLearnings = [
  "Hiểu kiến trúc module, controller, service trong NestJS",
  "Kết nối và thao tác dữ liệu với MongoDB",
  "Xây dựng REST API thực tế, dễ mở rộng",
  "Tổ chức source code backend sạch và chuyên nghiệp",
];

export const fakeRequirements = [
  "Có kiến thức cơ bản về JavaScript hoặc TypeScript",
  "Đã từng làm việc với Node.js là một lợi thế",
  "Cần có máy tính cài đặt Node.js và MongoDB",
];

export const fakeSections = [
  {
    title: "Phần 1: Giới thiệu & Cài đặt môi trường",
    meta: "5 bài học • 45 phút",
    lessons: [
      {
        title: "Chào mừng bạn đến với khóa học",
        preview: true,
        duration: "05:20",
      },
      {
        title: "Cài đặt Nest CLI và tạo project đầu tiên",
        preview: false,
        duration: "12:10",
      },
    ],
  },
  {
    title: "Phần 2: Làm việc với MongoDB",
    meta: "8 bài học • 1 giờ 30 phút",
    lessons: [
      {
        title: "Kết nối MongoDB với NestJS",
        preview: false,
        duration: "15:00",
      },
      { title: "Thiết kế schema và model", preview: false, duration: "18:25" },
    ],
  },
];

export const fakeRelatedCourses = [
  {
    id: "1",
    title: "Node.js REST API thực chiến",
    price: 399000,
    level: "Cơ bản",
    thumbnail: courseData.thumbnail,
  },
  {
    id: "2",
    title: "TypeScript cho Backend Developer",
    price: 299000,
    level: "Trung bình",
    thumbnail: courseData.thumbnail,
  },
  {
    id: "3",
    title: "Microservices với NestJS",
    price: 699000,
    level: "Nâng cao",
    thumbnail: courseData.thumbnail,
  },
];
