import { useState } from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Navbar() {
  const [user, setUser] = useState(auth.currentUser);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="logo">Smart Maps</div>

      <div className="nav-actions">
        {user ? (
          <>
            <span className="user-name">{user.displayName}</span>

            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="google-login" onClick={handleGoogleLogin}>
            Continue with Google
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
