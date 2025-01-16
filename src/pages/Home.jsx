import { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import LayoutDefault from "../components/Layouts/LayoutDefault";
import { getHomePageBanners } from "../services/bannerService";
import CategoryCard from "../components/Categories/CategoryCard";
import { getNameImageIdQueryCategory } from "../services/categoryService";
import ProductList from "../components/Products/ProductList";
import { getProductCardInfoProducts } from "../services/productService";

const Home = () => {
    const [banners, setBanners] = useState([]); // Trạng thái lưu danh sách banner
    const [categories, setCategories] = useState([]); // Trạng thái lưu danh sách categories
    const [products, setProducts] = useState([]); // Trạng thái lưu danh sách products

    const [loadingBanners, setLoadingBanners] = useState(true); // Trạng thái tải banner
    const [loadingCategories, setLoadingCategories] = useState(true); // Trạng thái tải categories
    const [loadingProducts, setLoadingProducts] = useState(true); // Trạng thái tải products

    // Gọi API lấy danh sách banner
    useEffect(
        () => {
            const fetchBanners = async () => {
                try {
                    setLoadingBanners(true) // Bắt đầu tải
                    const response = await getHomePageBanners();
                    setBanners(response.banners); // Lưu dữ liệu vào state
                } catch (error) {
                    console.error("Error fetching banners: ", error);
                } finally {
                    setLoadingBanners(false) // Kết thúc tải
                }
            }
            fetchBanners();
        },
        []
    );

    // Gọi API lấy danh sách category
    useEffect(
        () => {
            const fetchCategories = async () => {
                try {
                    setLoadingCategories(true); // Bắt đầu tải
                    const response = await getNameImageIdQueryCategory();
                    setCategories(response.categories); // Lưu dữ liệu categories vào state
                } catch (error) {
                    console.error("Error fetching categories: ", error);
                } finally {
                    setLoadingCategories(false); // Kết thúc tải
                }
            } 
            fetchCategories();
        },
        []
    );

    // Gọi API lấy danh sách products
    useEffect(
        () => {
            const fetchProducts = async () => {
                try {
                    setLoadingProducts(true) // Bắt đầu tải
                    const response = await getProductCardInfoProducts();
                    setProducts(response.products);  // Lưu dữ liệu categories vào state
                } catch (error) {
                    console.error("Error fetching products: ", error);
                } finally {
                    setLoadingProducts(false);
                }
            }
            fetchProducts();
        },
        []
    );

    return (
        <LayoutDefault>
            {/* Banner */}
            <div className="mb-4 border">
                {loadingBanners ? (
                    <div>Loading banners...</div> // Hiển thị khi đang tải
                ) : (
                    <Banner banners={banners} />
                )}
            </div>

            {/* Categories */}
            <div className="mb-4 border">
                <h4>Danh mục sản phẩm</h4>
                <div className="d-flex overflow-x-auto overflow-y-hidden">
                    {loadingCategories ? (
                        <div className="text-center">Loading categories...</div> // Hiển thị khi đang tải categories
                    ) : (
                        categories.map((category) => (
                            <CategoryCard
                                key={category.id_query}
                                categoryData={category}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Gợi ý hôm nay */}
            <div className="border">
                <h4>Gợi ý hôm nay</h4>
                {loadingProducts ? (
                    <div>Loading products...</div>
                ) : (
                    <ProductList products={products}/>
                )}
            </div>
        </LayoutDefault>
    )
}

export default Home;