import React from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../App.css";

function Registration() {
    const navigate = useNavigate();

    // Initial form values
    const initialValues = {
        username: "",
        password: "",
    };

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(300).required(""),
        password: Yup.string().min(3).max(20).required(""),
    });

    // Function to handle form submission
    const onSubmit = (data) => {
        axios.post("http://localhost:10/users", data, {
            headers: {
                Authorization: sessionStorage.getItem("accessToken")
            }
        })
        .then(response => {
            // Notify user and navigate on successful registration
            toast("Votre compte a été créé avec succès");
            setTimeout(function() {
                navigate("/login");
            }, 2000); 
        })
        .catch(error => {
            // Handle error, such as displaying an error message
            console.error('Error:', error);
        });
    };

    return (
        <div className="formContainer">
            <ToastContainer />
            {/* Formik wrapper for form handling */}
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    {/* Username input */}
                    <label htmlFor="username" className="label">Username</label>
                    <ErrorMessage name="username" component="span" className="username" />
                    <Field id="username" name="username" placeholder="(Ex, username...)" className="input" />

                    {/* Password input */}
                    <label htmlFor="password" className="label">Password:</label>
                    <ErrorMessage name="password" component="span" className="error" />
                    <Field type="password" id="password" name="password" placeholder="(Ex, password...)" className="input" />

                    {/* Submit button */}
                    <button type="submit" className="button">Create account</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
