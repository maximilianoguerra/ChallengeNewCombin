import React, { useState } from "react";
import "../App.css";
import {
  Alert,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Toolbar,
} from "@mui/material";
import * as Yup from "yup";
import TextfieldWrapper from "../components/TextfieldWrapper";
import { Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getToken } from "../service/service";
import { useStatePage } from "../hooks/StateProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
const{setToken}= useStatePage();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const INITIAL_FORM_STATE = {
    password: "",
    user: "",
  };
  const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string().required("Campo requerido"),
    user: Yup.string().required("Campo requerido"),
  });
  const handleSubmit = async(values: any) => {
    console.log(values);
    const token = await getToken(values.user,values.password);
    if (token!=='') {
      setToken(token);
      navigate('/home');
    }else{
      setError(true);
    }

  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Container>
      <Toolbar sx={{ mt: 2 }} />

      <Formik
        initialValues={Object.assign({}, INITIAL_FORM_STATE)}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values) => {
          console.log(values);
          handleSubmit(values);
        }}
      >
        <Form className="util-margin-bottom">
          <TextfieldWrapper
            sx={{ mb: 2 }}
            name="user"
            label="Email Address"
            variant="filled"
          />

          <TextfieldWrapper
            sx={{ mb: 2 }}
            name="password"
            label="Password"
            variant="filled"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" type="submit">
            INICIAR SESIÓN
          </Button>
          {error&&<Alert severity="error" onClose={() => {setError(false)}}>Something went wrong</Alert>}
        </Form>
      </Formik>
    </Container>
  );
};

export default Login;
