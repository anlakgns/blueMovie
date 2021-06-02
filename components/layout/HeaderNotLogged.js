import {useState} from "react"
import Image from "next/image";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery"
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
  main: {
    padding: "1em 3em",
    backgroundColor: theme.palette.common.backgroundDark,
    height: "90px",
    [theme.breakpoints.down("md")]: {
      height:"80px",
    },
  },
  btn: {
    color: theme.palette.common.textWhite,
    marginLeft: "1em",
  },
  btnRoot: {
    textTransform:"none"
  },
  btnHamburger:{
    padding: 0,
    justifyContent: "flex-end"
  },
  menu: {
  },
  menuPaper: {
    width:"200px",
    backgroundColor: theme.palette.common.backgroundDark,
    marginTop: "60px",
    transform: 'translateX(8%)',
    borderBottomLeftRadius:"1em",
    borderTopRightRadius:0
  },
  menuItemRoot: {
    display: "flex",
    justifyContent:"center",
    fontWeight: "bold",
    color: theme.palette.common.textWhite,
    height:"3em"
  },
  underline: {
    border: "2px solid #8B8B8B",
    width:"100%"
  }
}));

const HeaderNotLogged = () => {
  const classes = useStyles();
  const matches800 = useMediaQuery('(max-width:800px)');
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
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.main}
    >
      {/* Left : Scroll Links */}
      <Grid 
        item container 
        xs={8}>
        <Image 
          src="/images/logo.svg" 
          alt="logo" 
          width={171} 
          height={51} 
          layout="intrinsic"/>
        <Button 
          className={classes.btn}
          classes={{root: classes.btnRoot}}
          style={{display: matches800 ? "none": "inline-flex"}}
          >
            Features
         </Button>

        <Button 
          className={classes.btn}
          classes={{root: classes.btnRoot}}
          style={{display: matches800 ? "none": "inline-flex"}}>
            Pricing
        </Button>

      </Grid>

      {/* Right : Auth Part */}
      <Grid 
        item container 
        xs={4} 
        justify="flex-end" 
        style={{display: matches800 ? "none": "flex"}}>
        <Button 
          className={classes.btn}
          classes={{root: classes.btnRoot}}
          >
            Login
         </Button>
        <Button 
          className={classes.btn} 
          classes={{root: classes.btnRoot}}
          >Sign Up
         </Button>
      </Grid>

      {/* Responsive Hamburger Icon */}
      <Grid 
        item container 
        justify="flex-end" 
        xs={4}
        style={{display: matches800 ? "inline-flex" : "none"}}
      >
        <Button
          style={{color:"white"}}
          classes={{root: classes.btnHamburger}}
          onClick={handleMenuClick}
        >
          <MenuIcon/>
        </Button>
        <Menu
          id="fade-menu"
          anchorEl={anchorMenu}
          keepMounted
          open={open}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          classes={{paper: classes.menuPaper}}
          className={classes.menu}
          style={{display: matches800 ? "block" : "none" }}
        >
          <MenuItem 
            onClick={handleMenuClose}
            classes={{root: classes.menuItemRoot}}>
              Features
           </MenuItem>
          <MenuItem 
            onClick={handleMenuClose}
            classes={{root: classes.menuItemRoot}}>
              Pricing
          </MenuItem>
          <MenuItem>
            <div className={classes.underline} />
          </MenuItem>
          <MenuItem 
            onClick={handleMenuClose}
            classes={{root: classes.menuItemRoot}}>
              Log In
          </MenuItem>
          <MenuItem 
            onClick={handleMenuClose}
            classes={{root: classes.menuItemRoot}}>
              Sign Up
           </MenuItem>
        </Menu>
      </Grid>
      
    </Grid>
  );
};

export default HeaderNotLogged;
