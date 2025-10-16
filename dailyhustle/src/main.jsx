import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import UserDataProvider from "./context/userDataProvider.jsx";
import { GeneralProvider } from "./context/GeneralContextProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider";
// Import ThemeProvider
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <UserDataProvider>
                {/*  for user site data , such as tasks, notification */}
                <ThemeProvider>
                    {/*  for theme site data , such as tasks, notification */}
                    <GeneralProvider>
                        {/*  for general site data , such as tasks, notification */}
                        <App />
                    </GeneralProvider>
                </ThemeProvider>
            </UserDataProvider>
        </BrowserRouter>
    </React.StrictMode>
);
