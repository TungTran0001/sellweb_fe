import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
    const initialValues = {email: "", password: "", confirmPassword: ""}
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
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
        if(!values.confirmPassword) {
            errors.confirmPassword = "Confirm password is required!";
        }
        else if(values.password !== values.confirmPassword) {
            errors.confirmPassword = "Password does not match!";
        }
        return errors;
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="mx-auto p-5 bg-white rounded-4 shadow-lg">
                <h2 className="fs-2 fw-semibold mb-4 text-center">Sign up</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <input type="text" id="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Email" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.email }</p>
                    <div className="mt-3">
                        <input type="password" id="password" name="password" value={formValues.password} onChange={handleChange} placeholder="Create password" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.password }</p>
                    <div className="mt-3">
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="w-100 px-4 py-2 border rounded-2 focus-ring" />
                    </div>
                    <p className="text-sm-start text-danger">{ formErrors.confirmPassword }</p>
                    <button type="submit" className="w-100 bg-primary text-white py-2 rounded-2 border-0">Sign up</button>
                </form>
                <p className="mt-4 text-center">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register;