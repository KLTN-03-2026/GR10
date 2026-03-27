import React from "react";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CodeOutlined, SearchOutlined } from "@ant-design/icons";
import { useUserInfo } from "../../store/user";
import { UserOutlined } from "@ant-design/icons";
import { ShoppingCartOutlined } from "@ant-design/icons";
const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [navSelected, setNavSelected] = useState(location.pathname);
    const { userInfo } = useUserInfo();
    useEffect(() => {
        setNavSelected(location.pathname);
    }, [location]);
    return (
        <header className="bg-brand-50 shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-14 py-4 flex items-center justify-between">
                {/* Logo */}
                <div className="flex space-x-8">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-brand-700 ">
                            <NavLink to="/" className="flex items-center space-x-2">
                                <CodeOutlined></CodeOutlined>
                                <div>CodeMaster AI</div>
                            </NavLink>
                        </h1>
                    </div>
                    <nav className="hidden md:flex space-x-8 pt-2">
                        <NavLink to="/" className={`font-medium text-brand-700 cursor-pointer transition-colors whitespace-nowrap hover:text-brand-400 ${navSelected === '/' ? 'border-b-2 border-brand-700' : ''}`}>Trang chủ</NavLink>
                        <NavLink to="/introduce" className={`font-medium text-brand-700 cursor-pointer transition-colors whitespace-nowrap hover:text-brand-400 ${navSelected === '/introduce' ? 'border-b-2 border-brand-700' : ''}`}>Giới thiệu</NavLink>
                        <NavLink to="/blog" className={`font-medium text-brand-700 cursor-pointer transition-colors whitespace-nowrap hover:text-brand-400 ${navSelected === '/blog' ? 'border-b-2 border-brand-700' : ''}`}>Tin tức</NavLink>
                        <NavLink to="/course" className={`font-medium text-brand-700 cursor-pointer transition-colors whitespace-nowrap hover:text-brand-400 ${navSelected === '/course' ? 'border-b-2 border-brand-700' : ''}`}>Khóa học</NavLink>
                        {/* <NavLink to="/cart" className={`font-medium text-brand-700 cursor-pointer transition-colors whitespace-nowrap hover:text-brand-400 ${navSelected === '/cart' ? 'border-b-2 border-brand-700' : ''}`}>Giỏ hàng</NavLink> */}
                    </nav>
                </div>
                <div className="flex space-x-6">
                    <div className="flex items-center rounded-full bg-brand-25 space-x-3 px-4 py-2 shadow-md">
                        <SearchOutlined className="cursor-pointer hover:text-brand-400" />
                        <input
                            className="bg-brand-25 rounded-full px-2 outline-none"
                            type="text"
                            placeholder="Tìm kiếm khóa học..."
                        />
                    </div>

                    {userInfo && (
                        <div className="flex items-center space-x-3">
                            <ShoppingCartOutlined onClick={() => navigate('/cart')} className="text-2xl text-brand-700 cursor-pointer hover:text-brand-400 " />
                        </div>
                    )}
                    {userInfo ? (
                        <div>
                            <div className="flex items-center space-x-3">
                                <div className="text-lg w-10 h-10 rounded-full bg-brand-600 font-medium text-white cursor-pointer flex items-center justify-center ">
                                    {<UserOutlined />}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div onClick={() => navigate('/login')} className="rounded-full bg-brand-600 text-white px-5 py-2 cursor-pointer font-semibold hover:text-brand-100 shadow-md">
                            Đăng Nhập
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar;