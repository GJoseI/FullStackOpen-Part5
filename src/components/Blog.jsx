import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setMessage, blogs,  setBlogs }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('show')
  const [likes, setLikes] = useState(blog.likes)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    setButtonLabel(visible ? 'show' : 'hide')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = async () =>{
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user?.id || blog.user
    }
    await blogService.update(blog.id, updatedBlog)
    setMessage('Blog liked!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setLikes(likes + 1)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}<br/>
        likes:{likes} <button type='submit' onClick={likeBlog}>like</button><br/>
        {blog.user?.name}
      </div>
    </div>
  )
}

export default Blog
