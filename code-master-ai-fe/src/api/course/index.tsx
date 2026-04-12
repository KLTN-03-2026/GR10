import {axiosInstance} from "../../utils/axios";

type Category = {
  _id: string;
  category_name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CategoryResponse = {
  results: Category[];
  totalPages: number;
};

export const GetCourses = async () => {
  try {
    const res = await axiosInstance.get('/courses');
    console.log("THANH CONG: ", res.data);
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    throw err;
  }
};

export const GetCategories = async (): Promise<Category[]> => {
  try {
    const res = await axiosInstance.get<CategoryResponse>('/category');
    console.log("THANH CONG:", res.data);
    return res.data.results;
  } catch (err) {
    console.log("THAT BAI:", err);
    throw err;
  }
};

export const GetCoursesDetail = async (id: string) => {
  try {
    const res = await axiosInstance.get(`/courses/${id}`);
    console.log("THANH CONG: ", res.data);
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    throw err;
  }
};