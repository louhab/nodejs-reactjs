import "../App.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function Login() {
  const navigate = useNavigate();
    const LOGIN_URL = "http://localhost:10/users/login";
    const Wrong_User_Namr_Or_Password = "Wrong Username And Password Combination";
    const Error_authenticated = "Erreur lors de l'authentification";
    const authContext = useContext(AuthContext);
    const showErrorToast = (message) => {
      toast.error(message, {
        autoClose: 5000, 
      });
    };
    const initialValues = {
        username: "",
        password: "",
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(15).required(""),
        password: Yup.string().min(3).max(20).required(""),
    });
  const onSubmit = (data) => {
    axios.post(LOGIN_URL, data)
      .then(response => {
        sessionStorage.setItem("accessToken", response.data.token)
        authContext.setAuthState({
          username: response.data.username,
          id: response.data.id,
          status :true
          });
        if (response.data && response.data.error !== Wrong_User_Namr_Or_Password) {
           toast.success("You logged succesfully");  
           setTimeout(() => {
             navigate("/");
          }, 2000);
        } else {
             showErrorToast(Error_authenticated);
        }
    })
    .catch(error => {
          showErrorToast(Error_authenticated);
    });
    };
    return (
      <div className="formContainer">
          <ToastContainer />
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label htmlFor="username" className="label">Username</label>
                    <ErrorMessage name="username" component="span" className="username" />
                    <Field id="username" name="username" placeholder="(Ex , username...)" className="input" />
                    <label htmlFor="password" className="label">Password:</label>
                    <ErrorMessage name="password" component="span" className="error" />
                    <Field type="password" id="password" name="password" placeholder="(Ex , password ...)" className="input" />
                    <button type="submit" className="button">Create account</button>
                </Form>
            </Formik>
        </div>
    );
}
export default Login;
