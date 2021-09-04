import { Component } from "react";
import VacationModel from "../../Models/VacationModel";
import axios from "axios"
import VacationCard from "../../VacationCard/VacationCard";
import store from "../../Redux/Store"
import UserModel from "../../Models/UserModel";
import SocketService from "../../Service/SocketService";
import "./Admin-Vacations.css"
import Header from "../../Header/Header";



interface VacationsListState {
    vacationsList: VacationModel[] | null,
    user: UserModel
    isAdmin: number
}
export default class AdminVacations extends Component<{}, VacationsListState> {
    constructor(props: {}) {
        super(props)
        this.state = {
            vacationsList: [],
            user: store.getState().authState.user,
            isAdmin: store.getState().authState.isAdmin
        }
    }
    private socketService: SocketService = new SocketService();
    public async componentDidMount() {

        this.socketService.connect();
        this.socketService.socket.on("msg-from-server", async () => {
            try {
                const response = await axios.get<VacationModel[]>(
                    `http://localhost:3001/api/admin/vacations`
                )
                const vacations = response.data
                this.setState({
                    vacationsList: vacations,
                })

                this.setState({
                    user: store.getState().authState.user,
                })

            }
            catch (err) {
                console.log(err);
                alert("Error while geting vacations list");
            }
        })


        try {
            const response = await axios.get<VacationModel[]>(
                `http://localhost:3001/api/admin/vacations`
            )
            const vacations = response.data
            this.setState({
                vacationsList: vacations,
            })

            this.setState({
                user: store.getState().authState.user,
            })
        }
        catch (err) {
            console.log(err);
            alert("Error while geting vacations list");
        }
    }

    render(): JSX.Element {
        return (

            <div>
                <Header />
                <div className="adminVacations">
                    {this.state.vacationsList.map((vacation) => (
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
                            isAdmin={store.getState().authState.isAdmin}
                            followers={vacation.followers}
                            isUserFollow={false}
                        />
                    ))}
                </div>
            </div>

        )
    }
}