import {useState, useEffect, useContext} from "react"
import {useRouter} from "next/router"

import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"

import {Profile} from "../components/accountPage/Profile"
import {OptionBar} from "../components/accountPage/OptionBar"
import {MovieList} from "../components/accountPage/MovieList"
import {AccountDetails} from "../components/accountPage/AccountDetails"

import {AuthContext} from "../shared/contexts/AuthContext"

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.common.backgroundDark
  }
}))


const Account = () => {
  const history = useRouter()
  const classes = useStyles()
  const {authStates} = useContext(AuthContext)

  return (
    <Grid 
      container
      className={classes.main}>

      {/* Left: Account Info */}
      <Grid item container sm={3} >
        <Profile />
      </Grid>

      {/* Right: Movies & Account Settings */}
      <Grid 
        item container 
        sm={9} 
        direciton="column">
          <MovieList />
        
      </Grid>

    </Grid>
  )
}

export default Account

Account.requireAuth = true