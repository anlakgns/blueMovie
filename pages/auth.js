import React from "react"

import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"

import AuthForm from "../components/authPage/AuthForm"


const useStyles = makeStyles(theme => ({
  allPage: {
   backgroundColor: theme.palette.common.backgroundDark
 },
 LoginContainer:{
   height:"80vh"
 },
}))

const Auth = ({logStatus})=> {
  const classes = useStyles()
  return (
    <>
    <Grid container direction="column" className={classes.allPage} >
      
      {/* Auth Section */}    
      <Grid 
        item container 
        direction="row" 
        className={classes.LoginContainer} 
        justify="center" 
        alignItems="center" >

        <Grid item  md={3} sm={4} xs={8}  >
          <AuthForm logStatus={logStatus} />
        </Grid>

      </Grid>
    </Grid>
    </>
  )
}

export default Auth