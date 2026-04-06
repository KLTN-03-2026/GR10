import axios from "axios";
import { showMessage } from "../../utils/showMessages";

export const API_URL = "https://codeaimaster-kltn-2026-10.onrender.com/api/v1";
interface PostRegisterProps {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PostLoginProps {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  user?: any;
}

export const PostRegister = async ({
  fullname,
  email,
  password,
  confirmPassword,
}: PostRegisterProps) => {
  const Url = `${API_URL}/auth/register`;
  try {
    const res = await axios.post(Url, {
      name: fullname,
      email,
      password,
    });
    console.log("THANH CONG: ", res.data);
    // showMessage("success", "Đăng kí thành công!");
    return res.data;
  } catch (err: any) {
    console.log("THAT BAI: ", err);
    showMessage("error", err.response?.data?.message || "Đăng kí thất bại!");
    throw err;
  }
};

export const PostLogin = async ({
  email,
  password,
}: PostLoginProps): Promise<LoginResponse> => {
  const Url = `${API_URL}/auth/login`;
  try {
    const res = await axios.post<LoginResponse>(Url, {
      username: email,
      password,
    });
    console.log("THANH CONG: ", res.data);
    showMessage("success", "Đăng nhập thành công!");

    return res.data;
  } catch (err: any) {
    console.log("THAT BAI: ", err);
    showMessage("error", err.response?.data?.message || "Đăng nhập thất bại!");
    throw err;
  }
};

export const PostOTP = async ({ _id, code }: { _id: string; code: string }) => {
  console.log("id :" + _id + "code: " + code);
  const Url = `${API_URL}/auth/check-code`;
  try {
    const res = await axios.post(Url, { _id, code });
    console.log("THANH CONG: ", res.data);
    showMessage("success", "Đăng ký thành công!");
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    showMessage("error", "Đăng ký thất bại!");
    throw err;
  }
};

export const handleGoogleLogin = () => {
  window.location.href = `${API_URL}/auth/google`;
};
