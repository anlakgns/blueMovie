import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";

import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ErrorCard from "../../../../shared/UI Components/ErrorCard";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthContext } from "../../../../shared/contexts/AuthContext";
import { CHANGE_PLAN } from "../../../../shared/apolloRequests";

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
    marginTop: "1em",
    fontWeight: "bold",
    marginBottom: "1em",
  },
  card: {
    minWidth: 140,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.textWhite,
  },
  title: {
    fontSize: "1em",
  },
  btnChange: {
    color: "white",
    width: "15em",
    marginTop: "2em",
    marginBottom: "1em",
    [theme.breakpoints.down("md")]: {
      width: "12em",
    },
  },
  planName: {
    textTransform: "uppercase",
    fontSize: "0.8em",
    marginBottom: "0.5em",
    fontWeight: "bold",
    letterSpacing: "0.2em",
  },
  elipsLine: {
    backgroundColor: theme.palette.common.textWhite,
    height: "2px",
    width: "120px",
    borderRadius: "50%",
    marginBottom: "0.5em",
  },
  prices: {
    fontSize: "2em",
    color: theme.palette.common.purple,
    fontWeight: "bold",
  },
  features: {
    fontSize: "0.7em",
    fontWeight: 200,
    textTransform: "none",
  },
  btnCard: {
    padding: 0,
  },
}));

const ProfileChangeModal = ({ modalClose }) => {
  const classes = useStyles();
  const { authStates, setAuthStates } = useContext(AuthContext);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(authStates.plan);
  const [changePlan, responseChangePlan] = useMutation(CHANGE_PLAN, {
    onCompleted: (data) => {
      setAuthStates((prev) => {
        return {
          ...prev,
          plan: data.changePlan.newPlan,
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

  // Dom Handlers
  const handlerErrorModalClose = () => {
    setErrorModalOpen(false);
  };
  const handleCardButton = (plan) => {
    setSelectedPlan(plan);
  };
  const handleChangePlan = () => {
    changePlan({
      variables: {
        fields: {
          plan: selectedPlan,
          _id: authStates.userId,
        },
      },
    });
  };

  return (
    <Grid item container className={classes.main} direction="column">
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>Plan Change</Typography>
      </Grid>

      {/* Plan Cards */}
      <Grid item container direction="row" justify="center" spacing={2}>
        {/** Free   **/}
        <Grid item>
          <Button
            classes={{ root: classes.btnCard }}
            onClick={() => {
              handleCardButton("Trial");
            }}
            style={{ opacity: selectedPlan === "Trial" ? 1 : 0.5 }}
          >
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" className={classes.planName}>
                  Free Trial
                </Typography>
                <div className={classes.elipsLine} />
                <Typography className={classes.prices} align="center">
                  FREE
                </Typography>
                <Typography className={classes.features} align="center">
                  UHD Available
                </Typography>
                <Typography className={classes.features} align="center">
                  Watch from any device
                </Typography>
                <Typography className={classes.features} align="center">
                  1 simultaneous devices
                </Typography>
              </CardContent>
            </Card>
          </Button>
        </Grid>

        {/** Starter   **/}
        <Grid item>
          <Button
            classes={{ root: classes.btnCard }}
            onClick={() => {
              handleCardButton("Starter");
            }}
            style={{ opacity: selectedPlan === "Starter" ? 1 : 0.5 }}
          >
            <Card className={classes.card}>
              <CardContent>
                <Typography align="center" className={classes.planName}>
                  Starter
                </Typography>
                <div className={classes.elipsLine} />
                <Typography className={classes.prices} align="center">
                  $9.99
                </Typography>
                <Typography className={classes.features} align="center">
                  UHD and 4K Available
                </Typography>
                <Typography className={classes.features} align="center">
                  Watch from any device
                </Typography>
                <Typography className={classes.features} align="center">
                  2 simultaneous devices
                </Typography>
              </CardContent>
            </Card>
          </Button>
        </Grid>

        {/** Premium **/}
        <Grid item>
          <Button
            classes={{ root: classes.btnCard }}
            onClick={() => {
              handleCardButton("Premium");
            }}
          >
            <Card
              className={classes.card}
              style={{ opacity: selectedPlan === "Premium" ? 1 : 0.5 }}
            >
              <CardContent>
                <Typography align="center" className={classes.planName}>
                  Premium
                </Typography>
                <div className={classes.elipsLine} />
                <Typography className={classes.prices} align="center">
                  $19.99
                </Typography>
                <Typography className={classes.features} align="center">
                  UHD and 4K Available
                </Typography>
                <Typography className={classes.features} align="center">
                  Watch from any device
                </Typography>
                <Typography className={classes.features} align="center">
                  4 simultaneous devices
                </Typography>
              </CardContent>
            </Card>
          </Button>
        </Grid>
      </Grid>

      {/* Change Button */}
      <Button 
        color="primary"
        variant="outlined"
        type="submit"
        onClick={handleChangePlan}
        className={classes.btnChange}
        >
        {responseChangePlan.loading 
          ? 
          <CircularProgress color="secondary" />
          : 
          "Change Plan"
        }
      </Button>

      <ErrorCard
        open={errorModalOpen}
        onClose={handlerErrorModalClose}
        context={modalContext}
        headline={"Error"}
        btnContext="Okey"
      />
      <Snackbar
        open={Boolean(responseChangePlan.data && !responseChangePlan.error)}
        autoHideDuration={1500}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">Plan Succesfully Changed</Alert>
      </Snackbar>
    </Grid>
  );
};

export default ProfileChangeModal;
