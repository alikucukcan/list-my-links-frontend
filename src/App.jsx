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
    ],
  },
]);


export default function App() {
  return (
    <RouterProvider router={router} />
  )
}
