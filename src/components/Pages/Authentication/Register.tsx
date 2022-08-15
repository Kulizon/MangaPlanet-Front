import { useEffect } from "react";
import { Link } from "react-router-dom";

import AuthForm from "./AuthForm/AuthForm";

import styles from "./Authentication.module.scss";

const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className={styles.register}>
      <AuthForm method="REGISTER"></AuthForm>
      <p>
        Already have an account? Login <Link to="/login">here</Link>!
      </p>
    </main>
  );
};

export default Register;
