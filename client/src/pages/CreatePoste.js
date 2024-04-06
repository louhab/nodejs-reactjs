import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreatePoste.css";
// Import your custom CSS for styling



function CreatePoste() {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    postText: "",
    username: ""
  };
const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must enter a title"),
    postText: Yup.string().required("You must enter post text"),
    username: Yup.string().min(3).max(15).required("You must enter a username"),
  });
const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:10/posts", data)
      .then((response) => {
        toast.success("The post has been created successfully");
        setTimeout(() => {
          resetForm();
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Error:", error);
        showErrorToast("Error creating post");
      });
  };

  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };

  return (
    <div className="formContainer">
      <ToastContainer />
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label htmlFor="title" className="label">Title</label>
          <ErrorMessage name="title" component="span" className="error" />
          <Field id="title" name="title" placeholder="(e.g., Title ...)" className="input" />
          <label htmlFor="postText" className="label">Post Text</label>
          <ErrorMessage name="postText" component="span" className="error" />
          <Field id="postText" name="postText" placeholder="(e.g., Post text ...)" className="input" />
          <label htmlFor="username" className="label">Username</label>
          <ErrorMessage name="username" component="span" className="error" />
          <Field id="username" name="username" placeholder="(e.g., Username ...)" className="input" />
          <button type="submit" className="button">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePoste;
