

import axios from "axios";
import store from "../Redux/Store";
import { useForm } from "react-hook-form";
import UserModel from "../Models/UserModel";
import { createUserLoggedInAction } from "../Redux/AuthState";
import { useHistory } from "react-router";
import "./Login.css"

function Login(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();
    const onSubmit = async (user: UserModel) => {
        console.log(user)
        try {
            const response = await axios.post<UserModel>(`http://localhost:3001/api/auth/login`, user);

            store.dispatch(createUserLoggedInAction(response.data));
            console.log(response.data.isAdmin+"admin")

            // const isAdmin = store.getState().authState.isAdmin
            const isAdmin = response.data.isAdmin
            isAdmin === 1 ? history.push("/adminVacations") : history.push("/userVacations");
        } catch (err) {
            err.response.status === 401 ?
                alert("Incorrect username or password")
                : console.error(err);
        }
    };

    return (
        <div className="login-container">

            <form onSubmit={handleSubmit(onSubmit)} className="login-container">
                <div>
                    <label htmlFor="firstName">User Name</label>
                    <input id="user_name" type="text" {...register("user_name")} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: true

                        })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="error">Password is required</span>
                    )}

                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;