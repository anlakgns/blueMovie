import {useContext, useState} from "react"
import { useMutation } from "@apollo/client"
import { useFormik } from "formik";
import * as Yup from "yup";

import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from "@material-ui/core/CircularProgress";

import {AuthContext} from "../../../../shared/contexts/AuthContext"
import {CHANGE_PASSWORD} from "../../../../shared/apolloRequests"
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
  btnChange: {
   color: "white",
   width:"15em",
   marginTop:"2em",
   marginBottom:"1em",
   [theme.breakpoints.down("md")]: {
     width: "12em"
   }
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
  errorFeedback: {
    color: theme.palette.common.error,
    fontSize: "0.8em",
    marginLeft:"1em"
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

      <form onSubmit={formik.handleSubmit} >

      {/* Current Password */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">

        <input 
          className={classes.input}
          type="password"
          name="currentPassword"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentPassword}
          placeholder="Current Password">
        </input>
        {formik.touched.currentPassword && formik.errors.currentPassword ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.currentPassword}
              </Typography>
        ) : null}
      </Grid>

      {/* New Password */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">

        <input 
          className={classes.input}
          type="password"
          name="newPassword"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          placeholder="New Password">
        </input>
        {formik.touched.newPassword && formik.errors.newPassword ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.newPassword}
              </Typography>
        ) : null}
      </Grid>
      
      {/* Confirm Password */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">

        <input 
          className={classes.input}
          type="password"
          name="confirmNewPassword"
          autoComplete="off"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmNewPassword}
          placeholder="Current Password">
        </input>
        {formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
              <Typography className={classes.errorFeedback}>
                {formik.errors.confirmNewPassword}
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
          {responseUserPassword.loading 
          ? 
          <CircularProgress color="secondary" />
          : 
          "Change Password"
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
        open={Boolean(responseUserPassword.data && !responseUserPassword.error)} 
        autoHideDuration={1500} 
        anchorOrigin={{ vertical: "top", horizontal:"center" }}
        >
        <Alert  severity="success">
          Password Succesfully Changed
        </Alert>
      </Snackbar>
      
    </Grid>
  )
}

export default PasswordChangeModal
