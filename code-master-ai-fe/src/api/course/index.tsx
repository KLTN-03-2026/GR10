import axios from "axios";
import { API_URL } from "../auth";
import { showMessage } from "../../utils/showMessages";



export const GetCourses = async () => {
  const Url = `${API_URL}/courses`;
  try {
    const res = await axios.get(Url);
    console.log("THANH CONG: ", res.data);
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    throw err;
  }
};
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
export const GetCategories = async (): Promise<Category[]> => {
  const url = `${API_URL}/category`;

  try {
    const res = await axios.get<CategoryResponse>(url);
    console.log("THANH CONG:", res.data);
    return res.data.results;
  } catch (err) {
    console.log("THAT BAI:", err);
    throw err;
  }
};