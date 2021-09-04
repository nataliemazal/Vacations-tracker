import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Login from "../Login/Login";
import "./Home.css"

export default function Home(): JSX.Element {
    return (
        <div className="home-container">
            <Header />
            <Login />
            <div>
                <Link to="/register">
                    <button>
                        click here for register
                    </button>
                </Link>
            </div>
        </div>
    )
}