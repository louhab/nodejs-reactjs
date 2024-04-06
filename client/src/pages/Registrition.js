import "../App.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'; 
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Registration() {
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(300).required(""),
        password: Yup.string().min(3).max(20).required(""),
    });
    const onSubmit = (data) => {
        console.log(data)
        axios.post("http://localhost:10/users", data)
            .then(response => {
                    toast("Votre compte a ete creer avec success")
                    setTimeout(function() {
                    navigate("/login")
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
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label htmlFor="username" className="label">Username</label>
                    <ErrorMessage name="username" component="span" className="username" />
                    <Field id="username" name="username" placeholder="(Ex, username...)" className="input" />
                    <label htmlFor="password" className="label">Password:</label>
                    <ErrorMessage name="password" component="span" className="error" />
                    <Field type="password" id="password" name="password" placeholder="(Ex, password...)" className="input" />
                    <button type="submit" className="button">Create account</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Registration;
