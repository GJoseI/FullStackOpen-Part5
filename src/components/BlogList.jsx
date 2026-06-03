import Blog from './Blog'

const BlogList = ({ blogs, user, handleLogout }) => (
  <div>
    <h2>blogs</h2>
    <p> {user.name} logged in</p> <button type='submit' onClick={handleLogout} />
    {blogs.map(blog => (
      <Blog key={blog.id} blog={blog} />
    ))}
  </div>
)

export default BlogList
