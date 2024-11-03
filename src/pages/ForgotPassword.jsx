import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");
        setError("");
        try {
            const response = await fetch("http://localhost:3001/api/v1/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Failed to send reset email");
            }
            setMessage("A password reset link has been sent to your email.");
        } catch (error) {
            setError("Error: Could not send reset email. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="mx-auto p-5 bg-white rounded-4 shadow-lg">
                <h2 className="fs-2 fw-semibold mb-4 text-center">Forgot Password</h2>
                <form onSubmit={handleSubmit} method="POST" >
                    <div>
                        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Enter your email" className="w-100 px-4 py-2 border rounded-2 focus-ring" required />
                    </div>
                    <button type="submit" className="w-100 bg-primary text-white py-2 rounded-2 border-0 mt-3" disabled={isSubmitting} >{ isSubmitting ? "Sending..." : "Send Reset Link"}</button>
                </form>
                {message && <p className="text-success mt-3">{message}</p>}
                {error && <p className="text-danger mt-3">{error}</p>}
            </div>
        </div>
    )
}

export default ForgotPassword;