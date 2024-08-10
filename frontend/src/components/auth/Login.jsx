import { useState } from "react";
import axios from "axios";
import ViewLogin from "../../views/auth/ViewLogin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
      const { token, role } = response.data;
      const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
      Cookies.set("token", token, { expires, secure: true });
      Cookies.set("username", username);
      toast.success("Login Berhasil", {
        style: {
          padding: "9px",
          borderRadius: "10px",
        },
      });
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/input");
        }
      }, 3000);
    } catch (error) {
      toast.error("Login Gagal");
    }
  };
  return (
    <section className="grid text-center h-screen items-center p-8">
      <Toaster position="top-right" reverseOrder={false} />
      <ViewLogin
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        passwordShown={passwordShown}
        togglePasswordVisiblity={togglePasswordVisiblity}
        handleLogin={handleLogin}
      />
    </section>
  );
}

export default Login;
