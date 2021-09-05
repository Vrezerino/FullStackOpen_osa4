import React, { useState, useEffect } from 'react'
import blogService from './services/blogService'
import BlogList from './components/blogList'
import PostBlogForm from './components/postBlogForm'
import UserForm from './components/userForm'

const App = () => {
	const [blogs, setBlogs] = useState([])
	const [author, setAuthor] = useState('')
	const [title, setTitle] = useState('')
	const [blogUrl, setBlogUrl] = useState('')
	const [likes, setLikes] = useState(0)
	const [user, setUser] = useState(null)
	const [loggedIn, setLoggedIn] = useState(false)

	const states = {blogs, setBlogs, author, setAuthor, title, setTitle, blogUrl, setBlogUrl, likes, setLikes, user}

	useEffect(() => {
		blogService.getAll().then(r => setBlogs(r))
	}, [])

	useEffect(() => {
		const loggedUser = window.localStorage.getItem('loggedUser')
		if (loggedUser) {
			const user = JSON.parse(loggedUser)
			setUser(user)
			setLoggedIn(true)
			blogService.setToken(user.token)
		}
	}, [loggedIn])

	return (
		<>
			<h1>Interesting blogs</h1>
			<BlogList blogs={blogs} setBlogs={setBlogs} user={user}/>
			{loggedIn ? <PostBlogForm {...states}/> : null}
			<UserForm setUser={setUser} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
		</>
	)
}

export default App;
