import { useState, useEffect } from 'react'
import './App.css'
import Header from './Header.jsx'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost.jsx'
import About from './About'
import Missing from './Missing'
import { format } from 'date-fns'
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from './api/posts.jsx'
import UseWindowSize from './hooks/UseWindowSize.jsx'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])
   const[postTitle, setPostTitle] = useState('')
  const[postBody, setPostBody] = useState('')
   const[editTitle, setEditTitle] = useState('')
  const[editBody, setEditBody] = useState('')
  const navigate = useNavigate();
const { width } = UseWindowSize();

useEffect(()=>{
const fetchPosts = async ()=>{
  try{
const response = await api.get('/posts');
if(response &&  response.data) setPosts(response.data)
  }catch(err){
  if(err.response){
console.log(err.response.data);
console.log(err.response.status);
console.log(err.response.headers);
  }else{
    console.log(`Error: ${err.message}`);

  }
  }
}
fetchPosts();
},[])

useEffect(()=>{
const filteredResults= posts.filter(post =>((post.body).toLowerCase()).includes(search.toLowerCase())
|| ((post.body).toLowerCase()).includes(search.toLowerCase()));
setSearchResult(filteredResults.reverse());
},[ posts, search])


  const handleDelete =async (id)=>{
    try{
await  api.delete(`posts/${id}`);
  const postsList = posts.filter(post => post.id !== id);
  setPosts(postsList);
  navigate("/");
    }catch(err){
    console.log(`Error: ${err.message}`);
    }
 }


 const handleSubmit = async (e)=>{
e.preventDefault();
const id = posts.length? posts[posts.length-1].id+1 : 1;
const datetime=format(new Date(),'MMMM dd, yyyy pp');
const newPost ={id, title: postTitle, datetime, body: postBody};
const allPost =[ ...posts, newPost ];
try{
  const response= await api.post('/posts', newPost);
  const allPosts = [...posts, response.data];
  setPosts(allPost);
setPostTitle('');
setPostBody('');
navigate("/");
}catch(err){
  console.log(`Error: ${err.message}`)
}
}
 const handleEdit = async (id)=> {
  const datetime = format(new Date(),'MMMM dd, yyyy pp');
const updatePost = { id, title: editTitle, datetime, body:editBody} ;
try{
const response = await api.put(`/posts/${id}`, updatePost);
setEditTitle('');
setEditBody('');
navigate('/')
setPosts(posts.map(post=> post.id === id? {...response.data} : post))
}catch(err){
    console.log(`Error: ${err.message}`)

}
}

  return (
    <div className='App'>

      <Header title="Hemanth Blogs" width={width}/>
      <Nav search={search} setSearch={setSearch}/>

      <Routes>

        <Route path="/" element={<Home posts={searchResult}/>} />

        <Route path="/post" element={
          <NewPost 
        handleSubmit={handleSubmit}
        postTitle={postTitle}
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}
        />} />
            <Route path="/edit/:id" element={
          <EditPost 
        posts={posts}
        handleEdit={handleEdit}
        editTitle={editTitle}
        setEditTitle={setEditTitle}
        editBody={editBody}
        setEditBody={setEditBody}
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