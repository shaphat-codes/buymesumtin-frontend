import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import {Link} from 'react-router-dom'

import Modal from 'react-bootstrap/Modal';



const HomePage = (props) => {
  let {loginUser} = useContext(AuthContext)
  let {registerUser} = useContext(AuthContext)
  let {user, logoutUser} = useContext(AuthContext)

  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleShow = () => setShow(true);
  const handleShowRegister = () => setShowRegister(true);
  const handleClose = () => setShow(false);
  const handleRegisterClose = () => setShowRegister(false);

  const [noUser, setNoUser] = useState()

  
  const name = props.match.params.slug

  const userpage = async () => {
      
      
    const response = await fetch(`https://api-buymesumtin.onrender.com/${name}`,
    {
     method: 'GET',
     credentials: "include",
     headers: {
       "Content-Type": "application/json",
      },
       
   }
   )
   
   console.log(response.status)
  
   if (response.status === 200){
      setNoUser(true)
     
   
   }
   
   const data = await response.json() 
   console.log(data)
   

   //console.log(data)
 
   console.log(data.user)
 }

        
 useEffect(() => {
    //userpage()
  }, [])
	
	return (
		<div>

        <h1>Home page under construction...</h1>
        {user? <p>Click <Link to ="creator/profile" >here</Link> to visit your profile</p> :<p><Link to = "creator/login">login</Link></p>}
        

</div>
		
		)
}
export default HomePage