import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from "./providers/AuthProvider.tsx";

const GOOGLE_CLIENT_ID = "150246280801-foqhoto1gum0uef7j0o2ej2q3v281i2p.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
    </AuthProvider>
);
