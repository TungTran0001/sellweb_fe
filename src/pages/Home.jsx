import Banner from "../components/Banner/Banner";
import LayoutDefault from "../components/Layouts/LayoutDefault";

const Home = () => {
    return (
        <LayoutDefault>
            {/* Banner */}
            <div className="mb-4 border">
                <Banner />
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