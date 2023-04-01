import  {createContext, useState, useEffect} from 'react'
import Cookie from "js-cookie";
import jwt_decode from "jwt-decode"
import {useHistory} from 'react-router-dom'



const SetCookie = (cookiename, cookie) => {
	Cookie.set(cookiename, cookie)
}

const GetCookie = (cookiename) => {
	return Cookie.get(cookiename)
}

const RemoveCookie = (cookiename) => {
	return Cookie.remove(cookiename)
}


const AuthContext = createContext()



export default AuthContext


export const AuthProvider = ({children}) => {
	const [isLoading, setIsLoading] = useState(false);
	let [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
	let [user, setUser] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')):null)
	
	const histroy = useHistory()
	//histroy.push('/creator/profile')


	let loginUser = async (e)=> {
		setIsLoading(true)
		e.preventDefault()
		
		let response = await fetch('http://127.0.0.1:8000/login/', {
			method: "POST",

			credentials: "include",
      		headers: {
			"Content-Type": "application/json",
			
      },
      		
			body:JSON.stringify({'email':e.target.email.value, 'password':e.target.password.value})
		})
		
		let data = await response.json()
		setIsLoading(false)


		console.log('response:', response)
		if (response.status === 200) {
			setAuthTokens(data)
			setUser(data)
			SetCookie('cookie', data.access_token)
			localStorage.setItem('authTokens', JSON.stringify(data))
			histroy.push(`/`)
		} else{
			alert('oops..... you might have entered an incorrect email or password.')
		}
		
	}


		let registerUser = async (e)=> {
		setIsLoading(true)
		e.preventDefault()
		let response = await fetch('http://127.0.0.1:8000/register/', {
			method: 'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value,'phone_number':e.target.phone_number.value, 'password1':e.target.password1.value, 'password2':e.target.password2.value})
		})
		
		let data = await response.json()
		setIsLoading(false)
		console.log('response:', response)
		if (response.status === 201) {
			
			alert('An email verification message has been sent to your email address')
		} else{
			alert('Something went wrong! Check your credentials and try again')
		}
		
	}

		

		

	let logoutUser = () => {
		setAuthTokens(null)
		setUser(null)
		RemoveCookie('cookie')
		localStorage.removeItem('authTokens')
		histroy.push('/')
	}


	let contextData = {
		user:user,
		loginUser : loginUser,
		logoutUser : logoutUser,
		registerUser : registerUser,
		isLoading	 : isLoading,
		

	}
	return(

		<AuthContext.Provider value={contextData}>
			{children}
			{isLoading ? <div class="loading">Loading</div> : <p></p>}
		</AuthContext.Provider>

		)
}