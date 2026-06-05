import Blog from './Blog'
import BlogForm from './BlogForm'

const BlogList = ({
  blogs,
  user,
  handleLogout,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
  addBlog,
  blogFormVisible,
  setBlogFormVisible,
}) => {
  const BlogForm = () => {
    const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
    const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

    return (
      <div>
        <h2>blogs</h2>
        <p>
          {user.name} logged in{' '}
          <button type="submit" onClick={handleLogout}>
            logout
          </button>
        </p>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormVisible(true)}>create blog</button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm
            title={title}
            author={author}
            url={url}
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            addBlog={addBlog}
          />
          <button onClick={() => setBlogFormVisible(false)}>cancel</button>
        </div>
        {blogs.map(blog => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    )
  }
}

export default BlogList
