import Carousel from "../components/Carousel";
import CategoryCard from "../components/categories/CategoryCard";
import Header from "../components/Header";

const Home = () => {
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
            </div>
        </div>
    )
}

export default Home;