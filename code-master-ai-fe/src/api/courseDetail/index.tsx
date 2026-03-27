import axios from "axios";
import { API_URL } from "../auth";

export const GetCoursesDetail = async (id :string) => {
  const Url = `${API_URL}/courses/${id}`;
  try {
    const res = await axios.get(Url);
    console.log("THANH CONG: ", res.data);
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    throw err;
  }
};