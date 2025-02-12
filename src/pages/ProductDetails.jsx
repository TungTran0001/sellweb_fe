import { FaStar } from "react-icons/fa";
import LayoutDefault from "../components/Layouts/LayoutDefault";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductDetails } from "../services/productService";
const ProductDetails = () => {

    const { idQuery } = useParams();
    const [productDetailsInfo, setProductDetailsInfo] = useState(null); // Bắt đầu với null
    const [loadingProductDetails, setLoadingProductDetails] = useState(true);
    const [galleryUrls, setGalleryUrls] = useState([]); // Tránh lỗi khi gallery chưa load xong
    // Select size, color
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedColorImage, setSelectedColorImage] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1); // Số lượng mặc định là 1

    const handleSelectColor = (color) => {
        setSelectedColor(color.color_name);
        setSelectedColorImage(`http://localhost:3001${color.image_url}`); // Lưu ảnh của màu sắc đó
    }

    const handleIncreaseQuantity = () => {
        setSelectedQuantity((prev) => prev + 1);
    };

    const handleDecreaseQuantity = () => {
        setSelectedQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    };

    useEffect(
        () => {
            const fetchProductDetails = async () => {
                try {
                    setLoadingProductDetails(true);
                    const response = await getProductDetails(idQuery);
                    setProductDetailsInfo(response.productDetails);
                    // Kiểm tra và parse gallery khi có dữ liệu
                    if (response.productDetails?.product?.gallery) {
                        setGalleryUrls(JSON.parse(response.productDetails.product.gallery));
                    }
                } catch (error) {
                    console.error("Error fetching product details at productDetails page", error);
                } finally {
                    setLoadingProductDetails(false);
                }
            }
            fetchProductDetails();
        },
        [idQuery]
    );

    return (
        <LayoutDefault>
            <div className="container border" style={{paddingTop: "130px"}}>
                {loadingProductDetails ? (
                    <div>Loading productDetails ...</div>
                ) : (
                    <div className="row d-flex">
                        {/* Hình ảnh sản phẩm */}
                        <div className="col flex-shrink-0">
                            <img className="w-100" src={selectedColorImage || `http://localhost:3001${productDetailsInfo.product.image_url}`} alt="img" />
                            <div className="row mt-3">
                                {galleryUrls.length > 0 ? (
                                    galleryUrls.map((url, index) => (
                                        <div key={index} className="col border">
                                            <img className="w-100" src={`http://localhost:3001${url}`} alt="gallery" />
                                        </div>
                                    ))
                                ) : (
                                    <div>Loading gallery...</div> // Hiển thị loading nếu gallery chưa sẵn sàng
                                )}
                            </div>
                        </div>
                        {/* Thông tin sản phẩm */}
                        <div className="col flex-shrink-0">
                            <h5>{productDetailsInfo.product.name}</h5>
                            <div className="row">
                                <div className="row col-8">
                                    <div className="col">
                                        <span>{productDetailsInfo.product.rating}</span>
                                        <span className="ms-2">
                                            {[...Array(5)].map((_, index) => (
                                                <FaStar
                                                    key={index}
                                                    className={index < Math.round(productDetailsInfo.product.rating) ? "text-warning" : "text-secondary"}
                                                />
                                            ))}
                                        </span>
                                    </div>
                                    <div className="col">
                                        <span>{productDetailsInfo.product.reviews_count}</span>
                                        <span className="ms-2">Đánh giá</span>
                                    </div>
                                    <div className="col">
                                        <span>{productDetailsInfo.product.number_sold}</span>
                                        <span className="ms-2">Đã bán</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-start p-4">
                                <span className="me-4">
                                    <del>{productDetailsInfo.product.price}đ</del>
                                </span>
                                <span className="text-primary fs-4 me-4">{productDetailsInfo.product.discount_price}đ</span>
                                <span className="bg-primary text-light">{Math.round(
                                    (productDetailsInfo.product.price-productDetailsInfo.product.discount_price)/productDetailsInfo.product.price * 100
                                )}% giảm</span>
                            </div>

                            <div className="row p-4 text-start">
                                <span className="col-3">Vận chuyển</span>
                                <span className="col-9">
                                    {productDetailsInfo?.addresses?.length > 0 ? (
                                        <select className="form-select">
                                            {productDetailsInfo.addresses.map((address, index) => (
                                                <option key={index} value={address}>{`${address.specific_address}, ${address.ward}, ${address.district}, ${address.province}`}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <span>Không có thông tin</span>
                                    )}
                                </span>
                            </div>
                            <div className="row p-4 text-start">
                                <span className="col-3">Màu sắc</span>
                                <span className="d-flex gap-2 col-9">
                                    {productDetailsInfo.colors.map((color, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => handleSelectColor(color)}
                                            className={`btn ${selectedColor === color.color_name ? "btn-primary text-white" : "btn-outline-primary"}`}
                                        >{color.color_name}</button>
                                    ))}
                                </span>
                            </div>
                            <div className="row p-4 text-start">
                                <span className="col-3">Size</span>
                                <span className="col-9 d-flex gap-2">
                                    {productDetailsInfo.sizes.map((size, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => setSelectedSize(size.size_name)}
                                            className={`btn ${selectedSize === size.size_name ? "btn-success text-white" : "btn-outline-success"}`}
                                        >
                                            {size.size_name}
                                        </button>
                                    ))}
                                </span>
                            </div>
                            <div className="row p-4 text-start">
                                <span className="col-3">Số lượng</span>
                                <div className="col-9 d-flex gap-2">
                                    <div className="d-flex align-items-center p-2 rounded">
                                        <button 
                                            className="btn btn-outline-secondary"
                                            onClick={handleDecreaseQuantity}
                                            disabled={selectedQuantity <= 1}
                                        >-</button>
                                        <input 
                                            type="number"
                                            className="form-control text-center"
                                            value={selectedQuantity}
                                            min="1"
                                            max={productDetailsInfo.product.stock}
                                            onChange={(e) => setSelectedQuantity(Math.max(1, Number(e.target.value)))}
                                            style={{width: "60px"}}
                                        />
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={handleIncreaseQuantity}
                                            disabled={selectedQuantity >= productDetailsInfo.product.stock}
                                        >+</button>
                                    </div>
                                    <p>{productDetailsInfo.product.stock} sản phẩm có sẵn</p>
                                </div>
                            </div>
                            <div className="p-4 text-start">
                                <button className="me-3 p-2 rounded-1 text-primary border-primary">Thêm vào giỏ hàng</button>
                                <button className="p-2 rounded-1 bg-primary border-0 text-white">Mua Ngay</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </LayoutDefault>
    )
}

export default ProductDetails;