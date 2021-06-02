import { Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "1em 3em",
    backgroundColor: theme.palette.common.backgroundDark,
    height: "90px",
    position: "fixed",
    bottom:0,
    [theme.breakpoints.down("md")]: {
      height:"80px",
    },
  },
  text: {
    color:theme.palette.common.textWhite,
    fontWeight:"bold",
    opacity: 0.7
  }
}));

const HeaderNotLogged = () => {
  const classes = useStyles();

  return (
    <Grid 
      item container
      className= {classes.main}
      alignItems="center"
      justify="space-between"
      >
      
      {/* Text */}
      <Grid item xs={6}>
        <Typography 
          className={classes.text}>
            Copyright@ 2021 blueMovie
         </Typography>
      </Grid>
     
     {/* Logos */}
      <Grid 
        item container 
        xs={6}
        spacing={2}
        justify="flex-end"
        >
        <Grid item>
          <Image 
              src="/images/facebook.svg" 
              alt="logo"
              width={32}
              height={32} 
           />
        </Grid>
        <Grid item>
          <Image 
              src="/images/twitter.svg" 
              alt="logo"
              width={32}
              height={32} 
           />
        </Grid>
        <Grid item>
          <Image 
              src="/images/instagram.svg" 
              alt="logo"
              width={32}
              height={32} 
           />
        </Grid>
        
      
       
      </Grid>
    
    </Grid>
  );
};

export default HeaderNotLogged;