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

import { Route, Routes } from 'react-router-dom';

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
  return (
    <div className='App'>

      <Header title="Hemanth Blogs"/>
      <Nav search={search} setSearch={setSearch}/>

      <Routes>

        <Route path="/" element={<Home posts={posts}/>} />

        <Route path="/post" element={<NewPost />} />

        <Route path="/post/:id" element={<PostPage />} />

        <Route path="/about" element={<About />} />

        <Route path="*" element={<Missing />} />

      </Routes>

      <Footer />

    </div>
  )
}

export default App