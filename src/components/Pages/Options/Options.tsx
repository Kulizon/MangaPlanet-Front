import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { UserStateInterface } from "../../../store/user";
import { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { API_URL } from "../../../utilities/data";
import { userActions } from "../../../store/user";

import styles from "./Options.module.scss";

import Input from "../../UI/Forms/Input/Input";
import Button from "../../UI/Button/Button";
import SpinningWheelAndError from "../../UI/SpinningWheelAndError/SpinningWheelAndError";

const Options = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userID, username, email } = useSelector((state: { user: UserStateInterface }) => state.user);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, error, data, sendRequest] = useFetch();

  if (!userID) navigate("/");

  // change username
  const submitUsernameHandler = (e: any) => {
    e.preventDefault();

    const newUsername = e.target[0].value;

    if (!newUsername) return;

    console.log(newUsername);

    sendRequest(`${API_URL}/api/users/${userID}`, "PUT", {
      body: JSON.stringify({
        username: newUsername,
      }),
    });
  };

  // change email
  const submitEmailHandler = (e: any) => {
    e.preventDefault();

    const email = e.target[0].value;
    const confirmedEmail = e.target[1].value;

    if (!email || !confirmedEmail) return;
    if (email !== confirmedEmail) {
      alert("Emails don't match");
      return;
    }
    if (email.slice(-4, email.length) !== ".com") {
      alert("Email needs to have '.com' at the end");
      return;
    }

    sendRequest(`${API_URL}/api/users/${userID}`, "PUT", {
      body: JSON.stringify({
        email: email,
      }),
    });
  };

  // change password
  const submitPasswordHandler = (e: any) => {
    e.preventDefault();

    const password = e.target[1].value;
    const confirmedPassword = e.target[2].value;

    if (!password || !confirmedPassword) return;
    if (password !== confirmedPassword) {
      alert("Passwords don't match");
      return;
    }

    sendRequest(`${API_URL}/api/users/${userID}`, "PUT", {
      body: JSON.stringify({
        password: password,
      }),
    });
  };

  // dispatch action when successfully updated and then reload
  useEffect(() => {
    if (data?.id) {
      const changeInfo = (dispatch: any) =>
        new Promise<void>((resolve, reject) => {
          dispatch(
            userActions.setUserInfo({
              username: data.username,
              email: data.email,
            })
          );

          resolve();
        });

      changeInfo(dispatch).then(() => window.location.reload());
    } else if (data?.error.message) {
      alert(data?.error.message);
    }
  }, [data, dispatch]);

  return (
    <main className={styles.options}>
      <SpinningWheelAndError loading={loading} error={error}></SpinningWheelAndError>

      <form onSubmit={submitUsernameHandler}>
        <h3>
          Current username: <span>{username}</span>
        </h3>
        <Input placeholder="New username..."></Input>
        <Button>Submit</Button>
      </form>

      <form onSubmit={submitEmailHandler}>
        <h3>
          Current email: <span>{email}</span>
        </h3>
        <Input type="email" placeholder="New email..."></Input>
        <Input type="email" placeholder="Confirm new email..."></Input>
        <Button>Submit</Button>
      </form>

      <form onSubmit={submitPasswordHandler}>
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            setShowPassword((prevState) => !prevState);
          }}
          alt
          className={styles["show-password-button"]}
        >
          Show Password
        </Button>
        <Input type={showPassword ? "text" : "password"} placeholder="New password..."></Input>
        <Input type={showPassword ? "text" : "password"} placeholder="Confirm new password..."></Input>
        <Button>Submit</Button>
      </form>
    </main>
  );
};

export default Options;
