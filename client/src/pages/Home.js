import "../App.css"
import axios from "axios";
import { useEffect ,useState } from "react";
import { useNavigate } from 'react-router-dom';


function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:10/posts")
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const handleNavigation= (id) =>{
        navigate("/post/"+id)
    }
  return (
    <div className="App">
      {
        posts.map((value,key)=>{
        return <div className='post' key={key} onClick={()=>  handleNavigation(value.id) }>
                    <div className='title'>  { value.title  } </div>
                    <div className='body'>  { value.postText  } </div>
                    <div className='footer'>  { value.username  } </div>    
              </div>    
        })
      }
    </div>
  );
}
export default Home;
