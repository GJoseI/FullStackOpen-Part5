import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import blogService from '../services/blogs'

const BlogList = ({ blogs, user, setUser, setBlogs, setMessage, setErrorMessage }) => {
  const addBlog = async blogObject => {
    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setMessage(`a new blog ${blog.title} by ${blog.author} was added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in{' '}
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </p>
      {blogForm()}
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} user={user} setMessage={setMessage} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} />
        ))}
    </div>
  )
}

export default BlogList
