import { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useMutation } from "@apollo/client";

import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { InputLabel } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import Input from "@material-ui/core/Input";

import { CHANGE_PROFILE } from "../../../../shared/apolloRequests";
import { AuthContext } from "../../../../shared/contexts/AuthContext";
import ErrorCard from "../../../../shared/UI Components/ErrorCard";
import ButtonForm from "../../../../shared/UI Components/ButtonForm"
import FeedbackBar from "../../../../shared/UI Components/FeedbackBar"
import InputForm from "../../../../shared/UI Components/InputForm"
import AvatarForm from "../../../../shared/UI Components/AvatarForm";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    fontWeight: "bold",
    marginBottom: "1em",
  },
  checkboxGrid: {
    backgroundColor: theme.palette.common.purple,
    borderRadius: "1em",
    padding: "0.2em",
  },
  checkboxLabel: {
    fontWeight: "bold",
    paddingLeft: "1em",
  },
  checkboxInput: {
    height: "20px",
    padding: "1em",
    width: "20%",
  },
}));

const ProfileChangeModal = ({ modalClose, profil }) => {
  const classes = useStyles();
  const { authStates, setAuthStates } = useContext(AuthContext);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [localImageURL, setLocalImageURL] = useState("")
  const [changeProfile, responseChangeProfile] = useMutation(CHANGE_PROFILE, {
    onCompleted: (data) => {
      setAuthStates((prev) => {
        return {
          ...prev,
          profiles: data.changeProfile.profiles,
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
      kidProtection: "",
      avatar: "",
    },
    validationSchema: Yup.object({
      name: Yup.string(),
      kidProtection: Yup.boolean(),
      avatar: Yup.string(),
    }),
    onSubmit: (values) => {
      changeProfile({
        variables: {
          fields: {
            _id: authStates.userId,
            profileId: profil._id,
            name: values.name,
            kidProtection: values.kidProtection,
            file: values.avatar,
            lastModified: values.avatar?.lastModified?.toString() 
          },
        },
      });
    },
  });

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
        <Typography className={classes.headline}>Change Profile</Typography>
      </Grid>

      {/* Form */}
      <form onSubmit={formik.handleSubmit}>
        
        {/** Avatar & Inputs **/}
        <Grid item container direction="row">
          
          {/*** Avatar ***/}
          <Grid item container xs={4}>
            <AvatarForm 
              src={localImageURL || profil.avatar || "/images/DefaultProfil.svg"}
              alt="profile picture"
              name="avatar"
              formik={formik}
            />
          </Grid>

          {/*** Inputs ***/}
          <Grid item container direction="column" justify="center" xs={8}>
            {/**** Name ****/}
            <Grid item> 
              <InputForm 
                type="text"
                name="name"
                placeholder="New Name"
                formik={formik}
              />
            </Grid>

            {/**** Kid Protection ****/}
            <Grid
              item
              container
              justify="space-between"
              alignItems="center"
              className={classes.checkboxGrid}
            >
              <label htmlFor="kidProtection" className={classes.checkboxLabel}>
                Kid Protection
              </label>
              <input
                className={classes.checkboxInput}
                type="checkbox"
                name="kidProtection"
                autoComplete="off"
                checked={formik.values.kidProtection !== "" ? formik.values.kidProtection :  profil.kidProtection}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.kidProtection}
              ></input>
              {formik.touched.kidProtection && formik.errors.kidProtection ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.kidProtection}
                </Typography>
              ) : null}
            </Grid>
          </Grid>
        </Grid>

        {/** Change Button **/}
        <ButtonForm 
          text="Change Profil"
          loadingState = {responseChangeProfile.loading}
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
        open = {
          Boolean(
          responseChangeProfile.data && !responseChangeProfile.error)
        }
        message={"Profile Succesfully Changed."}
      />
      
    </Grid>
  );
};

export default ProfileChangeModal;
