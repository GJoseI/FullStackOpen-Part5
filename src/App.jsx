import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import ErrorNotification from './components/ErrorNotification'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async event => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
    }

    const blog = await blogService.create(blogObject)
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage(`a new blog ${blog.title} by ${blog.author} was added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <ErrorNotification message={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={message} />
      <BlogList
        blogs={blogs}
        user={user}
        handleLogout={handleLogout}
        title={title}
        author={author}
        url={url}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
        addBlog={addBlog}
        blogFormVisible={blogFormVisible}
        setBlogFormVisible={setBlogFormVisible}
      />
    </div>
  )
}

export default App
