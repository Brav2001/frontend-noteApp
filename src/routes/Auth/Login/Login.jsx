import { useEffect, useState } from "react";
import ButtonForms from "../../../components/ButtonForms";
import Input from "../../../components/Input";
import TextButton from "../../../components/TextButton";
import Title from "../../../components/Title";
import { useStore } from "../../../store/store";
import Alert from "../../../components/Alert";
import { validatePartialUser } from "../../../schemas/user.schema";
import { api, fetchData } from "../../../utils/api";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      username: name,
      password: password,
    };
    const res = await fetchData("POST", api.auth.login, body);
    if (res.status == 401) {
      setAlertPassword({
        hide: false,
        message: res.error.message,
      });
    }
    if (res.status == 200) {
      localStorage.setItem("noteAppToken", res.token);
      Changelogged(true);
    }
  };

  useEffect(() => {
    let validateName = false;
    let validatePassword = false;
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

    if (password) {
      const userpass = validatePartialUser({ password: password });

      if (userpass.error) {
        const message = JSON.parse(userpass.error.message);
        setAlertPassword({
          hide: false,
          message: message[0].message,
        });
        validatePassword = false;
      } else {
        setAlertPassword({
          hide: true,
          message: "",
        });
        validatePassword = true;
      }
    }

    validateName && validatePassword
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [name, password]);
  return (
    <div className="w-10/12 sm:w-2/5 lg:w-1/3 flex items-center">
      <div className="w-full">
        <div className="mb-4 flex justify-center">
          <Title title={"Login"} />
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
            <Alert
              message={alertPassword.message}
              hide={alertPassword.hide}
              handleHide={handleCloseAlertPassword}
            />
            <div className="flex justify-center">
              <ButtonForms label={"Sign in"} disabled={disabledButton} />
            </div>
            <div className="flex justify-end">
              <TextButton label={"Sign up"} route={"/register"} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
