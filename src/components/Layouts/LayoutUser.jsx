import Header from "../Header";
import Navbar from "../Navbar/Navbar";

const LayoutUser = ({ children }) => {
    return (
        <div>
            {/* Header cố định */}
            <div className="fixed-top">
                <Header />
            </div>
            <div className="container" style={{ paddingTop: "130px" }}>
                <div className="row">
                    {/* Sidebar bên trái */}
                    <div className="col-lg-4 mb-4">
                        <Navbar />
                    </div>
                    {/* Vùng nội dung chính */}
                    <div className="col-lg-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutUser;