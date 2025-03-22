import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/authentication/Login.jsx";
import SignUp from "./pages/authentication/Signup.jsx";

import { persistor, store } from "./store/store.js";
import {Provider} from "react-redux"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { PersistGate } from "redux-persist/integration/react";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <ProtectedRoute><Home/></ProtectedRoute>}, 
      { path: "/login", element: <Login/> }, 
      { path: "/signup", element: <SignUp/>}, 
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  
  <Provider store={store}>
    <PersistGate  persistor={persistor}>
      <RouterProvider router={router}/>
    </PersistGate>
  </Provider>
);
