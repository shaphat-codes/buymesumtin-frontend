import React, {useState, useContext, useEffect} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'



const RegisterPage = () => {
	let {registerUser} = useContext(AuthContext)

	return (
		
		<div class="container authpage">
			<br/><br/><br/><br/>
				<h2 class="text-center">Register</h2>
				<br/><br>
				</br>
		  
		
			<form onSubmit={registerUser}>

					<input required type="text" className='form-control' name="username" placeholder="username"/> <br/>
					<input required type="email" className='form-control' name="email" placeholder="email"/> <br/>
					<input required type="text" className='form-control' name="phone_number" placeholder="phone number"/> <br/>
					<input required type="password" className='form-control' name="password1" placeholder="password"/> <br/>
					<input required type="password" className='form-control' name="password2" placeholder="confirm password"/> <br/>
					<div className="text-center"><input className="btn btn-outline-primary" type="submit"/></div> 

	
 

			</form>

			<p>Already have an account? sign in <Link to = "/creator/login">here</Link></p>
			<br/>	 
		
	    </div>
	 

		)
}
export default RegisterPage