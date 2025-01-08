import { Link } from "react-router-dom";


const CategoryCard = ({ categoryData }) => {
    return (
        <Link to={categoryData.id_query} className="link-underline-light">
            <div class="card" style={{width: "10rem", height: "15rem"}}>
                <img src={`http://localhost:3001${categoryData.image_url}`} className="card-img-top h-75" alt="..."/>
                <div class="card-body">
                    <h6>{categoryData.name}</h6>
                </div>
            </div>
        </Link>
    )
}

export default CategoryCard;