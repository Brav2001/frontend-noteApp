import { useEffect, useState } from "react";
import ButtonBack from "../../../components/ButtonBack";
import ButtonForms from "../../../components/ButtonForms";
import Input from "../../../components/Input";
import Title from "../../../components/Title";
import Alert from "../../../components/Alert";
import { validatePartialUser } from "../../../schemas/user.schema";

import { api, fetchData } from "../../../utils/api";
import { useStore } from "../../../store/store";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
  const [alertName, setAlertName] = useState({
    hide: true,
    message: "",
  });
  const [alertPassword, setAlertPassword] = useState({
    hide: true,
    message: "",
  });
  const [Changelogged] = useStore((state) => [state.Changelogged]);

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleCloseAlertName = () => {
    setAlertName({
      hide: true,
      message: "",
    });
  };
  const handleCloseAlertPassword = () => {
    setAlertPassword({
      hide: true,
      message: "",
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: name,
      password: password,
    };
    const res = await fetchData("POST", api.auth.register, body);
    if (res.status == 409) {
      setAlertName({
        hide: false,
        message: res.error.message,
      });
    }
    if (res.status == 201) {
      localStorage.setItem("noteAppToken", res.token);
      navigate("/");
      Changelogged(true);
    }
  };

  useEffect(() => {
    let validateName = false;
    let validatePasswords = false;
    if (name) {
      const username = validatePartialUser({ username: name });
      if (username.error) {
        const message = JSON.parse(username.error.message);
        setAlertName({
          hide: false,
          message: message[0].message,
        });
        validateName = false;
      } else {
        setAlertName({
          hide: true,
          message: "",
        });
        validateName = true;
      }
    }

    if (password && confirmPassword) {
      if (password != confirmPassword) {
        setAlertPassword({
          hide: false,
          message: "The passwords are not the same.",
        });
        validatePasswords = false;
      } else {
        setAlertPassword({
          hide: true,
          message: "",
        });
        validatePasswords = true;
      }
    }

    validateName && validatePasswords
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [name, password, confirmPassword]);

  return (
    <div className="w-10/12 sm:w-2/5 lg:w-1/3 flex items-center">
      <div className="w-full">
        <ButtonBack />
        <div className="mb-4 flex justify-center">
          <Title title={"Register"} />
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              id={"name"}
              type={"text"}
              label={"Username"}
              value={name}
              change={handleChangeName}
              maxLength={28}
            />
            <Alert
              message={alertName.message}
              hide={alertName.hide}
              handleHide={handleCloseAlertName}
            />
            <Input
              id={"password"}
              type={"password"}
              label={"password"}
              value={password}
              change={handleChangePassword}
              minLength={4}
              maxLength={64}
            />
            <Input
              id={"confirm_password"}
              type={"password"}
              label={"confirm password"}
              value={confirmPassword}
              change={handleChangeConfirmPassword}
              minLength={4}
              maxLength={64}
            />
            <Alert
              message={alertPassword.message}
              hide={alertPassword.hide}
              handleHide={handleCloseAlertPassword}
            />
            <div className="flex justify-center">
              <ButtonForms label={"Sign up"} disabled={disabledButton} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
