import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    // Cắt tên sản phẩm nếu dài hơn 40 ký tự
    const truncateName = product.name.length > 40
        ? product.name.slice(0, 40) + "..."
        : product.name;
    return (
        <Link to={`/product/${product.id_query}`} className="link-underline-light">
            <div className="card" style={{width: "13rem", height: "23rem"}}>
                <img className="card-img-top overflow-hidden" src={`http://localhost:3001${product.image_url}`} alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{truncateName}</h5>
                    <div className="d-flex justify-content-between">
                        <p>
                            <span>đ</span>
                            {product.price}
                        </p>
                        <p>{product.number_sold}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;