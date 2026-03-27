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