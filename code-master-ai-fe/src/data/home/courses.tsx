import imgCourse from "../../assets/Course.png"
export const allCourses : ICourse[] = [
  {
    id: 1,
    title: "ReactJS Nâng cao & Redux Toolkit",
    lessons: 32,
    duration: "18 giờ video",
    students: 1240,
    updatedAt: "2 tuần trước",
    price: 1850000,
    oldPrice: 2500000,
    image: imgCourse  ,
    level: "Trung bình",
    category: "front-end",
  },
  {
    id: 2,
    title: "Node.js Express & Clean Architecture",
    lessons: 28,
    duration: "15 giờ video",
    students: 850,
    updatedAt: "1 tháng trước",
    price: 1200000,
    oldPrice: 1900000,
    image: imgCourse,
    level: "Nâng cao",
    category: "back-end",
  },
  {
    id: 3,
    title: "HTML CSS từ cơ bản đến nâng cao",
    lessons: 40,
    duration: "20 giờ video",
    students: 2000,
    updatedAt: "3 tuần trước",
    price: 900000,
    oldPrice: 1500000,
    image: imgCourse,
    level: "Cơ bản",
    category: "front-end",

  },
  {
    id: 4,
    title: "JavaScript ES6+ toàn tập",
    lessons: 35,
    duration: "22 giờ video",
    students: 1800,
    updatedAt: "1 tuần trước",
    price: 1500000,
    oldPrice: 2200000,
    image: imgCourse,
    level: "Trung bình",
    category: "front-end",
  }
];

export const courseOptions : IOptions[] = [
  {
    id: 1,
    label: "Tất cả",
    value: 'tat-ca',
  },
  {
    id: 2,
    label: "Frontend",
    value: 'front-end',
  },
  {
    id: 3,
    label: "Backend",
    value: 'back-end',
  },
  {
    id: 4,
    label: "Data & AI",
    value: 'data-ai',
  },
  {
    id: 5,
    label: "Mobile",
    value: 'mobile',
  },
];

export interface IOptions{
    id: number |string;
    label: string;
    value: string;

}

export interface ICourse {
  id: number;
  title: string;
  lessons: number;
  duration: string;
  students: number;
  updatedAt: string;
  price: number;
  oldPrice?: number; // optional (có thể có hoặc không)
  image: string;
  level: "Cơ bản" | "Trung bình" | "Nâng cao";
    category: string;
}