import axios from 'axios'
const url = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => axios.get(url).then(r => r.data)
const postBlog = blog => axios.post(url, blog, { headers: { Authorization: token } }).then(r => r.data)
const deleteBlog = id => axios.delete(url + '/' + id, { headers: { Authorization: token } }).then(r => r.data)
const voteBlog = (id, votes) => axios.put(url + '/' + id, votes).then(r => r.data)
const exportedObject = { token, setToken, getAll, postBlog, deleteBlog, voteBlog }

export default exportedObject