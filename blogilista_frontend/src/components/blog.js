import blogService from '../services/blogService'
import './blog.css'

const Blog = (props) => {
	const loggedInUserID = props.loggedInUserID

	const addLike = () => {
		const updatedPost = {
			title: props.title,
			author: props.author,
			url: props.blogUrl,
			likes: props.likes+1
		}

		blogService.voteBlog(props.id, updatedPost).then(r => props.setBlogs(props.blogs.map(b => b.id === r.id ? r : b)))
	}

	const deleteBlog = () => {
		blogService.deleteBlog(props.id).then(r => props.setBlogs(props.blogs.flatMap(b => b.id !== props.id ? b : [])))
	}

	return(
		<div className="blog">
			{/* Logged-in user can only remove blogs submitted by themselves */}
			{loggedInUserID === props.user
				? <button alt='remove this blog' onClick={deleteBlog}>X</button> 
				: null}
			<b>Title</b>: <i>{props.title}</i><br/>
			<b>Author</b>: <i>{props.author}</i><br/>
			<b>URL</b>: <a href={props.blogUrl} target="_blank" rel="noreferrer"><i>{props.blogUrl}</i></a><br/>
			<b>Likes</b>: <i>{props.likes}</i> <img alt="thumbs up icon" src="thumbsup.png" onClick={addLike}/>
		</div>
	)
}

export default Blog