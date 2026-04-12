import axios from "../../utils/axios";

export interface CourseDetailResponse {
  message: string;
  data: any; 
}

export const GetCoursesDetail = async (id: string): Promise<CourseDetailResponse> => {
  try {
    const res = await axios.get<CourseDetailResponse>(`/courses/${id}`);
    console.log("LẤY CHI TIẾT KHÓA HỌC THÀNH CÔNG: ", res.data);
    return res.data;
  } catch (err: any) {
    console.log("LẤY CHI TIẾT KHÓA HỌC THẤT BẠI: ", err.response?.data || err);
    throw err;
  }
};