import React, { useState, useRef } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

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
    color:"white"
  }
}));

const AuthForm = () => {
  const classes = useStyles()
  const [hasAccount, setHasAccount] = useState(false);
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()

  const submitHandler = (e) => {
    e.preventDefault();

    // 1) Validate data before send
    
    // 2) Send the request graphql to create user or login

    // 3) Catch Error 
  };


  return (
    <>
      <Typography 
        variant="h3" 
        align="center" 
        className={classes.headline}>
          {hasAccount ? "Sign Up" : "Login" }
      </Typography>
      
      <form
        className={classes.formContainer}
        onSubmit={(e) => submitHandler(e)}
      >

        <Grid container direction="column">
        
        {/* Name Field */}
          {hasAccount === true ? (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                  error: classes.error,
                }}
                className={classes.inputs}
                placeholder="Name"
                inputRef={nameRef}
                required="true"
                autoComplete="true"
                error={false}
                startAdornment={
                  <InputAdornment>
                    <AccountCircleIcon />
                  </InputAdornment>
                }
              />
            </Grid>
          ) : null}
          
        {/* Email Field */}  
          <Grid item>
            <Input
              classes={{
                underline: classes.underline,
                input: classes.inputRoot,
                error: classes.error,
              }}
              className={classes.inputs}
              placeholder="Email"
              required
              autoComplete="true"
              error={false}
              inputRef = {emailRef}
              startAdornment={
                <InputAdornment>
                  <MailOutlineIcon />
                </InputAdornment>
              }
            />
          </Grid>
          
        {/* Password Field */}  
          <Grid item>
            <Input
              classes={{
                underline: classes.underline,
                input: classes.inputRoot,
                error: classes.error,
              }}
              className={classes.inputs}
              autoComplete="current-password"
              placeholder="Password"
              required= "true"
              error={false}
              type="password"
              inputRef = {passwordRef}
              startAdornment={
                <InputAdornment>
                  <LockOpenIcon />
                </InputAdornment>
              }
            />
          </Grid>

        {/* Password Confirm Field */}
          {hasAccount === true ? (
            <Grid item>
              <Input
                classes={{
                  underline: classes.underline,
                  input: classes.inputRoot,
                  error: classes.error,
                }}
                className={classes.inputs}
                placeholder="Password Confirm"
                inputRef={passwordConfirmRef}
                autoComplete="true"
                required = "true"
                error={false}
                startAdornment={
                  <InputAdornment>
                    <LockOpenIcon />
                  </InputAdornment>
                }
              />
            </Grid>
          ) : null}

        {/* Buttons */}
          {hasAccount === true ? (
            <Button 
              color="primary" 
              variant="outlined" 
              style={{marginTop:"2em"}}>
              Sign Up
            </Button>
          ) : (
            <Button 
              color="primary" 
              variant="outlined"
              style={{marginTop:"2em"}}>
                Sign In
            </Button>
          )}

        {/* Sub Texts */}
          <Typography align="right" className={classes.forgetText}>
            {hasAccount === true
              ? "Have an account?"
              : "Don't have an account?"}

            <Button
              onClick={() => setHasAccount((prev) => !prev)}
              color="secondary"
              className={classes.btnSignIn}
            >
              {hasAccount === true ? "Sign in" : "Sign up"}
            </Button>
          </Typography>
        
        </Grid>
      </form>
    </>
  );
};

export default AuthForm;
