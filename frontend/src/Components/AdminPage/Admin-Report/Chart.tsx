import React from 'react';
import { Bar } from 'react-chartjs-2';
import axios from "axios"
import SocketService from "../../Service/SocketService";
import { Link } from "react-router-dom"
import Header from '../../Header/Header';


interface Followers {
    destination: string
    followers: number
}

interface FollowersState {
    followersData: Followers[],
    destinations: {},
    followers: {},
    state: {}
}


export default class Chart extends React.Component<{}, FollowersState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            followersData: [],
            destinations: {},
            followers: {},
            state: {
                labels: ['January', 'February', 'March',
                    'April', 'May'],
                datasets: [
                    {
                        label: 'Followers',
                        backgroundColor: 'rgba(75,192,192,1)',
                        borderColor: 'rgba(0,0,0,1)',
                        borderWidth: 2,
                        data: [65, 59, 80, 81, 56]
                    }
                ]
            }
        }
    }
    private socketService: SocketService = new SocketService();

    public async componentDidMount() {
        //   Connect to the WebSocket
        this.socketService.connect();
        this.socketService.socket.on("msg-from-server", async vacation => {
            console.log(vacation)
            try {
                const isUserLoggedIn = () => localStorage.getItem("user") !== null
                const user = JSON.parse(localStorage.getItem("user"));

                const headers = isUserLoggedIn()
                    ? { authorization: "Bearer " + user.token }
                    : "";

                const response = await axios.get<Followers[]>(
                    `http://localhost:3001/api/admin/followers`, { headers: headers }
                )
                const followers = response.data
                this.setState({
                    followersData: followers,
                })
                const destinationsResult = this.state.followersData.map(a => a.destination);
                const followersResult = this.state.followersData.map(a => a.followers);
                this.setState({
                    state: {
                        labels: destinationsResult,
                        datasets: [
                            {
                                label: 'Followers',
                                backgroundColor: 'rgba(75,192,192,1)',
                                borderColor: 'rgba(0,0,0,1)',
                                borderWidth: 2,
                                data: followersResult
                            }
                        ]
                    }

                })
            }
            catch (err) {
                console.log(err);
                alert("Error while geting vacations list");
            }
        });
        try {
            //send header authorization to server if user is loggedIn and user is admin:
            const isUserLoggedIn = () => localStorage.getItem("user") !== null
            const user = JSON.parse(localStorage.getItem("user"));
            const headers = isUserLoggedIn()
                ? { authorization: "Bearer " + user.token }
                : "";
            const response = await axios.get<Followers[]>(
                `http://localhost:3001/api/admin/followers`, { headers: headers }
            )
            const followers = response.data
            this.setState({
                followersData: followers,
            })
            const destinationsResult = this.state.followersData.map(a => a.destination);
            const followersResult = this.state.followersData.map(a => a.followers);
            this.setState({
                state: {
                    labels: destinationsResult,
                    datasets: [
                        {
                            label: 'Followers',
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: followersResult
                        }
                    ]
                }
            })
        }
        catch (err) {
            alert("Error while geting followers ");
        }
    }

    render() {
        return (
            <div>
                <Header />
                <div>
                    <Link to="/adminVacations">
                        <a>Back to Vacations &rarr;</a>
                    </Link>
                </div>
                <div>
                    <Bar
                        data={this.state.state}
                        options={{
                            title: {
                                display: true,
                                text: 'Followers per vacation',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
            </div>

        );
    }
}