import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [formValues, setFormValues] = useState({ password: "", confirmPassword: "" });
    const [formError, setFormError] = useState({});
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const {token} = useParams();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(formValues);
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            setIsSubmitting(true);
            setMessage("");
            setError("");
            try {
                const response = await fetch(`http://localhost:3001/api/v1/auth/reset-password/${token}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password: formValues.password }),
                });
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || "Password reset failed");
                }
                setMessage("Password reset successful! You can now log in.");
                setTimeout(() => navigate("/login"), 2000);
            } catch (error) {
                setError("Error: Could not reset password. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    }

    const validate = (values) => {
        const errors = {};
        if (!values.password) {
            errors.password = "Password is required!";
        } else if (values.password.length < 6) {
            errors.password = "Password must be at least 6 characters";
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = "Passwords do not match!";
        }
        return errors;
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="mx-auto p-5 bg-white rounded-4 shadow-lg">
                <h2 className="fs-2 fw-semibold mb-4 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit} method="POST">
                    <div>
                        <input type="password" name="password" value={formValues.password} onChange={handleChange} placeholder="New password" className="w-100 px-4 py-2 border rounded-2 focus-ring" required />
                        <p>{formError.password}</p>
                    </div>
                    <div>
                        <input type="password" name="confirmPassword" value={formValues.confirmPassword} onChange={handleChange} placeholder="Confirm New Password" className="w-100 px-4 py-2 border rounded-2 focus-ring" required />
                        <p>{formError.confirmPassword}</p>
                    </div>
                    <button type="submit" className="w-100 bg-primary text-white py-2 rounded-2 border-0 mt-3" disabled={isSubmitting} >{isSubmitting ? "Resetting Password..." : "Reset Password"}</button>
                    {message && <p className="text-success mt-3">{message}</p>}
                    {error && <p className="text-danger mt-3">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;