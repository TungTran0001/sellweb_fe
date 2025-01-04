import Carousel from "../components/Carousel/Carousel";
import LayoutDefault from "../components/Layouts/LayoutDefault";

const Home = () => {
    return (
        <LayoutDefault>
            {/* Carousel */}
            <div className="mb-4 border">
                <Carousel />
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