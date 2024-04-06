import "../App.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const showErrorToast = (message) => {
    toast.error(message, {
      autoClose: 5000, // Auto close the toast after 5 seconds
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
    axios.post("http://localhost:10/users/login", data)
    .then(response => {
        console.log("Response received:", response);
        if (response.data && response.data.error !== "Wrong Username And Password Combination") {
           toast.success("You logged succesuffly");  
           setTimeout(() => {
             navigate("/");
          }, 2000);
        } else {
             showErrorToast("Erreur lors de l'authentification");
        }
    })
    .catch(error => {
          showErrorToast("Erreur lors de l'authentification");
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
