
import VacationModel from "../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import axios from "axios"
import css from "./EditVacation.module.css";
import store from "../Redux/Store"
import SocketService from "../Service/SocketService";
import Header from "../Header/Header";


export default function AddVacation(): JSX.Element {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<VacationModel>();
    const history = useHistory();

    const socketService: SocketService = new SocketService();

    async function handleAddVacation(vacation: VacationModel) {
        try {
            //send header authorization to server if user is loggedIn and user is admin:
            const isUserLoggedIn = () => localStorage.getItem("user") !== null
            const user = JSON.parse(localStorage.getItem("user"));
            console.log(store.getState().authState.user.isAdmin)
            const headers = isUserLoggedIn() && user.isAdmin === 1
                ? { authorization: "Bearer " + user.token }
                : "";

            await axios.post<VacationModel>(
                `http://localhost:3001/api/admin/vacations/`,
                VacationModel.convertToFormData(vacation),
                { headers: headers }
            );
            alert("Vacation added successfully.");
            reset();
            history.push("/adminVacations");
            socketService.connect();
            socketService.send(vacation);
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
        <div> <Header />
            <div className="edit-vacation-container">
                <h1>Add Vacation</h1>
                <form className={css.editVacationForm} onSubmit={handleSubmit(handleAddVacation)}>
                    <div>
                        <label htmlFor="destination">destination:</label>
                        <input
                            id="destination"
                            {...register("destination", {
                                required: true,
                            })}
                        />
                        {errors.destination?.type === "required" && (
                            <span className={css.error}>destination is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description">description:</label>
                        <input
                            id="description"

                            {...register("description", {
                                required: true,
                            })}
                        />
                        {errors.description?.type === "required" && (
                            <span className={css.error}>description is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="start_date">Start Date:</label>
                        <input
                            type="date"
                            id="start_date"
                            {...register("start_date", {
                                required: true,
                            })}
                            //cant choose before today:
                            min={getToday()}
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
                            {...register("end_date", {
                                required: true,
                            })}
                        />
                        {errors.end_date?.type === "required" && (
                            <span className={css.error}>End Date is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            id="price"
                            type="number"
                            {...register("price", { required: true, valueAsNumber: true })}
                        />
                        {errors.price?.type === "required" && (
                            <span className={css.error}>Price is required.</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="image_file">Image:</label>
                        <input
                            id="image_file"
                            type="file"
                            name="image_file"
                            {...register("image_file", { required: true })}
                        />
                        {errors.image_file?.type === "required" && (
                            <span className={css.error}>Image is required.</span>
                        )}
                    </div>
                    <div>
                        <input type="submit" value="Add" />
                    </div>
                </form>
            </div>
        </div>
    );
};
