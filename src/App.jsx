import React from 'react'
import Layout from './components/Layout'

import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import DashboardPage from './pages/Dashboard';
import { UserProvider } from './contexts/user.context';
import ProfilePage from './pages/Profile';
import ForgotPasswordPage from './pages/ForgotPassword';
import ResetPasswordPage from './pages/ResetPassword';
import SettingsPage from './pages/Settings';


const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: Layout,
    ErrorBoundary: () => <div className='text-black text-center mt-12'>404 Wrong way</div>,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/register",
        Component: RegisterPage
      },
      {
        path: "/forgot-password",
        Component: ForgotPasswordPage
      },
      {
        path: "/reset-password",
        Component: ResetPasswordPage
      },
      {
        path: "/dashboard",
        loader: () => {
          let token = localStorage.getItem('token')
          if (!token) {
            return redirect('/login')
          }
          return null;
        },
        Component: DashboardPage
      },
      {
        path: "/dashboard/settings",
        loader: () => {
          let token = localStorage.getItem('token')
          if (!token) {
            return redirect('/login')
          }
          return null;
        },
        Component: SettingsPage
      },
      {
        path: "/:username",
        Component: ProfilePage
      },
    ],

  },
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
