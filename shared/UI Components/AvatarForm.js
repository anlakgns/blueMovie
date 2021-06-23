import Image from "next/image";

import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import { InputLabel } from '@material-ui/core';
import EditIcon from "@material-ui/icons/Edit";
import Input from "@material-ui/core/Input";


const useStyles = makeStyles(theme => ({
  avatar: {
    borderRadius: "50%",
  },
  avatarGrid: {
    borderRadius: "50%",
    height: "150px",
    maxWidth: "150px",
    overflow: "hidden",
    position: "relative",
    "&:hover": {
      "& $editIcon": {
        color: "purple",
        height: "40px",
        paddingTop: "0.4em",
        transition: "height 1s ease",
      },
    },

  },
  editIcon: {
    position: "absolute",
    overflow: "hidden",
    bottom: 0,
    color: theme.palette.common.purple,
    backgroundColor: theme.palette.common.weakBlack,
    width: "100%",
    margin: "auto",
    height: "0px",
    textAlign: "center",
  },
  inputRoot:{
    display:"none"
  },
  inputLabel:{
    cursor:"pointer"
  },
}))

const AvatarComponent = ({src, alt, name,formik, width, height}) => {
  const classes = useStyles()
  
  return (
    <Grid
      item
      container
      justify="center"
      className={classes.avatarGrid}
    >
      <Image
        className={classes.avatar}
        src={src}
        alt={alt}
        width={width || 150}
        height={height || 150}
      />
      <div className={classes.editIcon}>
        <InputLabel htmlFor={name} focused={true} className={classes.inputLabel}>
            <EditIcon />
        </InputLabel>
        <Input
          classes={{
            input: classes.inputRoot,
          }}
          name={name}
          onChange={(event) => {
            formik.setFieldValue(name, event.currentTarget.files[0]);
          }}
          inputProps={{ type: "file", accept: "image/png, image/jpeg", id: name }}           
        />
      </div>
    </Grid>
  )
}

export default AvatarComponent
