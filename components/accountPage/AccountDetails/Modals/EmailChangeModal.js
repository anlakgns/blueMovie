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
   width:"15em",
   marginTop:"2em",
   marginBottom:"1em",
   [theme.breakpoints.down("md")]: {
     width: "12em"
   }
  },
}))


const EmailChange = () => {
  const classes = useStyles()

  return (
    <Grid 
      item container
      className={classes.main}
      direction="column">
        
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>
          Email Change
        </Typography>
      </Grid>

      {/* Current Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">
        <input 
          className={classes.input}
          type="email"
          placeholder="Current Email">
        </input>
      </Grid>

      {/* New Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">
        <input 
          className={classes.input}
          type="email"
          placeholder="New Email">
        </input>
      </Grid>
      
      {/* Confirm Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center">
        <input 
          className={classes.input}
          type="email"
          placeholder="Confirm Email">
        </input>
      </Grid>
      
      {/* Change Button */}
      <Button 
        color="primary"
        variant="outlined"
        className={classes.btnChange}
        >
          Change Email
      </Button>
    
    </Grid>
  )
}

export default EmailChange
