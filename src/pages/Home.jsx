import { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import LayoutDefault from "../components/Layouts/LayoutDefault";
import { getHomePageBanners } from "../services/bannerService";

const Home = () => {
    const [banners, setBanners] = useState([]); // Trạng thái lưu danh sách banner
    const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu

    // Gọi API lấy danh sách banner
    useEffect(
        () => {
            const fetchBanners = async () => {
                try {
                    setLoading(true) // Bắt đầu tải
                    const response = await getHomePageBanners();
                    setBanners(response.banners); // Lưu dữ liệu vào state
                } catch (error) {
                    console.error("Error fetching banners: ", error);
                } finally {
                    setLoading(false) // Kết thúc tải
                }
            }
            fetchBanners();
        },
        []
    );

    return (
        <LayoutDefault>
            {/* Banner */}
            <div className="mb-4 border">
                {loading ? (
                    <div>Loading....</div> // Hiển thị khi đang tải
                ) : (
                    <Banner banners={banners} />
                )}
            </div>

            {/* Categories */}
            <div className="mb-4 border">
                Categories
            </div>

            {/* Gợi ý hôm nay */}
            <div className="border">
                Gợi ý hôm nay 
            </div>
        </LayoutDefault>
    )
}

export default Home;