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
        path: "/dashboard",
        loader: () => {
          let token = localStorage.getItem('token')
          if (!token) {
            return redirect('/login')
          }
          return null;
        },
        Component: DashboardPage
      }
    ],
  },
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
