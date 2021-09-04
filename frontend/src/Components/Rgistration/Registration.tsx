

import axios from "axios";
import store from "../Redux/Store";
import { useForm } from "react-hook-form";
import UserModel from "../Models/UserModel";
import { createUserRegisteredAction } from "../Redux/AuthState";
import { useHistory } from "react-router";
import "./Registration.css"
import { Link } from "react-router-dom";
function Register(): JSX.Element {
    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm<UserModel>();

    const onSubmit = async (user: UserModel) => {

        try {
            const response = await axios.post<UserModel>(`http://localhost:3001/api/auth/register`, user);
            if (response.data === null) {
                alert("please choose another user name")
                return
            }
            store.dispatch(createUserRegisteredAction(response.data));
            history.push("/userVacations");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            <Link to="/">
                <a>Back to Home &rarr;</a>
            </Link>
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input id="first_name" type="text" {...register("first_name",
                        { required: true }
                    )} />
                    {errors.first_name?.type === "required" && (
                        <span className="error">First Name is required</span>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="last_name" type="text" {...register("last_name",
                        { required: true }
                    )} />
                    {errors.last_name?.type === "required" && (
                        <span className="error">Last Name is required</span>
                    )}
                </div>

                <div>
                    <label htmlFor="username">Username</label>
                    <input id="user_name" type="text" {...register("user_name",
                        { required: true }
                    )} />
                    {errors.user_name?.type === "required" && (
                        <span className="error">User Name is required</span>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: { value: true, message: "Password is required" },
                            minLength: 8,
                        })}
                    />
                    {errors.password?.type === "minLength" && (
                        <span className="error">Password must have more than 7 charcters.</span>
                    )}
                    {errors.password?.type === "required" && (
                        <span className="error">Password is required</span>
                    )}
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
