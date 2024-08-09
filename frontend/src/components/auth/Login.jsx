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
      Cookies.set("token", token, { expires: 1, secure: true });
      Cookies.set("username", username);
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/input");
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
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
