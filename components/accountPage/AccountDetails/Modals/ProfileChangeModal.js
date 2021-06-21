import { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useMutation } from "@apollo/client";

import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { CHANGE_PROFILE } from "../../../../shared/apolloRequests";
import { AuthContext } from "../../../../shared/contexts/AuthContext";
import ErrorCard from "../../../../shared/UI Components/ErrorCard";

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
  lineGrid: {
    padding: "0.2em",
    paddingLeft: "1em",
    paddingRight: "1em",
    backgroundColor: theme.palette.common.weakBlack,
    margin: "0.5em 0em",
    borderRadius: "1em",
  },
  lineText: {
    fontWeight: "bold",
  },
  btnChange: {
    color: "white",
    width: "15em",
    marginTop: "2em",
    marginBottom: "2em",
    [theme.breakpoints.down("md")]: {
      width: "12em",
    },
  },
  avatar: {
    borderRadius: "50%",
  },
  input: {
    width: "100%",
    borderRadius: "1em",
    backgroundColor: theme.palette.common.weakBlack,
    outline: "none",
    border: "none",
    padding: "0.2em",
    paddingLeft: "1em",
    paddingRight: "1em",
    margin: "0.5em 0em",
    height: "30px",
    color: theme.palette.common.textWhite,
    fontWeight: "bold",
    "&::placeholder": {
      color: theme.palette.common.textWhite,
      fontWeight: "bold",
      opacity: 0.7,
    },
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
            name: values.name || profil.name,
            kidProtection: values.kidProtection || profil.kidProtection,
            avatar: values.avatar || profil.avatar,
          },
        },
      });
    },
  });

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

      <form onSubmit={formik.handleSubmit}>
        {/* Avatar & Inputs */}
        <Grid item container direction="row">
          {/** Avatar **/}
          <Grid item container xs={4}>
            <Image
              className={classes.avatar}
              src={authStates.avatar}
              alt="profile picture"
              width={140}
              height={140}
            />
          </Grid>

          {/** Inputs **/}
          <Grid item container direction="column" justify="center" xs={8}>
            {/* Name */}
            <Grid item container justify="space-between" alignItems="center">
              <input
                className={classes.input}
                type="text"
                name="name"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                placeholder="Name"
              ></input>
              {formik.touched.name && formik.errors.name ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.name}
                </Typography>
              ) : null}
            </Grid>

            {/* Kid Protection */}
            <Grid
              item
              container
              justify="space-between"
              alignItems="center"
              className={classes.checkboxGrid}
            >
              <label for="kidProtection" className={classes.checkboxLabel}>
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
              ></input>
              {formik.touched.kidProtection && formik.errors.kidProtection ? (
                <Typography className={classes.errorFeedback}>
                  {formik.errors.kidProtection}
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
          {responseChangeProfile.loading ? (
            <CircularProgress color="secondary" />
          ) : (
            "Change Profile"
          )}
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
        open={Boolean(
          responseChangeProfile.data && !responseChangeProfile.error
        )}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Profile Succesfully Changed.</Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProfileChangeModal;
