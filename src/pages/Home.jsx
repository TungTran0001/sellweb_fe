import Carousel from "../components/Carousel";
import Header from "../components/Header";

const Home = () => {
    return (
        <div className="container-fruit">
            <div className="fixed-top">
                <Header />
            </div>
            <div className="container" style={{paddingTop: "130px"}}>
                <Carousel />
            </div>
        </div>
    )
}

export default Home;