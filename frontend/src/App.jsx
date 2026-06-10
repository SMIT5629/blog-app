import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { router } from "./app.routes";

const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default App;