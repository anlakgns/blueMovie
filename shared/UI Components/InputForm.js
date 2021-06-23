import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  input: {
    width: "100%",
    borderRadius: "1em",
    backgroundColor: theme.palette.common.weakBlack,
    outline: "none",
    border: "none",
    padding: "0.2em",
    paddingLeft: "1em",
    paddingRight: "1em",
    margin: "0.5em 0em",
    height: "30px",
    color: theme.palette.common.textWhite,
    fontWeight: "bold",
    "&::placeholder": {
      color: theme.palette.common.textWhite,
      fontWeight: "bold",
      opacity: 0.7,
    },
  },
  errorFeedback: {
    color: theme.palette.common.error,
    fontSize: "0.8em",
    marginLeft:"1em"
  },
}))

const InputForm = ({type, name, placeholder, formik}) => {
  const classes = useStyles()
  
  return (
    <>
      <input
        className={classes.input}
        type={type}
        name={name}
        autoComplete="off"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        placeholder={placeholder}
      />

      {/* Validation Feedback */}        
      {formik.touched[name] && formik.errors[name] ? (
        <Typography className={classes.errorFeedback}>
          {formik.errors[name]}
        </Typography>
      ) : null}
    </>  
  )
}

export default InputForm
