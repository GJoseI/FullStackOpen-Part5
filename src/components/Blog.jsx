import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setMessage, blogs, setBlogs, user, setErrorMessage }) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('show')
  const [likes, setLikes] = useState(blog.likes)
  const [isRemoved, setIsRemoved] = useState(false)

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

  const likeBlog = async () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
      user: blog.user?.id || blog.user,
    }
    await blogService.update(blog.id, updatedBlog)
    setMessage('Blog liked!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setLikes(likes + 1)
    setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
  }

  const removeBlog = async () => {
    if (user.id === blog.user.id) {
      if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.deleteBlog(blog.id)
        setIsRemoved(true)
      }
    }
    setErrorMessage('Blog was not created by user')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!isRemoved) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {blog.url}
          <br />
          likes:{likes}<button type="submit" onClick={likeBlog}>like</button>
          <br />
          {blog.user?.name}
          <br />
          <button type="submit" onClick={removeBlog}>remove</button>
        </div>
      </div>
    )
  }
}

export default Blog
