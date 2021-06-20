import {useState, useContext} from "react"

import { Typography } from "@material-ui/core"
import { Button } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Dialog from '@material-ui/core/Dialog';

import EmailChangeModal from "./Modals/EmailChangeModal"
import PasswordChangeModal from "./Modals/PasswordChangeModal"
import PlanChangeModal from "./Modals/PlanChangeModal"
import {AuthContext} from "../../../shared/contexts/AuthContext"

const useStyles = makeStyles(theme => ({
  main: {
    color: theme.palette.common.textWhite
  },
  headline:{
    color: theme.palette.common.purple,
    fontSize:"1.5em",
    marginTop:"1em",
    fontWeight:"bold"
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
  titleLine: {
    opacity:0.70,
    fontWeight:"bold"
  },
  btnChange:{
    color: theme.palette.common.purple,
    fontWeight:"bold"
  },
  dialogPaper:{
    borderRadius:"2em",
    backgroundColor: theme.palette.common.backgroundDark,
  }
}))

const Membership = () => {
  const classes = useStyles()
  const {authStates} = useContext(AuthContext)
  const [modalTracker, setModalTracker] = useState()
  const [modalOpen, setModalOpen] = useState(false)
console.log(authStates)

  // Dom Handlers
  const handleEmail = () => {
    setModalTracker("Email")
    setModalOpen(true)
  }
  const handlePassword = () => {
    setModalTracker("Password")
    setModalOpen(true)
  }
  const handlePlan = () => {
    setModalTracker("Plan")
    setModalOpen(true)
  }
  const modalClose = () => {
    setModalOpen(false)
  }
  console.log(authStates)
  
  return (
    <Grid 
      item container
      className={classes.main}
      direction="column">
        
      {/* Headline */}
      <Grid item>
        <Typography className={classes.headline}>
          Memberships
        </Typography>
      </Grid>

      {/* Email */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center"
        className={classes.lineGrid}>
        <Typography 
          className={classes.lineText}>
          <span className={classes.titleLine}>
            Email: &nbsp;
          </span> 
          {authStates.email}
        </Typography>
        <Button 
          className={classes.btnChange}
          onClick={handleEmail}>
          change email
        </Button>
      </Grid>

      {/* Password */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center"
        className={classes.lineGrid}>
        <Typography 
          className={classes.lineText}>
          <span className={classes.titleLine}>
            Password: &nbsp;
          </span> 
          *********
        </Typography>
        <Button 
          className={classes.btnChange}
          onClick={handlePassword}>
          change password
        </Button>
      </Grid>

      {/* Plan Details */}
      <Grid 
        item container
        justify="space-between"
        alignItems="center"
        className={classes.lineGrid}>
        <Typography 
          className={classes.lineText}>
          <span className={classes.titleLine}>
            Plan Details: &nbsp;
          </span> 
          {authStates.plan}
        </Typography>
        <Button 
          className={classes.btnChange}
          onClick={handlePlan}>
          change plan
        </Button>
      </Grid>
      
      {/* Edit Modals */}
      <Dialog 
        open={modalOpen}
        onClose={modalClose}
        classes={{paper: classes.dialogPaper}}>
        {
          modalTracker === "Email" ? 
          <EmailChangeModal modalClose={modalClose} /> : 
          null
        }
        {
          modalTracker === "Password" ? 
          <PasswordChangeModal  modalClose={modalClose}/> : 
          null
        }
        {
          modalTracker === "Plan" ? 
          <PlanChangeModal  modalClose={modalClose}/> : 
          null
        }
      </Dialog>


    </Grid>
  )
}

export default Membership
