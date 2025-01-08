import { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import LayoutDefault from "../components/Layouts/LayoutDefault";
import { getHomePageBanners } from "../services/bannerService";
import CategoryCard from "../components/Categories/CategoryCard";
import { getNameImageIdQueryCategory } from "../services/categoryService";

const Home = () => {
    const [banners, setBanners] = useState([]); // Trạng thái lưu danh sách banner
    const [categories, setCategories] = useState([]); // Trạng thái lưu danh sách categories

    const [loadingBanners, setLoadingBanners] = useState(true); // Trạng thái tải banner
    const [loadingCategories, setLoadingCategories] = useState(true); // Trạng thái tải categories

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
                <h4>Danh mục sảm phẩm</h4>
                <div className="d-flex">
                    {loadingCategories ? (
                        <div>Loading categories...</div> // Hiển thị khi đang tải categories
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
                Gợi ý hôm nay 
            </div>
        </LayoutDefault>
    )
}

export default Home;