import { Link } from "react-router-dom";

const Banner = ({ banners }) => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-indicators">
                {banners.map((_, index) => (
                    <button
                        key={index} 
                        type="button" 
                        data-bs-target="#carouselExampleIndicators" 
                        data-bs-slide-to={index}
                        aria-label={`Slide ${index + 1}`}
                        className={index === 0 ? 'active' : ''}
                        aria-current={index === 0 ? 'true' : undefined } 
                    ></button>
                ))}
            </div>
            <div className="carousel-inner">
                {banners.map((banner, index) => (
                    <Link to={banner.redirect_url} key={index}>
                        <div 
                            className={`carousel-item ${index === 0 ? 'active': ''}`}
                        >
                            <img src={`http://localhost:3001${banner.image_url}`} class="d-block w-100" alt="..." />
                        </div>
                    </Link>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Banner;