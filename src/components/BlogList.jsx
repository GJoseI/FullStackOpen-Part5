import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({ blogs, user, handleLogout, title, author, url, setTitle, setAuthor, setUrl, addBlog  }) => (
  <div>
    <h2>blogs</h2>
    <p> {user.name} logged in <button type='submit' onClick={handleLogout}>logout</button></p>
    <BlogForm 
      title={title}
      author={author}
      url={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      addBlog={addBlog}
    />
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default BlogList
