import axios from 'axios'

const registerUser = (user) => axios.post('/api/register', user).then(r => r.data)

const exportedObject = { registerUser }
export default exportedObject