import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    return (
        <Link to="/#" className="link-underline-light">
            <div className="card" style={{width: "14rem"}}>
                <img className="card-img-top" src={product.thumbnail} alt={product.title} />
                <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <div className="d-flex justify-content-between">
                        <p>
                            <span>đ</span>
                            79.000
                        </p>
                        <p>Đã bán 1,6k</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;