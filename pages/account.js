import {useState, useEffect, useContext} from "react"
import {useRouter} from "next/router"

import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"

import {Profile} from "../components/accountPage/Profile"
import {MovieList} from "../components/accountPage/MovieList"
import OptionBar from "../components/accountPage/OptionBar"

import {AuthContext} from "../shared/contexts/AuthContext"
import AccountDetails from "../components/accountPage/AccountDetails/AccountDetails"

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.common.backgroundDark
  }
}))


const Account = () => {
  const history = useRouter()
  const classes = useStyles()
  const [subSection, setSubSection] = useState("myList");
  const {authStates} = useContext(AuthContext)


  return (
    <Grid 
      container
      className={classes.main}>

      {/* Left: Account Info */}
      <Grid item container md={3} sm={4} >
        <Profile />
      </Grid>

      {/* Right: Movies & Account Settings */}
      <Grid 
        item container 
        md={9} 
        sm={8}
        direction="column">
          <Grid item container direction="column">
            <OptionBar setSubSection={setSubSection}  />
            {subSection === "myList" ?
              <MovieList />
              :
              <AccountDetails />
            }
          </Grid>
        
      </Grid>

    </Grid>
  )
}

export default Account

Account.requireAuth = "requiredAuth"