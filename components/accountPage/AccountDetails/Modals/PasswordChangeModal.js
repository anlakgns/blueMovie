import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"

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
}))


const PasswordChangeModal = () => {
  const classes = useStyles()

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

      {/* Current Password */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center"
        className={classes.lineGrid}>
        <Typography 
          className={classes.lineText}>
          Current Password
        </Typography>
      </Grid>

      {/* New Password */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center"
        className={classes.lineGrid}>
        <Typography 
          className={classes.lineText}>
          New Password
        </Typography>
      </Grid>
      
      {/* Confirm Password */}
      <Grid 
        item container
        justify="flex-start"
        alignItems="center"
        className={classes.lineGrid}>
        <Typography 
          className={classes.lineText}>
          Confirm New Password
        </Typography>
      </Grid>
      
      {/* Change Button */}
      <Button 
        color="primary"
        variant="outlined"
        className={classes.btnChange}
        >
          Change Password
      </Button>
    
    </Grid>
  )
}

export default PasswordChangeModal
