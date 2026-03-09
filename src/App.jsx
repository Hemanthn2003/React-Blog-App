import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header.jsx'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { format } from 'date-fns'
import { Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState([ {
      id: 1,
      title: "My Girlfriend",
      datetime: "March 16, 2025 11:11:11 AM",
      body: " It's my girlfriends birthday!"
    },
    {
      id: 2,
      title: "My name is Hemanth",
      datetime: "June 04, 2026 11:17:36 AM",
      body: "It's My Birthday"
    },
    {
      id: 3,
      title: "My Mother",
      datetime: "July 23, 2026 11:17:36 AM",
      body: "It's my Mothers Birtday"
    },
    {
      id: 4,
      title: "My Father",
      datetime: "Dec 29, 2026 11:17:36 AM",
      body: "My Father's Birthday"
    }
    ])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
   const[postTitle, setPostTitle] = useState('')
  const[postBody, setPostBody] = useState('')
  const navigate = useNavigate();
useEffect(()=>{
const filteredResults= posts.filter(post =>((post.body).toLowerCase()).includes(search.toLowerCase())
|| ((post.body).toLowerCase()).includes(search.toLowerCase()));
setSearchResult(filteredResults.reverse());
},[ posts, search])


  const handleDelete = (id)=>{
  const postsList = posts.filter(post => post.id !== id);
  setPosts(postsList);
  navigate("/");
 }


 const handleSubmit = (e)=>{
e.preventDefault();
const id = posts.length? posts[posts.length-1].id+1 : 1;
const datetime=format(new Date(),'MMMM dd, yyyy pp');
const newPost ={id, title: postTitle, body: postBody};
const allPost =[ ...posts, newPost ];
setPosts(allPost);
setPostTitle('');
setPostBody('');
navigate("/");

}
  return (
    <div className='App'>

      <Header title="Hemanth Blogs"/>
      <Nav search={search} setSearch={setSearch}/>

      <Routes>

        <Route path="/" element={<Home posts={searchResult}/>} />

        <Route path="/post" element={<NewPost 
        handleSubmit={handleSubmit}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}
        />} />

        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<Missing />} />

      </Routes>

      <Footer />

    </div>
  )
}

export default App