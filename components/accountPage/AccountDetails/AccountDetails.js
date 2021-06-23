import { Typography } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Membership from "./Membership"
import ProfilesList from "./ProfilesList"

const useStyles = makeStyles(theme => ({
  main: {
  },
  headline:{
    fontSize:"2em",
    color: theme.palette.common.textWhite,
    fontWeight:"bold",
  },
  underline: {
    borderBottom: "5px solid grey",
    width:"100%",
  }
}))

const AccountDetails = () => {
  const classes = useStyles()

  return (
    <Grid 
      item container
      justify="center"
      className={classes.main}>

        {/* Headline */}
        <Grid item container xs={11}  >
          <Typography align="left" className={classes.headline}>
            Account
          </Typography>
          <div className={classes.underline} />
        </Grid>

        {/* Membership */}
        <Grid item container xs={11}>
          <Membership />
        </Grid>

        {/* Profiles */}
        <Grid item container xs={11}>
          <ProfilesList />
        </Grid>
    
    </Grid>
  )
}

export default AccountDetails
