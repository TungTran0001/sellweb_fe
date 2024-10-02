import { Link } from "react-router-dom";

const CategoryCard = () => {
    return (
        <Link to="/">
            <div className="card" style={{width: "10rem", flexShrink: 0,}}>
                <img src="/slider1.jpg" alt="img" className="card-img-top" />
                <div className="card-body">
                    <p className="card-text">Thời trang nam</p>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard;