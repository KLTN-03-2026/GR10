import Fullstackll from '../../assets/Fullstack.png';
import PythonAI from '../../assets/Python AI.png';
import MobileApp from '../../assets/Mobile.png';                
export const featuredCourses : FeaturedCourse[] = [
  {
    id: 1,
    title: "Fullstack Web Development",
    level: "Trung cấp",
    price: 4990000,
    rating: 4.8,
    isBestSeller: true,
    image: Fullstackll,
    description:
      "Làm chủ React, Node.js và MongoDB thông qua việc xây dựng 5 dự án thực tế chuyên nghiệp."
  },
  {
    id: 2,
    title: "Python cho AI & Data Science",
    level: "Cơ bản",
    price: 3500000,
    rating: 4.7,
    isBestSeller: false,
    image: PythonAI,
    description:
      "Nắm vững Python từ con số 0 và ứng dụng vào phân tích dữ liệu, học máy cơ bản."
  },
  {
    id: 3,
    title: "Mobile App với Flutter",
    level: "Nâng cao",
    price: 4200000,
    rating: 4.9,
    isBestSeller: false,
    image: MobileApp,
    description:
      "Xây dựng ứng dụng đa nền tảng iOS & Android chỉ với một codebase duy nhất."
  }
];

export interface FeaturedCourse {
  id: number;
  title: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao";
  price: number;
  rating: number;
  isBestSeller: boolean;
  image: string;
  description: string;
}