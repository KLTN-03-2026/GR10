import { useEffect, useState } from "react";
import { Input, Button, Checkbox, Divider } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  UserOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { PostOTP, PostRegister } from "../../api/auth";
import { PostLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { useUserInfo } from "../../store/user";
type AuthFormProps = {
  type?: "login" | "register";
};
export interface IUser {
  _id: string;
  email: string;
}
export default function AuthForm({ type = "login" }: AuthFormProps) {
  const { setUserInfo } = useUserInfo();
  const [tab, setTab] = useState<"login" | "register">(type);
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [userData, setUserData] = useState<IUser | null>(null);
  const [formRegisterData, setFormRegisterData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formLoginData, setFormLoginData] = useState({
    email: "",
    password: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    // console.log("id:"+ userData?._id+"code:"+OTP)
    try {
      await PostOTP({ _id: userData?._id || "", code: OTP });
      setTab("login")
    } catch (error) {
      console.log(error);
    }
    setOTP("");
    
  };

  

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setTab(type);
  }, [type]);
  const onEmailChange = (value: string) => {
    setFormLoginData({ ...formLoginData, email: value });
    setFormRegisterData({ ...formRegisterData, email: value });
  };
  const onPasswordChange = (value: string) => {
    setFormLoginData({ ...formLoginData, password: value });
    setFormRegisterData({ ...formRegisterData, password: value });
  };
  const onSubmit = async () => {
    if (tab === "login") {
      try {
        const data = await PostLogin(formLoginData);
        if (data.access_token) {
          localStorage.setItem("token", data.access_token);
          setUserInfo(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const data = await PostRegister(formRegisterData);
        setUserData(data);
        showModal();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full max-w-[390px] py-2">
      <div className="rounded-[26px]   bg-white px-10 py-10 shadow-[0_8px_24px_rgba(0,0,0,0.05)]">
        {/* Tabs */}
        <div className="mb-6 flex rounded-full bg-brand-25 p-1">
          <button
            type="button"
            onClick={() => setTab("login")}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
              tab === "login"
                ? "bg-white text-brand-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Đăng nhập
          </button>

          <button
            type="button"
            onClick={() => setTab("register")}
            className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition ${
              tab === "register"
                ? "bg-white text-brand-700 shadow-sm"
                : "text-slate-500"
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* Heading */}
        <h2 className="mb-1 text-[18px] font-extrabold text-brand-700 md:text-[20px]">
          {tab === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
        </h2>

        <p className="mb-5 text-[13px] leading-5 text-slate-400">
          {tab === "login"
            ? "Vui lòng nhập thông tin để truy cập tài khoản"
            : "Vui lòng nhập thông tin để đăng ký thành viên"}
        </p>

        {/* Form */}
        <div className="space-y-3">
          {tab === "register" && (
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-slate-800">
                Họ và tên
              </label>
              <Input
                size="large"
                placeholder="Nguyễn Văn A"
                value={formRegisterData.fullname}
                onChange={(e) =>
                  setFormRegisterData({
                    ...formRegisterData,
                    fullname: e.target.value,
                  })
                }
                prefix={<UserOutlined className="text-slate-400" />}
                className="!h-11 !rounded-[12px] !border-brand-100 !bg-brand-25"
              />
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-slate-800">
              Email
            </label>
            <Input
              size="large"
              value={formLoginData.email}
              onChange={(e) => onEmailChange(e.target.value)}
              placeholder="example@gmail.com"
              prefix={<MailOutlined className="text-slate-400" />}
              className="!h-11 !rounded-[12px] !border-brand-100 !bg-brand-25"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[13px] font-semibold text-slate-800">
              Mật khẩu
            </label>
            <Input.Password
              size="large"
              value={formLoginData.password}
              onChange={(e) => onPasswordChange(e.target.value)}
              placeholder="••••••••"
              prefix={<LockOutlined className="text-slate-400" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              className="!h-11 !rounded-[12px] !border-brand-100 !bg-brand-25"
            />
          </div>

          {tab === "register" && (
            <div>
              <label className="mb-1.5 block text-[13px] font-semibold text-slate-800">
                Xác nhận mật khẩu
              </label>
              <Input.Password
                size="large"
                value={formRegisterData.confirmPassword}
                onChange={(e) =>
                  setFormRegisterData({
                    ...formRegisterData,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="••••••••"
                prefix={
                  <SafetyCertificateOutlined className="text-slate-400" />
                }
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                className="!h-11 !rounded-[12px] !border-brand-100 !bg-brand-25"
              />
            </div>
          )}
        </div>

        {/* Options */}
        {tab === "login" ? (
          <div className="mt-3 flex items-center justify-between gap-3">
            <Checkbox className="text-[13px] text-slate-500">
              Ghi nhớ đăng nhập
            </Checkbox>

            <button
              type="button"
              className="text-[13px] font-semibold text-brand-700"
            >
              Quên mật khẩu?
            </button>
          </div>
        ) : (
          <div className="mt-3 flex items-start gap-2">
            <Checkbox className="mt-0.5" />
            <p className="text-[13px] leading-5 text-slate-500">
              Tôi đồng ý với{" "}
              <span className="font-semibold text-brand-700">
                Điều khoản dịch vụ
              </span>{" "}
              và{" "}
              <span className="font-semibold text-brand-700">
                Chính sách bảo mật
              </span>
              .
            </p>
          </div>
        )}

        {/* Submit */}
        <Button
          type="primary"
          block
          size="large"
          onClick={onSubmit}
          className="!mt-5 !h-[46px] !rounded-[12px] !border-none !bg-brand-600 !text-sm !font-semibold hover:!bg-brand-700"
        >
          {tab === "login" ? "Đăng nhập" : "Đăng ký ngay"}
        </Button>

        {/* Divider */}
        <Divider className="!my-5 !text-[11px] !font-semibold !uppercase !tracking-wider !text-slate-400">
          Hoặc tiếp tục với
        </Divider>

        {/* Social */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-[12px] border border-brand-100 bg-white text-sm font-semibold text-slate-700 transition hover:bg-brand-25"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="h-4 w-4"
            />
            Google
          </button>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-[12px] border border-brand-100 bg-white text-sm font-semibold text-slate-700 transition hover:bg-brand-25"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
              <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.38-3.87-1.38-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.78 2.71 1.27 3.37.97.1-.75.4-1.27.73-1.56-2.55-.29-5.23-1.28-5.23-5.72 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a10.9 10.9 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.84 1.18 3.1 0 4.45-2.68 5.42-5.24 5.71.41.36.78 1.08.78 2.18v3.23c0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
            </svg>
            GitHub
          </button>
        </div>

        {tab === "register" && (
          <p className="mt-5 text-center text-[13px] text-slate-500">
            Đã có tài khoản?{" "}
            <button
              type="button"
              onClick={() => setTab("login")}
              className="font-semibold text-brand-700"
            >
              Đăng nhập ngay
            </button>
          </p>
        )}
      </div>

      <p className="mx-auto mt-4 max-w-[360px] text-center text-[11px] leading-5 text-slate-400">
        Bằng cách tiếp tục, bạn đồng ý với{" "}
        <span className="underline">Điều khoản dịch vụ</span> và{" "}
        <span className="underline">Chính sách bảo mật</span> của chúng tôi.
      </p>
      <Modal
        title="Nhập OTP"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{
          className:
            "!bg-brand-600 hover:!bg-brand-700 !border-none !rounded-xl",
        }}
        cancelButtonProps={{
          className:
            "!rounded-xl !border-brand-200 hover:!text-brand-700 hover:!bg-brand-25",
        }}
      >
        <Input
          placeholder="Nhập mã OTP"
          value={OTP}
          onChange={(e) => setOTP(e.target.value)}
          className="!h-11 !rounded-xl !bg-brand-25 !border-brand-100"
        />
      </Modal>
    </div>
  );
}
