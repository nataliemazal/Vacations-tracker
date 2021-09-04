
import "./Header.css"
import store from "../Redux/Store"
import { createUserLoggedOutAction } from "../Redux/AuthState"
import { Link, useHistory } from "react-router-dom"
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"

export default function Header(): JSX.Element {
    const history = useHistory()
    const hendleLogout = () => {
        store.dispatch(createUserLoggedOutAction())
        history.push("/")
    }

    const user_name = store.getState().authState.isLoggedIn === true ?
        store.getState().authState.user.user_name : "freind"

    const isAdmin = store.getState().authState.isAdmin
    const isUserLoggedIn = () => store.getState().authState.user !== undefined

    return (
        <div className="header">
            <AppBar position="static" >
                <Toolbar className="toolBar">
                    {isAdmin === 1 ?
                        <>
                            <Link to={`/addVacation`} >
                                <Button color="inherit">Add Vacation</Button>
                            </Link>

                            <Link to="/report">
                                <Button color="inherit">Reports</Button>
                            </Link>
                        </>
                        : null
                    }

                    <Typography variant="h6" >
                        Hello {user_name}
                    </Typography>
                    {isUserLoggedIn() ?
                        <Button color="inherit" onClick={hendleLogout}>Logout</Button>
                        : null}

                </Toolbar>
            </AppBar>

        </div>
    )
}