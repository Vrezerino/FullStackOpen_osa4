import blogService from '../services/blogService'
//import './postBlogForm.css'

const PostBlogForm = (props) => {
	const handleTitleChange = (event) => props.setTitle(event.target.value)
	const handleAuthorChange = (event) => props.setAuthor(event.target.value)
	const handleUrlChange = (event) => props.setBlogUrl(event.target.value)

	const postBlog = (event) => {
		event.preventDefault()
		const newBlog = {
			title: props.title,
			author: props.author,
			url: props.blogUrl !== '' 
			? ((props.blogUrl.includes("http://" || "https://")) ? props.blogUrl : "http://" + props.blogUrl) 
			: null,
			likes: props.likes
		}

		blogService.postBlog(newBlog)
			.then(r => props.setBlogs(props.blogs.concat(r)))

		props.setTitle('')
		props.setAuthor('')
		props.setBlogUrl('')
		props.setLikes(0)
	}

	return (
		<div>
			<form onSubmit={postBlog}>
				<table className="form">
					<thead>
						<tr>
							<th>Post new blog!</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<input value={props.title} onChange={handleTitleChange} placeholder="Title" />
							</td>
						</tr>
						<tr>
							<td>
								<input value={props.author} onChange={handleAuthorChange} placeholder="Author" />
							</td>
						</tr>
						<tr>
							<td>
								<input value={props.blogUrl} onChange={handleUrlChange} placeholder="URL" />
							</td>
						</tr>
						<tr>
							<td>
								<button type="submit">Post</button>
							</td>
						</tr>
						</tbody>
				</table>
			</form>
		</div>
	)
}

export default PostBlogForm