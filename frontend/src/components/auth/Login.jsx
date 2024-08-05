import { useState } from "react";

import ViewLogin from "../../views/auth/ViewLogin";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  return (
    <section className="grid text-center h-screen items-center p-8">
      <ViewLogin
        passwordShown={passwordShown}
        togglePasswordVisiblity={togglePasswordVisiblity}
      />
    </section>
  );
}

export default Login;
