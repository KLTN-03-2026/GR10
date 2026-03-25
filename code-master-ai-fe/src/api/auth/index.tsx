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
  token: string;
  user?: any;
}

export const PostRegister = async({fullname,email,password,confirmPassword}:PostRegisterProps) => {
  const Url = "http://localhost:3000/api/v1/auth/register";
  try {
    const res = await axios.post(Url, { name: fullname, email, password, confirmPassword });
    console.log("THANH CONG: ", res.data);
    showMessage('success','Đăng kí thành công!');
    return res.data; 
  } catch (err) {
    console.log("THAT BAI: ", err);
    showMessage('error','Đăng kí thất bại!');
    throw err; 
  }
};

export const PostLogin = async({email,password}:PostLoginProps): Promise<LoginResponse> => {
  const Url = "http://localhost:3000/api/v1/auth/login";
  try {
    const res = await axios.post<LoginResponse>(Url, { email, password });
    console.log("THANH CONG: ", res.data);
    showMessage('success','Đăng nhập thành công!');
    return res.data; 
  } catch (err) {
    console.log("THAT BAI: ", err);
    showMessage('error','Đăng nhập thất bại!');
    throw err;
  }
};
