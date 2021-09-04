
import { RouteComponentProps } from "react-router";
import VacationModel from "../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios"
import css from "./EditVacation.module.css";
import { useEffect, useState } from "react";
import store from "../Redux/Store"
import SocketService from "../Service/SocketService";
import Header from "../Header/Header";


interface RouteParams {
    id: string;
}

interface VacationDetailsProps extends RouteComponentProps<RouteParams> { }

export default function EditVacation(props: VacationDetailsProps): JSX.Element {
    const [vacationState, setVacation] = useState<VacationModel[] | undefined>(undefined)
    const [loding, setLoding] = useState<boolean>(true)
    useEffect(() => {

        let getVacationDetails = async function () {
            if (loding === true) {
                try {
                    console.log(loding)
                    const response = await axios.get<VacationModel[]>(
                        `http://localhost:3001/api/admin/vacationDetails/${props.match.params.id}`
                    )
                    setVacation(response.data)
                    setLoding(false)
                    console.log(loding)
                    console.log(vacationState)
                }
                catch (err) {
                    console.log(err);
                    alert("Error while geting vacation details");
                }
            }
        }
        getVacationDetails()
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VacationModel>();
    const history = useHistory();

    const socketService: SocketService = new SocketService();

    async function EditVacation(vacation: VacationModel) {
        try {
            const isUserLoggedIn = () => localStorage.getItem("user") !== null
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(store.getState().authState.user.isAdmin)
            const headers = isUserLoggedIn() && user.isAdmin === 1
                ? { authorization: "Bearer " + user.token }
                : "";
            console.log(headers)
            const response = await axios.put<VacationModel>(
                `http://localhost:3001/api/admin/vacations/${props.match.params.id}`, VacationModel.convertToFormData(vacation), { headers: headers }
            );
            console.log(response.data);
            socketService.connect();
            socketService.send(vacation);
            history.push("/adminVacations");

        } catch (error) {
            console.error(error);
        }
    }

    function getToday() {
        var today = new Date();
        var day = today.getDate();
        var month = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (day < 10) {
            var dd = '0' + day;
        }
        if (month < 10) {
            var mm = '0' + month;
        }
        return `${yyyy}-${mm}-${dd}`
    }

    return (
        <div>
            <Header />
            <div className="edit-vacation-container">
                <h1>Edit Vacation</h1>
                {!loding &&
                    <form className={css.editVacationForm} onSubmit={handleSubmit(EditVacation)}>
                        <div>
                            <label htmlFor="destination">destination:</label>
                            <input
                                id="destination"
                                {...register("destination")}
                                defaultValue={vacationState[0].destination}
                            />
                        </div>
                        <div>
                            <label htmlFor="description">description:</label>
                            <input
                                id="description"
                                {...register("description", {
                                    maxLength: 500
                                })}
                                defaultValue={vacationState[0].description}
                            />
                            {errors.description?.type === "maxLength" && (
                                <span className={css.error}>Max Length is 500 characters .</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input
                                id="price"
                                type="number"
                                {...register("price", { valueAsNumber: true })}
                                defaultValue={vacationState[0].price}
                            />
                        </div>
                        <div>
                            <label htmlFor="start_date">Start Date:</label>

                            <input
                                type="date"
                                id="start_date"
                                {...register("start_date")}
                                defaultValue={vacationState[0].start_date}
                                //cant choose before the original start date:
                                min={vacationState[0].start_date}
                            />
                            {errors.start_date?.type === "required" && (
                                <span className={css.error}>Start Date is required.</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="end_date">End Date:</label>
                            <input
                                type="date"
                                id="end_date"
                                {...register("end_date")}
                                defaultValue={vacationState[0].end_date}
                                //cant choose before today:
                                min={getToday()}
                            />
                            {errors.end_date?.type === "required" && (
                                <span className={css.error}>End Date is required.</span>
                            )}
                        </div>
                        <div>
                            <label htmlFor="image_file">Image:</label>
                            <input
                                id="image_file"
                                type="file"
                                name="image_file"
                                {...register("image_file")}
                            />
                        </div>
                        <div>
                            <input type="submit" value="Edit" />
                        </div>
                        <div>
                            <input type="reset" value="Reset" />
                        </div>

                    </form>
                }
            </div>
        </div>
    );
};
