import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./providers/AuthProvider.tsx";

const GOOGLE_CLIENT_ID = "459809883895-foa9fm61p0659q0u32d070npnrrupbjs.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
    </AuthProvider>
);
