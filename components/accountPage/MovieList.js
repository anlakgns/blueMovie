import { useState, useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Image from "next/image";
import { Typography, IconButton } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const useStyles = makeStyles((theme) => ({
  row: {
    flexWrap: "nowrap",
    overflowY: "hidden",
    overflowX: "scroll",
    width: "100%",
    "&::-webkit-scrollbar": {
      overflow: "hidden",
    },
  },
  optionBar: {
    marginTop: "1em",
    marginBottom: "1em",
    backgroundColor: theme.palette.primary.main,
    height: "3.5em",
  },
  btnMylist: {
    color: theme.palette.common.textWhite,
    backgroundColor: "#48cae4",
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
  image: {
    borderRadius: "1em",
  },
  imageGrid: {
    marginBottom: "1em",
  },
  listHeadline: {
    color: theme.palette.common.white,
    marginBottom: "0.5em",
    fontWeight: "bold",
  },
  iconBtnRight: {
    position: "absolute",
    zIndex: "1000",
    height: "140px",
  },
  iconRight: {
    color: theme.palette.common.textWhite,
    fontSize: "1.5",
    "&:hover": {
      fontSize: "1.7em",
    },
    transition: "0.3s ease-in",
    marginLeft: "0.5em",
  },
  iconBtnLeft: {
    position: "absolute",
    zIndex: "1000",
    height: "140px",
    right: 0,
    marginRight: "0.5em",
  },
  iconLeft: {
    color: theme.palette.common.textWhite,
    fontSize: "1.5",
    "&:hover": {
      fontSize: "1.7em",
    },
    transition: "0.3s ease-in",
  },
}));

export const MovieList = () => {
  const classes = useStyles();
  const scrollContainer = useRef();

  const arr = [1, 1, 1, 1, 1, 1, 1];
  const row = [1, 1, 1, 1, 1, 1, 1];

  const scrollRight = () => {
    scrollContainer.current.scrollTo({
      left: scrollContainer.current.scrollLeft - 400,
      behavior: "smooth",
    });
  };

  const scrollLeft = () => {
    scrollContainer.current.scrollTo({
      left: scrollContainer.current.scrollLeft + 400,
      behavior: "smooth",
    });
  };

  return (
    <Grid item container direction="column">
      <Grid item container className={classes.optionBar} alignItems="center">
        <Grid item>
          <Button className={classes.btnMylist}>My Lists</Button>
        </Grid>
        <Grid item>
          <Button className={classes.btnAccount}>Account</Button>
        </Grid>
      </Grid>

      {/* {row.map((a) => {
        return ( */}
      <>
        <Typography className={classes.listHeadline}>Action</Typography>
        <Grid
          item
          container
          direction="row"
          spacing={3}
          className={classes.row}
          ref={scrollContainer}
        >
          <IconButton className={classes.iconBtnRight} onClick={scrollRight}>
            <ArrowBackIosIcon className={classes.iconRight} />
          </IconButton>
          <IconButton className={classes.iconBtnLeft} onClick={scrollLeft}>
            <ArrowForwardIosIcon className={classes.iconLeft} />
          </IconButton>

          {arr.map((ar, i) => {
            return (
              <Grid item className={classes.imageGrid} key={i}>
                <Image
                  className={classes.image}
                  src="/images/red.png"
                  alt="profile picture"
                  layout="fixed"
                  width={200}
                  height={120}
                />
              </Grid>
            );
          })}
        </Grid>
      </>
      {/* );
      })} */}
    </Grid>
  );
};
