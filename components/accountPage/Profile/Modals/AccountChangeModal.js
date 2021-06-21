import {useContext, useState} from "react"
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client"

import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {CHANGE_INFO} from "../../../../shared/apolloRequests"
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
  lineGrid:{
    padding:"0.2em",
    paddingLeft:"1em",
    paddingRight:"1em",
    backgroundColor: theme.palette.common.weakBlack,
    margin:"0.5em 0em",
    borderRadius:"1em",
  },
  lineText:{
    fontWeight:"bold"
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
  avatar: {
    borderRadius:"50%",
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

}))

const AccountChangeModal = ({modalClose}) => {
  const classes = useStyles()
  const {authStates, setAuthStates} = useContext(AuthContext)
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [updateUserInfo, responseUpdateUserInfo] = useMutation(CHANGE_INFO, {
    onCompleted: (data) => {
      setAuthStates(prev=> {
        return {
          ...prev,
          name: data.updateUserInfo.name,
          lastname: data.updateUserInfo.lastname,
          phone: data.updateUserInfo.phone
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
      lastname:"",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup
        .string(),
      lastname: Yup
        .string(),
      phone: Yup
        .string()
    }),

    onSubmit: (values)=> {
      updateUserInfo({
        variables: {
          fields: {
            _id: authStates.userId,
            name: values.name || authStates.name,
            lastname: values.lastname || authStates.lastname,
            phone: values.phone || authStates.phone
          }
        }
      })
    }
  })
  
  console.log(authStates)
 
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
          Account Change
        </Typography>
      </Grid>

      <form onSubmit={formik.handleSubmit} >
  
        {/* Avatar & Inputs */}
        <Grid 
          item container
          direction="row">
  
          {/** Avatar **/}
          <Grid 
            item container  xs={4}>
              <Image
                className={classes.avatar}
                src={authStates.avatar}
                alt="profile picture"
                width={ 150}
                height={150}
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
       
               <input 
                 className={classes.input}
                 type="text"
                 name="name"
                 autoComplete="off"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.name}
                 placeholder="Name">
               </input>
               {formik.touched.name && formik.errors.name ? (
                     <Typography className={classes.errorFeedback}>
                       {formik.errors.name}
                     </Typography>
               ) : null}
             </Grid>
  
             {/* Lastname */}
             <Grid 
               item container
               justify="space-between"
               alignItems="center">
       
               <input 
                 className={classes.input}
                 type="text"
                 name="lastname"
                 autoComplete="off"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.lastname}
                 placeholder="Lastname">
               </input>
               {formik.touched.lastname && formik.errors.lastname ? (
                     <Typography className={classes.errorFeedback}>
                       {formik.errors.lastname}
                     </Typography>
               ) : null}
             </Grid>
    
             {/* Phone */}
             <Grid 
               item container
               justify="space-between"
               alignItems="center">
       
               <input 
                 className={classes.input}
                 type="text"
                 name="phone"
                 autoComplete="off"
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 value={formik.values.phone}
                 placeholder="Phone">
               </input>
               {formik.touched.phone && formik.errors.phone ? (
                     <Typography className={classes.errorFeedback}>
                       {formik.errors.phone}
                     </Typography>
               ) : null}
             </Grid>
               
          </Grid>
  
        </Grid>
      
        {/* Change Button */}
        <Button 
        color="primary"
        variant="outlined"
        type="submit"
        className={classes.btnChange}
        >
          Change Account Info
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
        open={Boolean(responseUpdateUserInfo.data && !responseUpdateUserInfo.error)} 
        autoHideDuration={1500} 
        anchorOrigin={{ vertical: "top", horizontal:"center" }}
        >
        <Alert  severity="success">
          Acoount Infos Succesfully Changed
        </Alert>
      </Snackbar>
    
    </Grid>
  )
}

export default AccountChangeModal