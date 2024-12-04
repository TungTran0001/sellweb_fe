import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { registerUser } from "../services/authService";

const Register = () => {
    const initialValues = {userName: "", email: "", password: ""}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormErrors(errors);
        if (Object.keys(errors).length === 0) {
            // Proceed with form submission if no errors
            setIsSubmitting(true);
            try {
                const data = await registerUser(formValues);
                Cookies.set("accessToken", data.accessToken, { expires: 0.04 }); // ~1 hour in days
                Cookies.set("refreshToken", data.refreshToken, { expires: 7 }); // 7 days or as needed
                navigate("/");
            } catch (error) {
                alert(error);
            } finally {
                setIsSubmitting(false);
            }
        }
        else {
            console.log("Form has errors", errors);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const validate = (values) => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.userName) {
            errors.useName = "Username is required";
        }
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!emailRegex.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        return errors;
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="mx-auto p-5 bg-white rounded-4 shadow-lg">
                <h2 className="fs-2 fw-semibold mb-4 text-center">Sign up</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div className="mb-3">
                        <input type="text" name="userName" value={formValues.userName} onChange={handleChange} placeholder="Enter name" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.useName }</p>
                    <div className="mb-3">
                        <input type="text" name="email" value={formValues.email} onChange={handleChange} placeholder="Enter email" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.email }</p>
                    <div className="mb-3">
                        <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Enter password" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.password }</p>
                    <button type="submit" className="w-100 bg-primary text-white py-2 rounded-2 border-0" disabled={isSubmitting}>{ isSubmitting ? "Submitting" : "Sign up" }</button>
                </form>
                <p className="mt-4 text-center">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;