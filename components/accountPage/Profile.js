import {useContext} from "react"
import Image from "next/image";
import {useRouter} from "next/router"

import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import {useMutation} from "@apollo/client"
import {LOGOUT} from "../../shared/apolloRequests"

import {AuthContext} from "../../shared/contexts/AuthContext"

const useStyles = makeStyles((theme) => ({
  editIcon: {
    color: theme.palette.common.textWhite,
    fontSize: "0.8em",
  },
  btnEditIcon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: "1.5em",
    width: "1.5em",
    marginRight:"1em"
  },
  avatarInfoGrid: {
    marginTop: "1.5em",
  },
  userName: {
    color: theme.palette.common.textWhite,
    fontWeight: "bold",
    fontSize: "1.5em",
  },
  userDuration: {
    color: theme.palette.common.textWhite,
    fontWeight: "light",
    fontSize: "0.7em",
    opacity: 0.7,
  },
  miniHeadlines: {
    textTransform: "uppercase",
    color: theme.palette.common.textWhite,
    letterSpacing: "2px",
    fontSize: "0.8em",
    opacity: 0.8,
    paddingLeft: "2em",
    marginBottom: "1em",
  },
  btnPlusIcon: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "50%",
    height: "1em",
    width: "1em",
    opacity: 0.7,
  },
  watchTimeItem: {
    width: "5em",
    height: "3em",
    backgroundColor: theme.palette.primary.main,
    opacity: 0.8,
    borderRadius: "1em",
  },
  watchTimeNumbers: {
    color: theme.palette.common.textWhite,
    lineHeight: "1.2em",
    fontSize: "0.9em",
  },
  watchTimeTexts: {
    color: theme.palette.common.textWhite,
    lineHeight: "1.2em",
    fontSize: "0.9em",
  },
  btnLogout: {
    color: "white",
    width:"15em",
    marginTop:"3em",
    marginBottom:"3em"
  },
  avatar: {
    borderRadius:"50%",
  },
  avatarGrid:{
    marginBottom:"1em"
  },
  profileAvatars:{
    borderRadius: "50%"
  }
}));

export const Profile = () => {
  const classes = useStyles();
  const history = useRouter()
  const {setAuthStates} = useContext(AuthContext)
  const [logoutUser, logoutResponse] = useMutation(LOGOUT,
    {
      onCompleted: () => {
        setAuthStates(prev => {
          return {
            ...prev,
            isAuth: false
          }
        })
        history.push("/")
      },
      onError: (err)=> {
        console.log(err)
      }
    })

  const profiles = [1,1,1,1]


  // Dom Handlers
  const handleLogout = () => {
    logoutUser()
  }


  return (
    <>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        className={classes.main}
        spacing={4}
      >
        {/* Avatar & Info  */}
        <Grid item container className={classes.avatarInfoGrid}>
          
          {/** Edit Button **/}
          <Grid item container justify="flex-end">
            <IconButton className={classes.btnEditIcon}>
              <EditIcon className={classes.editIcon} />
            </IconButton>
          </Grid>

          {/** Avatar Pic **/}
          <Grid item container justify="center" className={classes.avatarGrid}>
            <Image
              className={classes.avatar}
              src="/images/avatarExample1.jpg"
              alt="profile picture"
              width={150}
              height={150}
            />
          </Grid>

          {/** Name & Duration **/}
          <Grid item container direction="column" alignItems="center">
            <Typography className={classes.userName}>Maria Simpson</Typography>
            <Typography className={classes.userDuration}>
              Member Since 10/03/2020
            </Typography>
          </Grid>
        </Grid>

        {/* Your Porfiles */}
        <Grid item container direction="column">
          <Grid item container direction="column" alignItems="center">
            <Grid item container alignItems="flex-start">
              <Typography className={classes.miniHeadlines}>
                Your Profiles
              </Typography>
            </Grid>
            <Grid
              item
              container
              justify="space-around"
              alignItems="center"
              
              xs={10}
            >
              {
                profiles.map(profile => {
                  return (
                    <Image
                    className={classes.profileAvatars}
                    src="/images/avatarExample1.jpg"
                    alt="profile picture"
                    width={40}
                    height={40}
                    />
                  )
                })
              }
             
              
              <IconButton className={classes.btnPlusIcon}>
                <AddIcon className={classes.editIcon} />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        {/* Watch Time */}
        <Grid item container direction="column">
          <Grid item container direction="column" alignItems="center">
            <Grid item container alignItems="flex-start">
              <Typography className={classes.miniHeadlines}>
                Watch Time
              </Typography>
            </Grid>
            <Grid
              item
              container
              justify="space-around"
              alignItems="center"
              xs={10}
            >
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.watchTimeItem}
              >
                <Typography className={classes.watchTimeNumbers}>3</Typography>
                <Typography className={classes.watchTimeTexts}>Days</Typography>
              </Grid>

              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.watchTimeItem}
              >
                <Typography className={classes.watchTimeNumbers}>22</Typography>
                <Typography className={classes.watchTimeTexts}>Hours</Typography>
              </Grid>

              <Grid
                item
                container
                direction="column"
                alignItems="center"
                justify="center"
                className={classes.watchTimeItem}
              >
                <Typography className={classes.watchTimeNumbers}>50</Typography>
                <Typography className={classes.watchTimeTexts}>Minutes</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Logout Button */}
        <Button 
          color="primary"
          variant="outlined"
          className={classes.btnLogout}
          onClick={handleLogout}>
            Log Out
        </Button>
      </Grid>
    </>
  );
};
