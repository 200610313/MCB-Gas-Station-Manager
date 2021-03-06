import React from "react"
import clsx from "clsx"
import { makeStyles } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"
import AccountCircle from "@material-ui/icons/AccountCircle"
import Drawer from "@material-ui/core/Drawer"
import Box from "@material-ui/core/Box"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import List from "@material-ui/core/List"
import Typography from "@material-ui/core/Typography"
import Divider from "@material-ui/core/Divider"
import IconButton from "@material-ui/core/IconButton"
import Badge from "@material-ui/core/Badge"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Link from "@material-ui/core/Link"
import MenuIcon from "@material-ui/icons/Menu"
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import NotificationsIcon from "@material-ui/icons/Notifications"
import { MainListItems, secondaryListItems } from "./AppDrawerItems"
import { Route, Switch } from "react-router-dom"
import Dashboard from "./Dashboard"
import ShiftReport from "./pages/AddShiftReport/ShiftReport/ShiftReport"
import AddShiftReport from "./pages/AddShiftReport/AddShiftReport"
import DownloadOptions from "./pages/DownloadShiftReport/DownloadOptions"
import { MenuItem, Menu } from "@material-ui/core"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { logOutUser } from "../actions"
import { connect } from "react-redux"
import ErrorSnackBar from "./ErrorSnackBar"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  )
}

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    minHeight: 10,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}))
function AppDrawer({ path, logOutUser }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const openAccount = Boolean(anchorEl)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  function logOut() {
    logOutUser()
  }
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}>
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}>
            Dashboard
          </Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit">
            <AccountCircle />
          </IconButton>
          <IconButton onClick={logOut} color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={openAccount}
            onClose={handleClose}>
            <MenuItem onClick={handleClose}>Profile</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{<MainListItems />}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path={`${path}/dashboard`}>
              <Dashboard />
            </Route>
            <Route
              exact
              path={`${path}/shift-reports/open/:year/:month/:day/:shift/:placement`}
              render={(props) => <ShiftReport {...props} filledUpBy={1} />}
            />
            <Route
              path={`${path}/shift-reports/view/:year/:month`}
              exact
              component={AddShiftReport}
            />
            <Route path={`${path}/shift-reports/download/select/option`}>
              <DownloadOptions />
            </Route>
            {/* Fallback */}
            <Route>
              <Dashboard />
            </Route>
          </Switch>
          <Box pt={4}>
            <ErrorSnackBar />
          </Box>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  )
}
export default connect(null, { logOutUser })(AppDrawer)
