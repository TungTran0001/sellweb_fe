import { useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
    // phân trang
    const ITEMS_PER_PAGE = 25; // Số sản phẩm mỗi trang
    const [currentPage, setCurrentPage] = useState(1);
    // Tính toán danh sách sản phẩm hiển thị
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

    // Tạo danh sách số trang
    const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    return (
        <div className="my-4">
            {/* Danh sách sản phẩm */}
            <div className="d-flex flex-wrap row-gap-3 justify-content-between align-conte mb-3">
                {currentItems.map((product) => (
                    <ProductCard key={product.id_query} product={product} />
                ))}
            </div>
            {/* Phân trang */}
            <nav>
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => prev - 1)}>
                            &laquo;
                        </button>
                    </li>
                    {pageNumbers.map((number) => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? "active" : ""}`}
                        >
                            <button className="page-link" onClick={() => setCurrentPage(number)}>
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage((prev) => prev + 1)}>
                            &raquo;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default ProductList;