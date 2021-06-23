import {useContext, useState, useEffect} from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useMutation } from "@apollo/client"

import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Input from "@material-ui/core/Input";
import { InputLabel } from '@material-ui/core';
import FeedbackBar from "../../../../shared/UI Components/FeedbackBar";
import InputForm from "../../../../shared/UI Components/InputForm";
import ButtonForm from "../../../../shared/UI Components/ButtonForm";

import {ADD_PROFILE} from "../../../../shared/apolloRequests"
import { AuthContext } from "../../../../shared/contexts/AuthContext";
import ErrorCard from "../../../../shared/UI Components/ErrorCard";

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
    fontWeight:"bold",
    marginBottom:"1em"
  },
  checkboxGrid:{
    backgroundColor: theme.palette.common.purple,
    borderRadius: "1em",
    padding:"0.2em",
  },
  checkboxLabel:{
    fontWeight: "bold",
    paddingLeft:"1em",
  },
  checkboxInput:{
    height:"20px",
    padding:"1em",
    width:"20%"

  },
}))

const ProfileAddModal = ({modalClose}) => {
  const classes = useStyles()
  const {authStates, setAuthStates} = useContext(AuthContext)
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [localImageURL, setLocalImageURL] = useState("")
  const [addProfile, responseAddProfile] = useMutation(ADD_PROFILE, {
    onCompleted: (data) => {
      setAuthStates(prev => {
        return {
          ...prev,
          profiles: data.addProfile.profiles
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
      name:"",
      kidProtection: false,
      file: null,
    },
    validationSchema: Yup.object({
      name: Yup
        .string(),
      kidProtection: Yup
        .boolean(),
      avatar: Yup
        .string(),
    }),

    onSubmit: (values)=> {
      addProfile({
        variables: {
          fields: {
            _id: authStates.userId,
            name: values.name,
            kidProtection: values.kidProtection,
            file: values.avatar,
            lastModified: values.avatar.lastModified.toString() || null
          }
        }
      })
    }
  })

  // Image Upload Preview
  useEffect(() => {
    let result
    if(formik.values.avatar) {
    const reader = new FileReader()
    reader.onload = function() {
      result = reader.result
      setLocalImageURL(result)
    }
    reader.readAsDataURL(formik.values.avatar)
  }

  },[formik.values.avatar])

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
          Adding Profile
        </Typography>
      </Grid>

      {/* Form */}
      <form onSubmit={formik.handleSubmit} >
  
        {/* Avatar & Inputs */}
        <Grid 
          item container
          direction="row">
  
          {/** Avatar **/}
          <Grid 
            item container  
            xs={4} 
            justify="center"
          >
                <InputLabel 
                  htmlFor="avatar" 
                  focused={true} 
                  className={classes.inputLabel}
                  >
                  <Image
                    className={classes.avatar}
                    src={localImageURL || "/images/DefaultProfil.svg"}
                    alt="profile picture"
                    width={localImageURL ? 120 : 80}
                    height={localImageURL ? 120: 80}
                  />
                </InputLabel>
                <Input
                  classes={{
                    input: classes.inputRoot,
                  }}
                  name="avatar"
                  onChange={(event) => {
                    formik.setFieldValue("avatar", event.currentTarget.files[0]);
                  }}
                  inputProps={{ type: "file", accept: "image/png, image/jpeg", id:"avatar" }}           
                />   
          </Grid>
  
          {/** Inputs **/}
          <Grid 
            item container
            direction="column" 
            justify="center"
            xs={8}>
  
             {/* Name */}
             <Grid 
               item container
               justify="space-between"
               alignItems="center">
                <InputForm 
                  type="text" 
                  name="name"
                  placeholder="Name"
                  formik={formik}
                />
             </Grid>
  
             {/* Kid Protection */}
             <Grid 
               item container
               justify="space-between"
               alignItems="center"
               className={classes.checkboxGrid}>

               <label 
                  htmlFor="kidProtection"
                  className={classes.checkboxLabel}> 
                  Kid Protection
               </label>
               <input 
                 className={classes.checkboxInput}
                 type="checkbox"
                 name="kidProtection"
                 autoComplete="off"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.kidProtection}
               >
               </input>
               {formik.touched.kidProtection && formik.errors.kidProtection ? (
                     <Typography className={classes.errorFeedback}>
                       {formik.errors.kidProtection}
                     </Typography>
               ) : null}
             </Grid>
               
          </Grid>
  
        </Grid>
      
        {/* Change Button */}
        <ButtonForm 
          text="Add Profile"
          loadingState = {responseAddProfile.loading}
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
        open={Boolean(responseAddProfile.data && !responseAddProfile.error)} 
        message={"Profile Succesfully Added."}
      />
    
    </Grid>
  )
}

export default ProfileAddModal