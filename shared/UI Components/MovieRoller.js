import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/styles";
import Image from "next/image";
import { Typography, IconButton, Grid } from "@material-ui/core";
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
    right: 0,
    zIndex: "1000",
    height: "140px",
    marginRight:"0.5em"
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

const MovieRoller = ({
  headline,
  movies = [1,1,1,1,1,1,1,1,1,1,1,1,1]
}) => {
  const classes = useStyles();
  const scrollContainer = useRef();


  // Handlers
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
    <>
      <Typography className={classes.listHeadline}>
        {headline}
      </Typography>
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
        

        {movies.map((ar, i) => {
          return (
            <Grid item className={classes.imageGrid} key={i}>
              <Image
                className={classes.image}
                src="/images/errr.png"
                alt="profile picture"
                layout="fixed"
                width={200}
                height={120}
              />
            </Grid>
          );
        })}
        <IconButton className={classes.iconBtnLeft} onClick={scrollLeft}>
          <ArrowForwardIosIcon className={classes.iconLeft} />
        </IconButton>
       
      </Grid>
    </>
  )

  
};

export default MovieRoller;
