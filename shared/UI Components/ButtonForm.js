import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  btnChange: {
    color: "white",
    width:"15em",
    marginTop:"2em",
    marginBottom:"2em",
    [theme.breakpoints.down("md")]: {
      width: "12em"
    }
   },
}))

const ButtonForm = ({text, loadingState}) => {
  const classes = useStyles()
  
  return (
    <Button
          color="primary"
          variant="outlined"
          type="submit"
          className={classes.btnChange}
        >
          {loadingState ? (
            <CircularProgress color="secondary" />
          ) : (
            text
          )}
    </Button>    
  )
}

export default ButtonForm
