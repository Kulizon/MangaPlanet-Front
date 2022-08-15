import { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./Authentication.module.scss";

import AuthForm from "./AuthForm/AuthForm";

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.login}>
      <AuthForm method="LOGIN"></AuthForm>
      <p>Don't have an account? Register <Link to='/register'>here</Link>!</p>
    </main>
  );
};

export default Login;
