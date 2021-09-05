import Blog from './blog'
import './blogList.css'

const BlogList = (props) => {
	const loggedInUserID = props.user ? props.user.id : null
	return(
		<div>
			{props.blogs.map(b => 
			<Blog key={b.id} id={b.id} title={b.title} 
			author={b.author} blogUrl={b.url} likes={b.likes} 
			blogs={props.blogs} setBlogs={props.setBlogs} user={b.user} 
			loggedInUserID={loggedInUserID}/>)}
		</div>
	)
}

export default BlogList