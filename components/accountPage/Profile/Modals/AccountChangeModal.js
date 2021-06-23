import { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";

import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";

import { CHANGE_INFO } from "../../../../shared/apolloRequests";
import { AuthContext } from "../../../../shared/contexts/AuthContext";
import ErrorCard from "../../../../shared/UI Components/ErrorCard";
import FeedbackBar from "../../../../shared/UI Components/FeedbackBar";
import AvatarForm from "../../../../shared/UI Components/AvatarForm";
import ButtonForm from "../../../../shared/UI Components/ButtonForm";
import InputForm from "../../../../shared/UI Components/InputForm";

const useStyles = makeStyles((theme) => ({
  main: {
    color: theme.palette.common.textWhite,
    backgroundColor: theme.palette.common.backgroundDark,
    padding: "3em",
    width: "600px",
  },
  headline: {
    color: theme.palette.common.purple,
    fontSize: "1.5em",
    marginTop: "1em",
    fontWeight: "bold",
    marginBottom: "1em",
  },
}));

const AccountChangeModal = ({ modalClose }) => {
  const classes = useStyles();
  const { authStates, setAuthStates } = useContext(AuthContext);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [localImageURL, setLocalImageURL] = useState("")
  const [updateUserInfo, responseUpdateUserInfo] = useMutation(CHANGE_INFO, {
    onCompleted: (data) => {
      setAuthStates((prev) => {
        return {
          ...prev,
          name: data.updateUserInfo.name,
          lastname: data.updateUserInfo.lastname,
          phone: data.updateUserInfo.phone,
          avatar: data.updateUserInfo.avatar
        };
      });
      setTimeout(() => {
        modalClose();
      }, [1800]);
    },
    onError: (err) => {
      setErrorModalOpen(true);
      setModalContext(err.message);
    },
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      phone: "",
      avatar: null
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      lastname: Yup.string(),
      phone: Yup.string(),
    }),

    onSubmit: (values) => {
      updateUserInfo({
        variables: {
          fields: {
            _id: authStates.userId,
            name: values.name,
            lastname: values.lastname,
            phone: values.phone,
            file: values.avatar,
            lastModified: values.avatar?.lastModified.toString()
          },
        },
      });
    },
  });

  console.log(formik.initialValues)
  console.log(formik.values)

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
    <Grid item container className={classes.main} direction="column">
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>Account Change</Typography>
      </Grid>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        
        {/**  Avatar & Inputs **/}
        <Grid item container direction="row">
          
          {/*** Avatar ***/}
          <Grid
            item
            container
            justify="center"
            xs={4}
          >
            <AvatarForm 
              src={localImageURL ||  authStates.avatar}
              alt="profile picture"
              name="avatar"
              formik={formik}
            />
          </Grid>

          {/*** Inputs ***/}
          <Grid item container direction="column" justify="center" xs={8}>
            
            {/**** Name ****/}
            <Grid item container justify="space-between" alignItems="center">      
              <InputForm 
                type="text" 
                name="name"
                placeholder="New name"
                formik={formik}
              />
            </Grid>

            {/**** Lastname ****/}
            <Grid item container justify="space-between" alignItems="center">     
              <InputForm 
                type="text" 
                name="lastname"
                placeholder="New Lastname"
                formik={formik}
              />
            </Grid>

            {/**** Phone ****/}
            <Grid item container justify="space-between" alignItems="center">
              <InputForm 
                type="text" 
                name="phone"
                placeholder="New phone"
                formik={formik}
              />
            </Grid>
          
          </Grid>
        </Grid>

        {/* Change Button */}
        <ButtonForm 
        text="Change Account Info"
        loadingState = {responseUpdateUserInfo.loading }
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
        open={Boolean(
          responseUpdateUserInfo.data && !responseUpdateUserInfo.error
        )}        
        message={"Account Info Succesfully Changed."}
      />
    </Grid>
  );
};

export default AccountChangeModal;
