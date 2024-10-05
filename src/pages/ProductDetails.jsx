import Footer from "../components/Footer";
import Header from "../components/Header";
import { FaStar } from "react-icons/fa";
const ProductDetails = () => {
    return (
        <div className="container-fluid overflow-auto">
            <div className="fixed-top">
                <Header />
            </div>
            <div className="container border" style={{paddingTop: "130px"}}>
                <div className="row d-flex">
                    <div className="col flex-shrink-0">
                        <img className="w-100" src="/slider2.jpg" alt="img" />
                        <div className="row mt-3">
                            <div className="col border">
                                <img className="w-100" src="/slider1.jpg" alt="img" />
                            </div>
                            <div className="col border">
                                <img className="w-100" src="/slider1.jpg" alt="img" />
                            </div>
                            <div className="col border">
                                <img className="w-100" src="/slider1.jpg" alt="img" />
                            </div>
                            <div className="col border">
                                <img className="w-100" src="/slider1.jpg" alt="img" />
                            </div>
                            <div className="col border">
                                <img className="w-100" src="/slider1.jpg" alt="img" />
                            </div>
                        </div>
                    </div>
                    <div className="col flex-shrink-0">
                        <h5>Quần Short Kaki Nam VINTINO Form Đùi Cộc Cạp Chun Vải Kaki Gió Mềm Mại QS01</h5>
                        <div className="row">
                            <div className="row col-8">
                                <div className="col">
                                    <span>4.9</span>
                                    <span className="ms-2">
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                        <FaStar className="text-warning" />
                                    </span>
                                </div>
                                <div className="col">
                                    <span>3,6k</span>
                                    <span className="ms-2">Đánh giá</span>
                                </div>
                                <div className="col">
                                    <span>22,2k</span>
                                    <span className="ms-2">Đã bán</span>
                                </div>
                            </div>
                            <div className="col-4 text-end">Tố cáo</div>
                        </div>
                        <div className="text-start p-4">
                            <span className="me-4">
                                <del>140.000đ</del>
                            </span>
                            <span className="text-primary fs-4 me-4">85.000đ</span>
                            <span className="bg-primary text-light">39% giảm</span>
                        </div>
                        <div className="row p-4 text-start">
                            <span className="col-3">Vận chuyển</span>
                            <span className="col-9">Xã Kỳ lợi, thị xã Kỳ Anh, tỉnh Hà Tĩnh</span>
                        </div>
                        <div className="row p-4 text-start">
                            <span className="col-3">Màu sắc</span>
                            <span className="d-flex gap-2 col-9">
                                <button>Xanh</button>
                                <button>Đỏ</button>
                                <button>Tím</button>
                                <button>Vàng</button>
                            </span>
                        </div>
                        <div className="row p-4 text-start">
                            <span className="col-3">Size</span>
                            <span className="col-9 d-flex gap-2">
                                <button>M</button>
                                <button>L</button>
                                <button>XL</button>
                                <button>2XL</button>
                            </span>
                        </div>
                        <div className="row p-4 text-start">
                            <span className="col-3">Số lượng</span>
                            <div className="col-9 d-flex gap-2">
                                <div className="border">
                                    <button className="h-100 border-0 border-end px-3">-</button>
                                    <input className="h-100 border-0" type="number" style={{width: '4rem'}}/>
                                    <button className="h-100 border-0 border-start px-3">+</button>
                                </div>
                                <p>185885 sản phẩm có sẵn</p>
                            </div>
                        </div>
                        <div className="p-4 text-start">
                            <button className="me-3 p-2 rounded-1 text-primary border-primary">Thêm vào giỏ hàng</button>
                            <button className="p-2 rounded-1 bg-primary border-0 text-white">Mua Ngay</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductDetails;