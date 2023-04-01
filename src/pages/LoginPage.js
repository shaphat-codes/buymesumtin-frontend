import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'







const LoginPage = () => {
	let {loginUser} = useContext(AuthContext)
	return (
			<div class="container authpage">
				<br/><br/><br/><br/>
				<h2 class="text-center">Log in</h2>
				<br/><br>
				</br>
			  
			
	<form  onSubmit={loginUser}>
					<label for="inputName4">Email</label> 	
		<input required type="email" class="form-control" id="exampleInputEmail1" name="email" placeholder="enter your email"/><br/>
					<label for="inputName4">Password</label> 	
		<input required type="password" class="form-control" id="exampleInputEmail1" name="password" placeholder="enter your password"/> <br/>


		<div className="text-center"><input className="btn btn-outline-primary" type="submit"/></div>

	</form>
<p>Dont have an account? register <Link to = "/creator/register">here</Link></p>
<br/>
		
		</div>
		
		)
}
export default LoginPage