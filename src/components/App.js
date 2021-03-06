import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom"
// import 'fontsource-roboto';
import AddShiftReport from "./pages/AddShiftReport/AddShiftReport"
import ErrorPage from "./shared/ErrorPage/ErrorPage"
import AdvanceReadingForm from "./pages/ShiftForm/AdvanceReadingForm/AdvanceReadingForm"
import DipstickReadingForm from "./pages/ShiftForm/DipstickReadingForm/DipstickReadingForm"
import DropForm from "./pages/ShiftForm/DropForm/DropForm"
import ExpensesForm from "./pages/ShiftForm/ExpensesForm/ExpensesForm"

import { ThemeProvider } from "@material-ui/core/styles"
import theme from "../theme"
// import ShiftReport from './pages/ShiftForm/MainForm/MainTabNav/ShiftReport'
import ShiftReport from "./pages/AddShiftReport/ShiftReport/ShiftReport"
import DownloadOptions from "./pages/DownloadShiftReport/DownloadOptions"
import { loadUser } from "../actions"
import { connect } from "react-redux"
import Auth from "./pages/Auth/Auth"
import ProtectedRoute from "./ProtectedRoute"
import AppDrawer from "./AppDrawer"
import ErrorSnackBar from "./ErrorSnackBar"
const App = ({ loadUser, auth }) => {
  useEffect(() => {
    loadUser()
  })
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route path="/auth" render={(props) => <Auth {...props} />} />
          {/* <ProtectedRoute path="/app" component={MainApp} /> */}
          <ProtectedRoute path="/app" component={AppDrawer} />
          {/* Fallback route */}
          <ProtectedRoute component={AppDrawer} />
        </Switch>
      </ThemeProvider>
    </Router>
  )
}
export default connect(null, { loadUser })(App)
