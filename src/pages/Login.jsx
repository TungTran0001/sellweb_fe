import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { AuthContext } from "../contexts/AuthContext";

const Login = () => {
    const initialValues = {email: "", password: ""}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setIsAuthenticated } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        // Proceed only if there are no validate errors
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            try {
                const response = await fetch("http://localhost:3001/api/v1/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formValues),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Login failed");
                }
                const data = await response.json();
                // Store access and refresh tokens separately
                Cookies.set("accessToken", data.accessToken, { expires: 0.04 }); // ~1 hour in days
                Cookies.set("refreshToken", data.refreshToken, { expires: 7 }); // 7 days or as needed
                setIsAuthenticated(true); // Cập nhật trạng thái toàn cục
                navigate("/"); // Chuyển hướng
            } catch (error) {
                console.error("Error during login:", error);
                setFormErrors({ apiError: "Invalid email or password" });
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const validate = (values) => {
        const errors = {}
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!values.email) {
            errors.email = "Email is required!";
        } else if(!regex.test(values.email)) {
            errors.email = "Email is not in correct format!";
        }
        if(!values.password) {
            errors.password = "Password is required!";
        } else if(values.password.length < 6) {
            errors.password = "Password must be 6 characters or more!";
        }
        return errors;
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="mx-auto p-5 bg-white rounded-4 shadow-lg">
                <h2 className="fs-2 fw-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <input type="text" name="email" value={formValues.email} onChange={handleChange} placeholder="Email" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.email }</p>
                    <div className="mt-3">
                        <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Password" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.password }</p>
                    <p className="mt-3"><Link to="/forgot-password">Forgot password?</Link></p>
                    <button type="submit" className="w-100 bg-primary text-white py-2 rounded-2 border-0" disabled={isSubmitting}>{ isSubmitting ? "Submitting" : "Login" }</button>
                </form>
                <p className="mt-4 text-center">Don't have an account? <Link to="/register">Sign up</Link></p>
            </div>
        </div>
    );
}

export default Login;