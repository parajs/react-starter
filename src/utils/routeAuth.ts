import { redirect } from "react-router";

// 认证检查loader
export const protectedLoader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
  return null;
};

// 公开路由loader（已登录用户访问登录页时跳转）
export const publicLoader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return redirect('/dashboard');
  }

  
  return null;
};