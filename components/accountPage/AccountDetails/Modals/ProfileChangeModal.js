import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Image from "next/image";

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

const ProfileChangeModal = () => {
  const classes = useStyles()

  return (
    <Grid 
      item container
      className={classes.main}
      direction="column">
        
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>
          Profile Change
        </Typography>
      </Grid>

      {/* Avatar & Inputs */}
      <Grid 
        item container
        direction="row">

        {/** Avatar **/}
        <Grid 
          item container  xs={4}>
            <Image
              className={classes.avatar}
              src="/images/avatarExample1.jpg"
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

          <Grid 
            item 
            alignItems="center"
            className={classes.lineGrid}>
            <Typography 
              className={classes.lineText}>
              New Name
            </Typography>
          </Grid>  
  
          <Grid 
            item 
            alignItems="center"
            className={classes.lineGrid}>
            <Typography 
              className={classes.lineText}>
              Kid Protection
            </Typography>
          </Grid>  
          
        </Grid>

      </Grid>
    
      {/* Change Button */}
      <Button 
        color="primary"
        variant="outlined"
        className={classes.btnChange}
        >
          Change Profile
      </Button>
    
    </Grid>
  )
}

export default ProfileChangeModal