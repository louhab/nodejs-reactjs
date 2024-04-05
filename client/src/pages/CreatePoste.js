import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'; // Import Yup library
import { useNavigate } from 'react-router-dom';

function CreatePoste() {
    const navigate = useNavigate(); 
    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };
    const validationSchema = Yup.object().shape({
        title: Yup.string().required("you must put a title"),
        postText: Yup.string().required("you must put a poste texte"),
        username: Yup.string().min(3).max(15).required("you must put a username"),
    });

    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:10/posts", data)
        .then((response)=>{
            console.log(response);
            navigate("/")
        })
        .catch((error) => {
            console.error('Error occurred while making POST request:', error);
        });
    };
return (
        <div className="formContainer">
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                    <label htmlFor="title" className="label">Title</label>
                    <ErrorMessage name="title" component="span" className="error" />

                    <Field id="title" name="title" placeholder="(Ex , title ...)" className="input" />

                    <label htmlFor="postText" className="label">Post text:</label>
                    <ErrorMessage name="postText" component="span" className="error" />

                    <Field id="postText" name="postText" placeholder="(Ex , post text ...)" className="input" />

                    <label htmlFor="userName" className="label">User Name</label>
                    <ErrorMessage name="username" component="span" className="error" />

                    <Field id="username" name="username" placeholder="(Ex , user name ...)" className="input" />
                    
                    <button type="submit" className="button">Create Post</button>
                </Form>
            </Formik>
        </div>
    );
}
export default CreatePoste;
