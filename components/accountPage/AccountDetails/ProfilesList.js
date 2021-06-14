import {useState} from "react"
import Image from "next/image";

import { Typography } from "@material-ui/core"
import { Button, IconButton } from "@material-ui/core"
import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import ProfileChangeModal from "./Modals/ProfileChangeModal"

const useStyles = makeStyles(theme => ({
  main: {
    color: theme.palette.common.textWhite
  },
  profileItem:{
    backgroundColor: theme.palette.common.weakBlack,
    width:"190px",
    height:"75px",
    borderRadius: "1em",
    marginRight:"1em",
    marginBottom:"1em"
  },
  headline:{
    color: theme.palette.common.purple,
    fontSize:"1.5em",
    marginTop:"1em",
    fontWeight:"bold",
    marginBottom:"0.3em"
  },
  profileAvatars:{
    borderRadius: "50%",
  },
  profileAvatarsGrid:{
    height:"50px",

  },
  deleteIcon:{
    color: theme.palette.common.weakBlack,
    backgroundColor: theme.palette.common.textWhite,
    borderRadius:"0.3em",
    fontSize:"0.9em",
    padding:"2px"
  },
  editIcon:{
    color: theme.palette.common.weakBlack,
    backgroundColor: theme.palette.common.textWhite,
    borderRadius:"0.3em",
    fontSize:"0.9em",
    padding:"2px"
  },
  iconsGrid:{
    display:"flex",
    flexDirection:"column",
  },
  btnRoot:{
    padding:"3px",    

  },
  profileName:{
    fontWeight:"bold",
    fontSize:"1.2em"
  },
  dialogPaper:{
    borderRadius:"2em",
    backgroundColor: theme.palette.common.backgroundDark,
  }
}))

const ProfileList = () => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)
  const profiles=[1,1,1,1,1]

  // Dom Handlers
  const modalClose = () => {
    setModalOpen(false)
  }
  const handleDelete=() => {
  }
  const handleEdit = () => {
    setModalOpen(true)
  }
  return (
    <Grid 
      item container
      className={classes.main}
      direction="row">

      {/* Headline */}
      <Grid item container>
        <Typography className={classes.headline}>
          Profiles
        </Typography>
      </Grid>

      {/* Profile Cards */}
      {profiles.map(car => {
        return (
           <Grid 
             item container 
             className={classes.profileItem}
             justify="space-around"
             alignItems="center">
     
             {/* Avatar */}
             <Grid item className={classes.profileAvatarsGrid}>
               <Image
               className={classes.profileAvatars}
               src="/images/avatarExample1.jpg"
               alt="profile picture"
               width={50}
               height={50}
               />
             </Grid>
     
             {/** Profile Name **/}
             <Grid item  >
               <Typography className={classes.profileName}>Brad</Typography>
             </Grid>
     
             {/** Icons  **/}
             <Grid item className={classes.iconsGrid}  >
               <IconButton 
                  classes={{root: classes.btnRoot}}
                  onClick={handleDelete}>
                  <DeleteOutlineIcon className={classes.deleteIcon}/>
               </IconButton>
     
               <IconButton 
                  classes={{root: classes.btnRoot}}
                  onClick={handleEdit}>
                  <EditIcon className={classes.editIcon}/>
               </IconButton>
             </Grid>
     
           </Grid>
        )
      })}

      {/* Modals */}
      <Dialog 
        open={modalOpen}
        onClose={modalClose}
        classes={{paper: classes.dialogPaper}}>
        <ProfileChangeModal />

      </Dialog>
        
      
    </Grid>
  )
}

export default ProfileList
