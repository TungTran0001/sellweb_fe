import { HeaderTop } from "../components/Header";
import Footer from "../components/Footer";

const Order = () => {
    return (
        <div>
            <div className="shadow-lg">
                <div className="bg-primary">
                    <div className="container">
                        <HeaderTop />
                    </div>
                </div>
                <div className="p-3">
                    <div className="container d-flex justify-content-between">
                        <div>
                            <h2 className="text-primary">Giỏ hàng</h2>
                        </div>
                        <div className="w-50 d-flex rounded-1 overflow-hidden">
                            <input className="w-100 border-primary" type="text" />
                            <button className="bg-primary text-light border-0 px-3">Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4">
                <div className="container d-flex border bg-light">
                    <div className="w-50 d-flex align-items-center text-start">
                        <input type="checkbox" />
                        <span className="ms-3">Sản phẩm</span>
                    </div>
                    <div className="w-50 d-flex align-items-center">
                        <p className="w-25">Đơn giá</p>
                        <p className="w-25">Số lượng</p>
                        <p className="w-25">Số tiền</p>
                        <p className="w-25">Thao tác</p>
                    </div>
                </div>
                <div className="container d-flex border bg-light py-4 mt-4">
                    <div className="w-50 d-flex align-items-center text-start">
                        <input type="checkbox" />
                        <img className="w-25 ps-3" src="/slider2.jpg" alt="" />
                    </div>
                    <div className="w-50 d-flex align-items-center">
                        <p className="w-25">68.000đ</p>
                        <div className="w-25">
                            <div className="border">
                                <button className="h-100 border-0 border-end px-3">-</button>
                                <input className="h-100 border-0" type="number" style={{width: '4rem'}}/>
                                <button className="h-100 border-0 border-start px-3">+</button>
                            </div>
                        </div>
                        <p className="w-25">68.000đ</p>
                        <p className="w-25">Xóa</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Order;