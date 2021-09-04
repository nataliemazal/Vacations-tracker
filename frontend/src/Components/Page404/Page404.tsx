
import { Link } from "react-router-dom";

export default function Page404() {
    return (
        <div>
            Page not found
            <Link to={`/`} >
                <button>back to home page</button>
            </Link>
        </div>
    )
}