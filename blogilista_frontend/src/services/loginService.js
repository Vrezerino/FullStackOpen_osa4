import axios from 'axios'

const login = (user) => axios.post('/api/login', user).then(r => r.data)

const exportedObject = { login }
export default exportedObject