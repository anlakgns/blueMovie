import React, { useState, useEffect, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client"

import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {CHANGE_EMAIL} from "../../../../shared/apolloRequests"
import {AuthContext} from "../../../../shared/contexts/AuthContext"
import ErrorCard from "../../../../shared/UI Components/ErrorCard";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles(theme => ({
  main: {
    color: theme.palette.common.textWhite,
    backgroundColor: theme.palette.common.backgroundDark,
    padding:"3em",
    width:"600px",
  },
  headline:{
    color: theme.palette.common.purple,
    fontSize:"1.5em",
    marginTop:"1em",
    fontWeight:"bold",
    marginBottom:"1em"
  },
  input:{
    width:"100%",
    borderRadius:"1em",
    backgroundColor: theme.palette.common.weakBlack,
    outline:"none",
    border:"none",
    padding:"0.2em",
    paddingLeft:"1em",
    paddingRight:"1em",
    margin:"0.5em 0em",
    height:"30px",
    color: theme.palette.common.textWhite,
    fontWeight:"bold",
    "&::placeholder": {
      color: theme.palette.common.textWhite,
      fontWeight:"bold",
      opacity:0.7
    }
  },
  btnChange: {
   color: "white",
   width:"15em",
   marginTop:"2em",
   marginBottom:"1em",
   [theme.breakpoints.down("md")]: {
     width: "12em"
   }
  },
  errorFeedback: {
    color: theme.palette.common.error,
    fontSize: "0.8em",
    marginLeft:"1em"
  },
}))


const EmailChange = ({modalClose}) => {
  const classes = useStyles()
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const {authStates, setAuthStates} = useContext(AuthContext)
  const [modalContext, setModalContext] = useState("");
  const [updateUserEmail, responseUserEmail] = useMutation(CHANGE_EMAIL, {
    onCompleted: (data) => {
      setAuthStates(prev => {
        console.log(data)
        return {
          ...prev,
          email: data.updateUserEmail.email
        }
      })
      setTimeout(()=> {
        modalClose()
      }, [1800])
    },
    onError: (err) => {
      setErrorModalOpen(true);
      setModalContext(err.message)
    }
  })
  const formik = useFormik({
    initialValues: {
      currentEmail:"",
      password:"",
      newEmail: "",
      confirmEmail:""
    },
    validationSchema: Yup.object({
      currentEmail: Yup
        .string()
        .email("Invalid email.")
        .required("Sorry the email is required."),
      password: Yup
        .string()
        .min(4, "Must be more than 3 characters.")
        .required("Sorry the password is required."),
      newEmail: Yup
        .string()
        .email("Invalid Email")
        .required("Please provide your new email."),
      confirmEmail: Yup
        .string()
        .required("Please provide your new email")
        .email("Invalid Email")
        .oneOf([Yup.ref("newEmail")], "New emails should match")
    }),
    onSubmit: (values)=> {
      updateUserEmail({
        variables: {
          fields: {
            _id: authStates.userId,
            email: values.currentEmail,
            newEmail: values.confirmEmail,
            password: values.password
          }
        }
      })
    }
  })


  // Dom Handlers
  const handlerErrorModalClose = () => {
    setErrorModalOpen(false);
  };

  return (
    <Grid 
      item container
      className={classes.main}
      direction="column">
        
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>
          Email Change
        </Typography>
      </Grid>

      <form onSubmit={formik.handleSubmit} >

      {/* Current Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">

        <input 
          className={classes.input}
          type="email"
          name="currentEmail"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentEmail}
          placeholder="Current Email">
        </input>
        {formik.touched.currentEmail && formik.errors.currentEmail ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.currentEmail}
              </Typography>
        ) : null}
      </Grid>

      {/* Password Check */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">

        <input 
          className={classes.input}
          type="password"
          name="password"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Current Password">
        </input>
        {formik.touched.password && formik.errors.password ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.password}
              </Typography>
        ) : null}
      </Grid>

      {/* New Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">
        <input 
          className={classes.input}
          type="email"
          name="newEmail"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newEmail}
          placeholder="New Email">
        </input>
        {formik.touched.newEmail && formik.errors.newEmail ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.newEmail}
              </Typography>
        ) : null}
      </Grid>
      
      {/* Confirm Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">
        <input 
          className={classes.input}
          type="email"
          name="confirmEmail"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmEmail}
          placeholder="Confirm Email">
        </input>
        {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.confirmEmail}
              </Typography>
        ) : null}
      </Grid>
      
      {/* Change Button */}
      <Button 
        color="primary"
        variant="outlined"
        type="submit"
        className={classes.btnChange}
        >
        {responseUserEmail.loading 
          ? 
          <CircularProgress color="secondary" />
          : 
          "Change Email"
        }
      </Button>
      
      </form>
      
      <ErrorCard
        open={errorModalOpen}
        onClose={handlerErrorModalClose}
        context={modalContext}
        headline={"Error"}
        btnContext="Okey"
      />
      <Snackbar 
        open={Boolean(responseUserEmail.data && !responseUserEmail.error)} 
        autoHideDuration={1500} 
        anchorOrigin={{ vertical: "top", horizontal:"center" }}
        >
        <Alert  severity="success">
          Email Succesfully Changed
        </Alert>
      </Snackbar>

    </Grid>
  )
}

export default EmailChange
