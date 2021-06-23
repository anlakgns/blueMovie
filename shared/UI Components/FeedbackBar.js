import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const FeedbackBar = ({open, message, alertType="success"}) => {  
  return (
    <Snackbar
    open={open}
    autoHideDuration={1500}
    anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
    <Alert severity={alertType}>{message}</Alert>
  </Snackbar>  
  )
}

export default FeedbackBar
