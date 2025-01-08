import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const LayoutDefault = ({ children }) => {
    return (
        <div className="d-flex flex-column vh-100">
            {/* Header cố định */}
            <Header />

            {/* Nội dung chính */}
            <div className="container mb-4" style={{ marginTop: "130px"}}>
                {children}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default LayoutDefault;