import { Link } from "react-router-dom";

const NotificationLink = ({ notification }) => {
    return (
        <Link to={notification.link} className="link-light">
            <li className="dropdown-item">
                <h6>{notification.title}</h6>
                <p>{notification.message}</p>
            </li>
        </Link>
    )
}

export default NotificationLink;