import "../App.css"
import axios from "axios";
import { useEffect ,useState } from "react";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:10/posts")
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="App">
      {
        posts.map((value,key)=>{
          return <div className='post'>
              
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
