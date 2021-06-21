import React, { useState, useContext } from "react";
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

import {DELETE_PROFILE} from "../../../../shared/apolloRequests"
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
   width:"12em",
   marginRight:"1em",
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
  text: {
    fontSize:"1.2em"
  }
}))


const ProfileDeleteModal = ({modalClose, profileName}) => {
  const classes = useStyles()
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const {authStates, setAuthStates} = useContext(AuthContext)
  const [modalContext, setModalContext] = useState("");
  const [deleteProfile, responseDeleteProfile] = useMutation(DELETE_PROFILE, {
    onCompleted: (data) => {
      setAuthStates(prev => {
        return {
          ...prev,
          profiles: data.deleteProfile.profiles
        }
      })
      setTimeout(()=> {
        modalClose()
      }, [1000])
    },
    onError: (err) => {
      setErrorModalOpen(true);
      setModalContext(err.message)
    }
  })

  // Dom Handlers
  const handlerErrorModalClose = () => {
    setErrorModalOpen(false);
  };
  const handleNo = () => {
    modalClose()
  }
  const handleYes = () => {
    deleteProfile({
      variables: {
        fields: {
          _id: authStates.userId,
          name: profileName
        }
      }
    })
  }

  return (
    <Grid 
      item container
      className={classes.main}
      direction="column">
        
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>
          Delete Profile
        </Typography>
      </Grid>

      <Grid item>
        <Typography className={classes.text}>
          Are You Sure ?
        </Typography>
      </Grid>


 
      <Grid 
        item container>
        {/* Change Button */}
          <Button 
            color="primary"
            variant="outlined"
            onClick={handleYes}
            className={classes.btnChange}
            >
            {responseDeleteProfile.loading 
              ? 
              <CircularProgress color="secondary" />
              : 
              "Yes"
            }
          </Button>
          <Button 
            color="primary"
            variant="outlined"
            onClick={handleNo}
            className={classes.btnChange}
            >
              No
          </Button>
      </Grid>
            
      <ErrorCard
        open={errorModalOpen}
        onClose={handlerErrorModalClose}
        context={modalContext}
        headline={"Error"}
        btnContext="Okey"
      />
      <Snackbar 
        open={Boolean(responseDeleteProfile.data && !responseDeleteProfile.error)} 
        autoHideDuration={1500} 
        anchorOrigin={{ vertical: "top", horizontal:"center" }}
        >
        <Alert  severity="success">
          The profile succesfully deleted.
        </Alert>
      </Snackbar>

    </Grid>
  )
}

export default ProfileDeleteModal
