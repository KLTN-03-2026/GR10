import axios from "axios";
import { showMessage } from "../../utils/showMessages";

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
  const Url = "http://localhost:3000/api/v1/auth/register";
  try {
    const res = await axios.post(Url, {
      name: fullname,
      email,
      password,
    });
    console.log("THANH CONG: ", res.data);
    showMessage("success", "Đăng kí thành công!");
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    showMessage("error", "Đăng kí thất bại!");
    throw err;
  }
};

export const PostLogin = async ({
  email,
  password,
}: PostLoginProps): Promise<LoginResponse> => {
  const Url = "http://localhost:3000/api/v1/auth/login";
  try {
    const res = await axios.post<LoginResponse>(Url, {
      username: email,
      password,
    });
    console.log("THANH CONG: ", res.data);
    return res.data;
  } catch (err) {
    console.log("THAT BAI: ", err);
    throw err;
  }
};

export const PostOTP = async ({ _id, code }: { _id: string; code: string }) => {
  console.log("id :" + _id + "code: " + code);
  const Url = "http://localhost:3000/api/v1/auth/check-code";
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
