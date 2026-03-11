import React from 'react'
import { Link } from 'react-router-dom'
const Missing = () => {
  return (
    <main className='Missing'>
     <h2>Post not found</h2>
<p>Well, thats dissappointing!!!</p>
<p><Link to="/">Visit Our Homepage</Link></p>
    </main>
  )
}

export default Missing
