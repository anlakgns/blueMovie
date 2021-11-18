import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

import { LOGIN, REGISTER, SINGLE_UPLOAD } from "../../shared/apolloRequests";
import ModalCard from "../../shared/UI Components/ErrorCard";
import {AuthContext} from "../../shared/contexts/AuthContext"

const useStyles = makeStyles((theme) => ({
  headline: {
    color: theme.palette.primary.main,
    marginBottom: "1em",
  },
  formContainer: {
    backgroundColor: "transparent",
  },
  underline: {
    "&:after": {
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    "&:before": {
      borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
    marginBottom: "0.5em",
  },
  inputRoot: {
    textAlign: "left",
    marginLeft: "0.5em",
  },
  inputs: {
    color: theme.palette.primary.main,
    fontSize: "1.1em",
    padding: "0.2em",
    width: "100%",
  },
  forgetText: {
    color: theme.palette.primary.main,
    fontSize: "0.9em",
    opacity: "0.7",
  },
  btnSignIn: {
    color: "white",
  },
  errorFeedback: {
    color: theme.palette.common.error,
    fontSize: "0.8em",
  },
}));

const AuthForm = () => {
  const classes = useStyles();
  const history = useRouter();
  const {authStates, setAuthStates} = useContext(AuthContext)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [avatarValue, setAvatarValue]= useState()
  const [singleUpload] = useMutation(SINGLE_UPLOAD)
  const [createUser, responseRegister] = useMutation(REGISTER, {
    onCompleted: (data) => {
      setAuthStates((prev)=> {
        return {
          ...prev,
          isAuth: true,
          userId: data.createUser._id
        }
      })
      history.replace("/");
    },
    onError: (error) => {
      setModalOpen(true);
      setModalContext(error.message);
    },
  });
  const [loginUser, responseLogin] = useMutation(LOGIN, {
    onCompleted: (data) => {
      setAuthStates((prev)=> {
        return {
          ...prev,
          isAuth: true,
          userId: data.loginUser._id,
          name: data.loginUser.name,
          email: data.loginUser.email,
          lastname: data.loginUser.lastname,
          avatar: data.loginUser.avatar,
          phone: data.loginUser.phone,
          profiles: data.loginUser.profiles,
        }
      })
      history.replace("/");

    },
    onError: (error) => {
      setModalOpen(true);
      setModalContext(error.message);
    },
  });

  
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      phone:"",
      email: "",
      password: "",
      passwordConfirm: "",
      avatar: null
    },
    validationSchema: Yup.object({
      name: hasAccount
        ? null
        : Yup.string().required("Please provide your name."),

      passwordConfirm: hasAccount
        ? null
        : Yup.string()
            .required("Sorry the password confirmation is required.")
            .oneOf([Yup.ref("password")], "Password must match"),

      email: Yup.string()
        .email("Invalid email.")
        .required("Sorry the email is required."),

      password: Yup.string()
        .min(4, "Must be more than 3 characters.")
        .required("Sorry the password is required."),
    }),
    onSubmit: (values) => {
      if (hasAccount) {
        loginUser({
          variables: {
            fields: {
              email: values.email,
              password: values.password,
            },
          },
        });
      }
      if (hasAccount === false) {
        createUser({
          variables: {
            fields: {
              name: values.name,
              lastname: values.lastname,
              phone:values.phone,
              email: values.email,
              password: values.passwordConfirm,
              file: values.avatar,
              lastModified: values.avatar.lastModified.toString()

            },
          },
        });
      }
    },
  });

  // Error Modal
  useEffect(() => {
    if (responseRegister.errors) {
      setModalOpen(true);
      setModalContext(responseRegister.errors[0].message);
    }
    if (responseLogin.errors) {
      setModalOpen(true);
      setModalContext(responseLogin.errors[0].message);
    }
  });

  // Dom Handlers
  const handlerModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Typography variant="h3" align="center" className={classes.headline}>
        {hasAccount ? "Login" : "Sign Up"}
      </Typography>

      <form className={classes.formContainer} encType="multipart/form-data"  onSubmit={formik.handleSubmit}>
        <Grid container direction="column">
          
          {/* Name Field */}
          {hasAccount === true ? null : (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                }}
                className={classes.inputs}
                placeholder="Name"
                name="name"
                inputProps={{ autoComplete: "off" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={Boolean(formik.touched.name && formik.errors.name)}
                startAdornment={
                  <InputAdornment>
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
              {formik.touched.name && formik.errors.name ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.name}
                </Typography>
              ) : null}
            </Grid>
          )}

          {/* Lastname Field */}
          {hasAccount === true ? null : (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                }}
                className={classes.inputs}
                placeholder="Lastname"
                name="lastname"
                inputProps={{ autoComplete: "off" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                error={Boolean(formik.touched.lastname && formik.errors.lastname)}
                startAdornment={
                  <InputAdornment>
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.lastname}
                </Typography>
              ) : null}
            </Grid>
          )}

           {/* Phone Field */}
           {hasAccount === true ? null : (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                }}
                className={classes.inputs}
                placeholder="Phone"
                name="phone"
                inputProps={{ autoComplete: "off" }}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                startAdornment={
                  <InputAdornment>
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.phone}
                </Typography>
              ) : null}
            </Grid>
          )}

          {/* Email Field */}
          <Grid item>
            <Input
              classes={{
                underline: classes.underline,
                input: classes.inputRoot,
              }}
              className={classes.inputs}
              placeholder="Email"
              inputProps={{ autoComplete: "off" }}
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              startAdornment={
                <InputAdornment>
                  <MailOutlineIcon />
                </InputAdornment>
              }
            />
            {formik.touched.email && formik.errors.email ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.email}
              </Typography>
            ) : null}
          </Grid>

          {/* Password Field */}
          <Grid item>
            <Input
              classes={{
                underline: classes.underline,
                input: classes.inputRoot,
              }}
              className={classes.inputs}
              autoComplete="current-password"
              placeholder="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              error={Boolean(formik.touched.password && formik.errors.password)}
              type="password"
              startAdornment={
                <InputAdornment>
                  <LockOpenIcon />
                </InputAdornment>
              }
            />
            {formik.touched.password && formik.errors.password ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.password}
              </Typography>
            ) : null}
          </Grid>

          {/* Password Confirm Field */}
          {hasAccount === true ? null : (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                }}
                className={classes.inputs}
                placeholder="Password Confirm"
                name="passwordConfirm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                autoComplete="true"
                error={Boolean(
                  formik.touched.passwordConfirm &&
                    formik.errors.passwordConfirm
                )}
                type="password"
                startAdornment={
                  <InputAdornment>
                    <LockOpenIcon />
                  </InputAdornment>
                }
              />
              {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.passwordConfirm}
                </Typography>
              ) : null}
            </Grid>
          )}

          {/* Avatar Field */}
          {hasAccount === true ? null : (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                }}
                className={classes.inputs}
                name="avatar"
                onChange={(event) => {
                  formik.setFieldValue("avatar", event.currentTarget.files[0]);
                }}
                inputProps={{ type: "file", accept: "image/png, image/jpeg" }}          
                startAdornment={
                  <InputAdornment>
                    <LockOpenIcon />
                  </InputAdornment>
                }
              />
            </Grid>
          )}

          {/* Buttons */}
          {hasAccount === true ? (
            <Button
              color="primary"
              variant="outlined"
              style={{ marginTop: "2em" }}
              type="submit"
            >
              {responseLogin.loading ? (
                <CircularProgress size={30} color="primary" disableShrink />
              ) : (
                "Sign In"
              )}
            </Button>
          ) : (
            <Button
              color="primary"
              variant="outlined"
              style={{ marginTop: "2em" }}
              type="submit"
            >
              {responseRegister.loading ? (
                <CircularProgress color="secondary" />
              ) : (
                "Sign Up"
              )}
            </Button>
          )}

          {/* Sub Texts */}
          <Typography align="right" className={classes.forgetText}>
            {hasAccount === false
              ? "Have an account?"
              : "Don't have an account?"}

            <Button
              onClick={() => setHasAccount((prev) => !prev)}
              className={classes.btnSignIn}
            >
              {hasAccount === true ? "Sign up" : "Sign in"}
            </Button>
          </Typography>
        
        </Grid>
      </form>
      <ModalCard
        open={modalOpen}
        onClose={handlerModalClose}
        context={modalContext}
        headline={"Error"}
        btnContext="Okey"
      />
    </>
  );
};

export default AuthForm;
