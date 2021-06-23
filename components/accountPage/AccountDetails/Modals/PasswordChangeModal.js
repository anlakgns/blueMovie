import {useContext, useState} from "react"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik";
import * as Yup from "yup";

import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"

import {AuthContext} from "../../../../shared/contexts/AuthContext"
import {CHANGE_PASSWORD} from "../../../../shared/apolloRequests"
import ErrorCard from "../../../../shared/UI Components/ErrorCard";
import FeedbackBar from "../../../../shared/UI Components/FeedbackBar";
import InputForm from "../../../../shared/UI Components/InputForm";
import ButtonForm from "../../../../shared/UI Components/ButtonForm";

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
const PasswordChangeModal = ({modalClose}) => {
  const classes = useStyles()
  const {authStates} = useContext(AuthContext)
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [updateUserPassword, responseUserPassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      console.log("password has changed")
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
      currentPassword:"",
      newPassword:"",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      currentPassword: Yup
        .string()
        .min(4, "Must be more than 3 characters.")
        .required("Sorry the current password is required."),
      newPassword: Yup
        .string()
        .min(4, "Must be more than 3 characters.")
        .required("Sorry the new password is required."),
      confirmNewPassword: Yup
        .string()
        .required("Please provide your new email")
        .min(4, "Must be more than 3 characters.")
        .oneOf([Yup.ref("newPassword")], "New passwords should match")
    }),
    onSubmit: (values)=> {
      updateUserPassword({
        variables: {
          fields: {
            _id: authStates.userId,
            password: values.currentPassword,
            newPassword: values.confirmNewPassword,
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
          Password Change
        </Typography>
      </Grid>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} >

        {/** Current Password **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">

          <InputForm 
            type="password" 
            name="currentPassword"
            placeholder="Current Password"
            formik={formik}
          />
        </Grid>

        {/** New Password **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">

          <InputForm 
            type="password" 
            name="newPassword"
            placeholder="New Password"
            formik={formik}
          />  
        </Grid>
        
        {/** Confirm Password **/}
        <Grid 
          item container
          justify="space-between"
          alignItems="center">

          <InputForm 
            type="password" 
            name="confirmNewPassword"
            placeholder="Confirm New Password"
            formik={formik}
          /> 
        </Grid>
      
        {/** Change Button **/}
        <ButtonForm 
          text="Change Password"
          loadingState = {responseUserPassword.loading}
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
        open={Boolean(responseUserPassword.data && !responseUserPassword.error)} 
        message={"Password Succesfully Changed."}
      />

      
    </Grid>
  )
}

export default PasswordChangeModal
