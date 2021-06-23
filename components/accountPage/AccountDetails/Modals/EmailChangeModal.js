import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client"

import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"

import {CHANGE_EMAIL} from "../../../../shared/apolloRequests"
import {AuthContext} from "../../../../shared/contexts/AuthContext"
import ErrorCard from "../../../../shared/UI Components/ErrorCard";
import InputForm from "../../../../shared/UI Components/InputForm";
import ButtonForm from "../../../../shared/UI Components/ButtonForm";
import FeedbackBar from "../../../../shared/UI Components/FeedbackBar";

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
        .email("Invalid Email")
        .required("Please provide your new email")
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

      {/* Form */}
      <form onSubmit={formik.handleSubmit} >
        {/** Current Email **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">

          <InputForm 
            type="email" 
            name="currentEmail"
            placeholder="Current Email"
            formik={formik}
          />
        </Grid>

        {/** Password Check **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">
          
          <InputForm 
            type="password" 
            name="password"
            placeholder="Current Password"
            formik={formik}
          />
        </Grid>

        {/** New Email **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">

          <InputForm 
            type="email" 
            name="newEmail"
            placeholder="New Email"
            formik={formik}
          />
        </Grid>
        
        {/** Confirm Email **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">
          
          <InputForm 
            type="email" 
            name="confirmEmail"
            placeholder="Confirm Email"
            formik={formik}
          />
        </Grid>
        
        {/** Change Button **/}
        <ButtonForm 
          text="Change Email"
          loadingState = {responseUserEmail.loading}
        />
      
      </form>
      
      {/* Feedback & Error UI */}
      <ErrorCard
        open={errorModalOpen}
        onClose={handlerErrorModalClose}
        context={modalContext}
        headline={"Error"}
        btnContext="Okey"
      />
      <FeedbackBar
        open={Boolean(responseUserEmail.data && !responseUserEmail.error)} 
        message={"Email Succesfully Changed."}
      />

    </Grid>
  )
}

export default EmailChange
