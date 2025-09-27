import  { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";
import Home from '@/pages/home/Home'
import Settings from '@/pages/user/settings/Settings'
import delayForComponet from '@/utils/delayForComponet'
import DashboardErrorBoundary from "@/components/dashboard/ErrorBoundary";
import TestForm from "@/pages/test/TestForm";
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const About = lazy(() => delayForComponet(import('@/pages/about/About')));
const Test = lazy(() => import('@/pages/test/Test'));

const routes: RouteObject[] = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    
    ErrorBoundary:DashboardErrorBoundary
  },
  {
    path: "/user/settings",
    Component: Settings,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/test/:id",
    Component: Test,
    loader: async (params) => {
        console.log('params',params);
      // return data from here
      return  new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: "Hello from loader!" });
        }, 1000);
      });
    },
    action: async ({ request }) => {
        // action 用于处理表单提交等操作，当操作完成后，loader会被重新调用
      let formData = await request.formData();
      let title = formData.get("title");
        console.log("Form submitted with title:", title);

        
    },
  },
  {
    path: "/testForm/:id",
    Component: TestForm,
    loader: async (params) => {
        console.log('params',params);
      // return data from here
      return  new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: "Hello from loader!" });
        }, 1000);
      });
    },
    action: async ({ request }) => {
        // action 用于处理表单提交等操作，当操作完成后，loader会被重新调用
      let formData = await request.formData();
      let title = formData.get("title");
        console.log("Form submitted with title:", title);
        return { ok: true,data:{id:123}}
    },
  },
];

export default createBrowserRouter(routes);