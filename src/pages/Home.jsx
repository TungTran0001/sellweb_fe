import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import CategoryCard from "../components/categories/CategoryCard";
import Header from "../components/Header";
import ProductCard from "../components/products/ProductCard";
import Footer from "../components/Footer";

const Home = () => {
    const [products, setProducts] = useState ([]); 
    const [page, setPage] = useState ( 1 );
    const handlePageChange = (pageNumber) => {
        if(pageNumber > 0 && pageNumber <= products.length / 10 && pageNumber !== page) {
            setPage(pageNumber);
        }
    }
    const fetchProducts = async () => {
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        console.log(data);
        if(data.products && data.products.length) setProducts(data.products);
    }

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <div className="container-fruit">
            <div className="fixed-top">
                <Header />
            </div>
            <div className="container" style={{paddingTop: "130px"}}>
                <Carousel />
                <div className="mt-5 shadow-lg">
                    <h4 className="text-start py-2 ps-4 text-secondary">Danh mục</h4>
                    <div className="d-flex overflow-auto">
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                        <CategoryCard />
                    </div>
                </div>
                <div className="mt-5 shadow-lg py-4">
                    <h4>Gợi ý hôm nay</h4>
                    {products.length && (
                        <div className="d-flex flex-wrap gap-2 justify-content-center mt-4">
                            {products.slice(page * 10 - 10, page * 10).map((product) => (
                                <ProductCard product={product} />
                            ))}
                        </div>
                    )}
                    {products.length > 0 && (
                        <ul className="pagination d-flex align-content-center justify-content-center mt-4">
                            <li className="page-item">
                                <span className="page-link" onClick={() => handlePageChange(page - 1)}>Previous</span>
                            </li>
                            {[...Array(Math.floor(products.length / 10))].map((_, i) => (
                                <span className={`page-item page-link ${page === i + 1 ? "active" : ""}`} key={i + 1} onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </span>
                            ))}
                            <li className="page-item">
                                <span className="page-link" onClick={() => handlePageChange(page + 1)}>Previous</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home;