import { Component } from "react";
import VacationModel from "../../Models/VacationModel";
import axios from "axios"
import VacationCard from "../../VacationCard/VacationCard";
import css from "./UserVacations.module.css"
import UserModel from "../../Models/UserModel";
import store from "../../Redux/Store"
import SocketService from "../../Service/SocketService";
import { createUserLoggedOutAction } from "../../Redux/AuthState";
import Header from "../../Header/Header";
import { Link } from "react-router-dom";

interface VacationsListState {
    userVacations: VacationModel[] | null,
    user: UserModel
    logedIn: boolean
}
export default class UserVacations extends Component<{}, VacationsListState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            userVacations: [],
            user: store.getState().authState.user,
            logedIn: true
        }
    }
    private socketService: SocketService = new SocketService();


    public async componentDidMount() {
        //  Connect to the WebSocket
        this.socketService.connect();
        this.socketService.socket.on("msg-from-server", async () => {
            // when you have "msg-from-server" event request data with token for checking the token still valid
            try {
                const isUserLoggedIn = () => localStorage.getItem("user") !== null
                const user = JSON.parse(localStorage.getItem("user"));
                const headers = isUserLoggedIn()
                    ? { authorization: "Bearer " + user.token }
                    : "";

                const response = await axios.get<VacationModel[]>(
                    `http://localhost:3001/api/uservacations/${this.state.user.uuid}`, { headers: headers }
                )
                const userVacationsList = response.data
                this.setState({
                    userVacations: userVacationsList,
                })
            }
            catch (err) {
                console.log(err);
                alert("Error while geting vacations list");
            }
        });

        if (this.state.user) {
            try {
                const isUserLoggedIn = () => localStorage.getItem("user") !== null
                const user = JSON.parse(localStorage.getItem("user"));
                const headers = isUserLoggedIn()
                    ? { authorization: "Bearer " + user.token }
                    : "";

                const response = await axios.get<VacationModel[]>(
                    `http://localhost:3001/api/uservacations/${this.state.user.uuid}`, { headers: headers }
                )
                const userVacationsList = response.data
                this.setState({
                    userVacations: userVacationsList,
                })
            }
            catch (err) {
                if (err.response.status === 403) {
                    store.dispatch(createUserLoggedOutAction())
                    this.setState({
                        logedIn: false
                    })
                    alert("Your login session has expired. Please Login again")
                }
                alert("Error while geting vacations list");
            }
        }
    }

    componentWillUnmount() {
        this.socketService.disconnect()
    }

    render(): JSX.Element {
        return (
            <div>
                <Header />
                <div className={css.userVacations}>
                    {this.state.logedIn === false &&
                        <Link to="/">
                            <a>Back to Home &rarr;</a>
                        </Link>}
                    {this.state.userVacations.map((vacation) => (
                        <VacationCard
                            key={vacation.vacation_id}
                            vacation_id={vacation.vacation_id}
                            description={vacation.description}
                            destination={vacation.destination}
                            start_date={vacation.start_date}
                            end_date={vacation.end_date}
                            price={vacation.price}
                            image={vacation.image}
                            uuid={this.state.user.uuid}
                            isUserFollow={vacation.isUserFollow === null ? false : true}
                            isAdmin={store.getState().authState.isAdmin}
                            followers={vacation.followers}
                        />
                    ))}
                </div>
            </div >
        )
    }
}

