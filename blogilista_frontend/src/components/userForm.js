import { useState } from 'react'
import blogService from '../services/blogService'
import registrationService from '../services/registrationService'
import loginService from '../services/loginService'
import DOMPurify from 'dompurify'
//import './userForm.css'

const UserForm = (props) => {
	const [username, setUsername] = useState('')
	const [name, setName] = useState('')
	const [password, setPassword] = useState('')
	const [validatorMsg, setValidatorMsg] = useState('')
	const [toggleRegForm, setToggleRegForm] = useState(false)

	const handleToggleRegForm = () => {
		setToggleRegForm(!toggleRegForm)
		setValidatorMsg('')
	}

	const handleUsernameChange = (e) => {
		setUsername(DOMPurify.sanitize(e.target.value))
		// Don't show validator message when logged in (i.e when register form is visible)
		if (toggleRegForm && (username.length < 4 || username.length > 20)) {
			setValidatorMsg('Minimum length 4, maximum 20.')
		} else {
			setValidatorMsg(null)
		}
	}
	const handleNameChange = (e) => setName(DOMPurify.sanitize(e.target.value))

	const handlePasswordChange = (e) => {
		setPassword(DOMPurify.sanitize(e.target.value))
		// Don't show validator message when logged in (i.e when register form is visible)
		if (toggleRegForm && password.length < 8) {
			setValidatorMsg('Minimum length 8.')
		} else {
			setValidatorMsg(null)
		}
	}

	const registerUser = async (e) => {
		e.preventDefault()
		const newUser = {
			username: username,
			name: name,
			password: password
		}
		if (!validatorMsg) {
			try {
				await registrationService.registerUser(newUser)
			} catch (e) {
				setValidatorMsg(e.response.data.error || e.request.data.error)
			}
		}
		setTimeout(() => {
			setValidatorMsg(null)
		}, 4000)
	}

	const login = async (e) => {
		e.preventDefault()
		const loggingUser = {
			username: username,
			password: password
		}
		try {
			const loggedInUser = await loginService.login(loggingUser)
			window.localStorage.setItem('loggedUser', JSON.stringify(loggedInUser))
			blogService.setToken(loggedInUser.token)
			props.setLoggedIn(true)
		} catch (e) {
			setValidatorMsg(e.response.data.error || e.request.data.error)
		}
		setTimeout(() => {
			setValidatorMsg(null)
		}, 4000)
	}

	const logout = (e) => {
		e.preventDefault()
		window.localStorage.clear()
		props.setLoggedIn(false)
		props.setUser(null)
		setValidatorMsg('')
	}

	if (!props.user && !props.loggedIn) {
		return (
			<>
				<div className='userForm'>
					{toggleRegForm ?
						<>
							<form onSubmit={registerUser}>
								<table>
									<thead>
										<tr>
											<td>
												{validatorMsg || 'Register!'}
											</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<input value={username} type='text' autoComplete='username' onChange={handleUsernameChange} placeholder='Username' />
											</td>
										</tr>
										<tr>
											<td>
												<input value={name} type='text' onChange={handleNameChange} placeholder='Full Name' />
											</td>
										</tr>
										<tr>
											<td>
												<input type='password' autoComplete='new-password' value={password} onChange={handlePasswordChange} placeholder='Password' />
											</td>
										</tr>
										<tr>
											<td>
												<button type='submit'>Register</button>
											</td>
										</tr>
									</tbody>
								</table>
							</form>
							<button type='button' onClick={handleToggleRegForm}>Already a user?</button>
						</>
						: <>
							<form onSubmit={login}>
								<table>
									<thead>
										<tr>
											<td>
												{validatorMsg || 'Login!'}
											</td>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>
												<input value={username} type='text' autoComplete='username' onChange={handleUsernameChange} placeholder='Username' />
											</td>
										</tr>
										<tr>
											<td>
												<input value={password} type='password' autoComplete='new-password' onChange={handlePasswordChange} placeholder='Password' />
											</td>
										</tr>
										<tr>
											<td>
												<button type='submit'>Login</button>
											</td>
										</tr>
									</tbody>
								</table>
							</form>
							<button type='button' onClick={handleToggleRegForm}>Register instead</button>
						</>}
				</div>
			</>
		)
	} else {
		return (
			<div>
				<button type='button' onClick={logout}>Logout</button>
			</div>
		)
	}
}

export default UserForm