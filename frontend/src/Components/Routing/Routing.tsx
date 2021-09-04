import { Route, Switch } from "react-router-dom";
import AddVacation from "../AdminPage/AddVacation";
import AdminVacations from "../AdminPage/Admin-Vacations/Admin-Vacations";
import EditVacation from "../AdminPage/EditVacation";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Rgistration/Registration";
import store from "../Redux/Store"
import Page404 from "../Page404/Page404";
import Chart from "../AdminPage/Admin-Report/Chart";
import UserVacations from "../UserPage/UserVacations/UserVacations";

export default function Routing() {
    const isUserLoggedIn = () => store.getState().authState.user !== undefined
  
    const isAdmin = () =>
   
        isUserLoggedIn() ?
            store.getState().authState.user.isAdmin === 1 : undefined



    return (
        <Switch>
            <Route path="/" component={isUserLoggedIn() ? UserVacations : Home} exact />
            <Route path="/" component={isAdmin() ? AdminVacations : Home} exact />
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/userVacations" component={UserVacations} exact />
            <Route path="/adminVacations" component={ AdminVacations } exact />
            <Route path="/editVacation/:id" component={ EditVacation } exact />
            <Route path="/report" component={ Chart} exact />
            <Route path="/addVacation" component={ AddVacation } exact />
            <Route component={Page404} />
        </Switch>
    );
}