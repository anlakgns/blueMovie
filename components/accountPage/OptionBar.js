import Grid from "@material-ui/core/Grid"
import {makeStyles} from "@material-ui/styles"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  optionBar: {
    marginTop: "1em",
    marginBottom: "1em",
    backgroundColor: theme.palette.primary.main,
    height: "3.5em",
  },
  btnMylist: {
    color: theme.palette.common.textWhite,
    backgroundColor: theme.palette.common.purple,
    height: "1.8em",
    marginLeft: "2em",
    fontSize: "0.9em",
  },
  btnAccount: {
    backgroundColor: "#FFFFFF",
    height: "1.8em",
    marginLeft: "2em",
    fontSize: "0.9em",
  },
}))


const OptionBar = ({setSubSection}) => {
  const classes = useStyles()

  const handleMylist = () => {
    setSubSection("myList");
  };

  const handleAccount = () => {
    setSubSection("account");
  };

  return (
    <Grid item container className={classes.optionBar} alignItems="center">
        <Grid item>
          <Button onClick={handleMylist} className={classes.btnMylist}>
            My Lists
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleAccount} className={classes.btnAccount}>
            Account
          </Button>
        </Grid>
      </Grid>
  )
}

export default OptionBar
