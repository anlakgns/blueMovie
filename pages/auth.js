import React, {useContext} from "react"
import {useRouter} from "next/router"

import {makeStyles} from '@material-ui/styles'
import Grid from "@material-ui/core/Grid"

import AuthForm from "../components/authPage/AuthForm"
import {AuthContext} from "../shared/contexts/AuthContext"


const useStyles = makeStyles(theme => ({
  allPage: {
   backgroundColor: theme.palette.common.backgroundDark
 },
 LoginContainer:{
   height:"80vh"
 },
}))



const Auth = (props)=> {
  console.log(props)
  const {authStates} = useContext(AuthContext)
  const history = useRouter()
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
          <AuthForm />
        </Grid>

      </Grid>
    </Grid>
    </>
  )
}




export default Auth

Auth.requireAuth = "requiredNotAuth"