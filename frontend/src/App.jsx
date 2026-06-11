import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { router } from "./app.routes";
import "./App.css";

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;