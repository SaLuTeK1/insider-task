import {createBrowserRouter, Navigate} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import {
    ListInfoPage,
    HomePage,
    LoginPage,
    MyListPage,
    RegisterPage
} from "./pages";


const router = createBrowserRouter([
    {
        path: "",
        element: <MainLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={'/home'}/>
            },
            {
                path: "/home",
                element: <HomePage/>
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/my_list",
                element: <MyListPage/>

            },
            {
                path: "/my_list/:list_id",
                element: <ListInfoPage/>
            },
            {
                path: "/register",
                element: <RegisterPage/>
            }
        ]
    }
])

export {router}