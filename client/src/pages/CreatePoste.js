import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./CreatePoste.css";

function CreatePoste() {
  const navigate = useNavigate();

  // Initial values for form fields
  const initialValues = {
    title: "",
    postText: "",
    username: ""
  };

  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must enter a title"),
    postText: Yup.string().required("You must enter post text"),
    username: Yup.string().min(3).max(15).required("You must enter a username"),
  });

  // Function to handle form submission
  const onSubmit = (data, { resetForm }) => {
    axios.post("http://localhost:10/posts", {
      title: data.title,
      username: data.username,
      postText: data.postText,
    }, {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    })
      .then((response) => {
        if (response.status === 201) {
          // Notify user on successful post creation and reset the form
          toast.success("The post has been created successfully");
          setTimeout(() => {
            resetForm();
            navigate("/");
          }, 2000);
        } else {
          toast.error("Unexpected status code: " + response.status);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Server responded with error: " + error.response.status);
        } else if (error.request) {
          toast.error("No response received from server");
          console.log(error);
        } else {
          toast.error("Error setting up request: " + error.message);
        }
      });
  };

  // Function to show error toast
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000,
    });
  };

  return (
    <div className="formContainer">
      <ToastContainer />
      {/* Formik wrapper for form handling */}
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          {/* Title input */}
          <label htmlFor="title" className="label">Title</label>
          <ErrorMessage name="title" component="span" className="error" />
          <Field id="title" name="title" placeholder="(e.g., Title ...)" className="input" />

          {/* Post Text input */}
          <label htmlFor="postText" className="label">Post Text</label>
          <ErrorMessage name="postText" component="span" className="error" />
          <Field id="postText" name="postText" placeholder="(e.g., Post text ...)" className="input" />

          {/* Username input */}
          <label htmlFor="username" className="label">Username</label>
          <ErrorMessage name="username" component="span" className="error" />
          <Field id="username" name="username" placeholder="(e.g., Username ...)" className="input" />

          {/* Submit button */}
          <button type="submit" className="button">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePoste;
