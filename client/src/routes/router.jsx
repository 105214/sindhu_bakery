import { createBrowserRouter } from "react-router";
import Home from "../pages/user/home.jsx";
import { RootLayout } from "../layout/rootLayout.jsx";
import { Profile } from "../pages/user/profile.jsx";
import { ProtectRoutes } from "./protectRoutes.jsx";

export const router = createBrowserRouter([

    {
    path:"",
    element:<RootLayout/>,
    children:[

                {
                    path:"home",
                    element:<Home/>
                },
                {
                 element:<ProtectRoutes/>,
                children:[

                    {
                        path:"profile",
                        element:<Profile/>
                    }
                ]
                },
     ]
    }
    ])