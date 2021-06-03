import { useState } from "react";

import Image from "next/image";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, fade } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  main: {
    paddingLeft: "3em",
    paddingRight: "3em",
    backgroundColor: theme.palette.common.backgroundDark,
    height: "10vh",
    [theme.breakpoints.down("xs")]: {
      padding: "1em 2em",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: "2px solid ",
    borderColor: "#848484",
    backgroundColor: "transparent",
    "&:hover": {
      borderColor: fade("#ffffff", 0.8),
    },
    marginRight: theme.spacing(2),
    marginLeft: "1em",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.textWhite,
  },
  searchIconGrid: {
    height: "40px",
    width: "40px",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "5px",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    color: theme.palette.common.textWhite,
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create("width"),
    width: "80%",
    [theme.breakpoints.up("lg")]: {
      width: "20ch",
    },
    [theme.breakpoints.down("md")]: {
      width: "15ch",
    },
    "@media (max-width:760px)": {
      width: "25ch",
    },
    "@media (max-width:600px)": {
      width: "10ch",
    },
  },
  btn: {
    color: theme.palette.common.textWhite,
  },
  btnRoot: {
    textTransform: "none",
    minWidth: 0,
  },
  btnHamburger: {
    minWidth: 0,
  },
  avatar: {
    borderRadius: "50%",
  },
  menuPaper: {
    width: "200px",
    backgroundColor: theme.palette.common.backgroundDark,
    marginTop: "60px",
    transform: "translateX(8%)",
    borderBottomLeftRadius: "1em",
    borderTopRightRadius: 0,
  },
  menuItemRoot: {
    display: "flex",
    justifyContent: "flex-start",
    marginLeft: "0.5em",
    fontWeight: "bold",
    color: theme.palette.common.textWhite,
    height: "3em",
  },
  menuItemProfileRoot: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    color: theme.palette.common.textWhite,
    height: "4em",
  },
  underline: {
    border: "2px solid #8B8B8B",
    width: "100%",
  },
  profileName: {
    marginLeft: "1em",
    fontWeight: "bold",
  },
}));

const HeaderLogged = () => {
  const classes = useStyles();
  const matches860 = useMediaQuery("(max-width:860px)");
  const matches760 = useMediaQuery("(max-width:760px)");
  const [anchorMenu, setAnchorMenu] = useState(null);
  const open = Boolean(anchorMenu);

  // Dom Handlers
  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  return (
    <>
      <Grid
        item
        container
        justify="space-between"
        alignItems="center"
        className={classes.main}
      >
        {/* Right : Search */}
        <Grid item container xs justify="flex-start" alignItems="center">
          {/** Search Icon **/}
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            className={classes.searchIconGrid}
          >
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
          </Grid>

          {/** Search Box **/}
          <Grid item>
            <div className={classes.search}>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Grid>
        </Grid>

        {/* Middle : Logo */}
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs
          style={{ display: matches760 ? "none" : "inline-flex" }}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={171}
            height={51}
            layout="intrinsic"
          />
        </Grid>

        {/* Left : Links */}
        <Grid
          item
          container
          alignItems="center"
          justify="flex-end"
          xs
          style={{ display: matches860 ? "none" : "inline-flex" }}
        >
          <Grid item>
            <Button className={classes.btn} classes={{ root: classes.btnRoot }}>
              My List
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.btn} classes={{ root: classes.btnRoot }}>
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button className={classes.btn} classes={{ root: classes.btnRoot }}>
              <NotificationsNoneIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button
              className={classes.btn}
              classes={{ root: classes.btnRoot }}
              onClick={handleMenuClick}
            >
              <Image
                src="/images/avatarExample1.jpg"
                alt="avatar"
                width={36}
                height={36}
                layout="intrinsic"
                className={classes.avatar}
              />
            </Button>
          </Grid>
        </Grid>

        {/* Responsive Hamburger Icon */}
        <Grid
          item
          container
          justify="flex-end"
          xs={3}
          style={{ display: matches860 ? "inline-flex" : "none" }}
        >
          <Button
            style={{
              display: matches860 ? "inline-flex" : "none",
              color: "white",
            }}
            classes={{ root: classes.btnHamburger }}
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </Button>
        </Grid>
      </Grid>

      {/* Menu Modal  */}
      <Menu
        id="fade-menu"
        anchorEl={anchorMenu}
        keepMounted
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
        classes={{ paper: classes.menuPaper }}
        className={classes.menu}
      >
        {/* Profile Part - map will be used soon. */}
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemProfileRoot }}
        >
          <Grid item container justify="flex-start" alignItems="center">
            <Grid item>
              <Button
                className={classes.btn}
                classes={{ root: classes.btnRoot }}
                onClick={handleMenuClick}
              >
                <Image
                  src="/images/avatarExample1.jpg"
                  alt="avatar"
                  width={45}
                  height={45}
                  layout="intrinsic"
                  className={classes.avatar}
                />
              </Button>
            </Grid>
            <Grid item>
              <Typography className={classes.profileName}>Jessica</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemProfileRoot }}
        >
          <Grid item container justify="flex-start" alignItems="center">
            <Grid item>
              <Button
                className={classes.btn}
                classes={{ root: classes.btnRoot }}
                onClick={handleMenuClick}
              >
                <Image
                  src="/images/avatarExample1.jpg"
                  alt="avatar"
                  width={45}
                  height={45}
                  layout="intrinsic"
                  className={classes.avatar}
                />
              </Button>
            </Grid>
            <Grid item>
              <Typography className={classes.profileName}>Brad</Typography>
            </Grid>
          </Grid>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemProfileRoot }}
        >
          <Grid item container justify="flex-start" alignItems="center">
            <Grid item>
              <Button
                className={classes.btn}
                classes={{ root: classes.btnRoot }}
                onClick={handleMenuClick}
              >
                <Image
                  src="/images/avatarExample1.jpg"
                  alt="avatar"
                  width={45}
                  height={45}
                  layout="intrinsic"
                  className={classes.avatar}
                />
              </Button>
            </Grid>
            <Grid item>
              <Typography className={classes.profileName}>Maria</Typography>
            </Grid>
          </Grid>
        </MenuItem>

        {/* Link Part */}
        <MenuItem>
          <div className={classes.underline} />
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemRoot }}
          style={{ display: matches860 ? "flex" : "none" }}
        >
          My List
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemRoot }}
          style={{ display: matches860 ? "flex" : "none" }}
        >
          Home
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemRoot }}
          style={{ display: matches860 ? "flex" : "none" }}
        >
          Notifications
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemRoot }}
        >
          Account
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          classes={{ root: classes.menuItemRoot }}
        >
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderLogged;
