const BlogForm = ({ title, author, url, setTitle, setAuthor, setUrl, addBlog }) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={addBlog}>
      <label>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>
      <label>
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>
      <label>
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>
      <button type="submit">create</button>
    </form>
  </div>
)

export default BlogForm
