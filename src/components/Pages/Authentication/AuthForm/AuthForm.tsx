import useFetch from "../../../../hooks/useFetch";
import { FormEventHandler, useState, useEffect } from "react";
import { API_URL } from "../../../../utilities/data";
import { useDispatch } from "react-redux";
import { userActions } from "../../../../store/user";
import { Navigate } from "react-router";
import { DEFAULT_IMAGE_ID } from "../../../../utilities/data";

import styles from "./AuthForm.module.scss";

import SpinningWheelAndError from "../../../UI/SpinningWheelAndError/SpinningWheelAndError";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Forms/Input/Input";

const AuthForm = (props: { method: "LOGIN" | "REGISTER" }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [redirect, setRedirect] = useState("");

  // sets fetch parameters based on method
  const login_parameters = [`${API_URL}/api/auth/local`, "POST"];
  const register_parameters = [`${API_URL}/api/auth/local/register`, "POST"];
  let parameters: any[] = [];
  if (props.method === "LOGIN") parameters = [...login_parameters];
  else parameters = [...register_parameters];

  const [loading, error, data, sendRequest] = useFetch();

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault();
    setMessage("");

    let email, password, username, confirmedPassword;
    if (props.method === "LOGIN") {
      email = e.target[0].value;
      password = e.target[1].value;
    } else if (props.method === "REGISTER") {
      username = e.target[0].value;
      email = e.target[1].value;
      password = e.target[2].value;
      confirmedPassword = e.target[3].value;
    }

    // send login request
    if (props.method === "LOGIN") {
      const user = await sendRequest(parameters[0], parameters[1], {
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });

      dispatch(userActions.setUserID({ jwt: user.jwt, userID: user.user.id }));

      // send register request
    } else if (props.method === "REGISTER") {
      if (password !== confirmedPassword) {
        setMessage("Passwords don't match");
        return;
      }
      sendRequest(parameters[0], parameters[1], {
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          image: [DEFAULT_IMAGE_ID], // default user image id -> [38]
        }),
      });
    }
  };

  // redirect if no error
  useEffect(() => {
    if (props.method === "REGISTER" && data && data.user && !data.error) {
      setRedirect("/login");
    }
  }, [data, props.method]);

  // show error
  useEffect(() => {
    if (data && !data.data && data.error) {
      if (!("errors" in data.error.details)) setMessage(data.error.message);
      else setMessage(data.error.details.errors[0].message);
    }
  }, [data]);

  const [loadingFullData, errorFullData, fullData, sendFullDataRequest] = useFetch();

  // get and set necessary user data after login
  useEffect(() => {
    if (props.method === "LOGIN" && data?.user?.id) {
      sendFullDataRequest(`${API_URL}/api/users/${data?.user?.id}?populate=*`, "GET");
    }
  }, [data, sendFullDataRequest, props.method]);
  useEffect(() => {
    if (fullData) {
      dispatch(
        userActions.setUserInfo({
          username: fullData.username,
          email: fullData.email,
          image: fullData?.image?.formats?.small?.url,
        })
      );
      if (props.method === "LOGIN") setRedirect("/");
      else setRedirect("/login");
    }
  }, [fullData, dispatch, props.method]);

  return (
    <>
      {redirect && <Navigate to={redirect}></Navigate>}
      <h1 className={styles.heading}>{props.method[0] + props.method.slice(1).toLowerCase()} Form</h1>
      <form className={styles.form} onSubmit={submitHandler}>
        {props.method === "REGISTER" && <Input type="text" placeholder="Username..." />}
        <Input type="email" placeholder="Email..." />
        <Input type="password" placeholder="Password..." />
        {props.method === "REGISTER" && <Input type="password" placeholder="Confirm password..." />}
        <SpinningWheelAndError
          loading={loading || loadingFullData}
          error={message ? message : error ? error : errorFullData}
        ></SpinningWheelAndError>
        <Button>Submit</Button>
      </form>
    </>
  );
};

export default AuthForm;
