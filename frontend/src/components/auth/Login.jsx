import { useState } from "react";
import axios from "axios";
import ViewLogin from "../../views/auth/ViewLogin";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

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

      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/input");
      }
      console.log(role);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  return (
    <section className="grid text-center h-screen items-center p-8">
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
