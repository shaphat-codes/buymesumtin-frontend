import React, { useEffect, useState } from "react"
import {Link, Redirect, useParams} from 'react-router-dom'
import PaystackPop from '@paystack/inline-js'
import {useHistory} from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const UserPage = (props) => {
    //const name = "you"


  const values = [true, 'sm-down', 'md-down', 'lg-down', 'xl-down', 'xxl-down'];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }


    const [noUser, setNoUser] = useState()
    const name = props.match.params.slug
    
    const [status, setStatus] = useState()

    const [slug, setSlug] = useState()
    const [user, setUser] = useState()
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [profile_photo, setProfilePhoto] = useState()


    let [phone_number, setPhone_number] = useState("")
    let [email, setEmail] = useState("")
    let [number_of_apples, setNumber_of_apples] = useState("")
    let [message, setMessage] = useState("")
    let [amount, setAmount] = useState("")

    let [loading, setLoading] = useState(false)



    let [apple_num, setAppleNum]= useState(1);
    let incAppleNum =()=>{
      if(apple_num<100)
      {
      setAppleNum(Number(apple_num)+1);
      }
    };
    let decAppleNum = () => {
       if(apple_num>0)
       {
        setAppleNum(apple_num - 1);
       }
    }
   let handleAppleChange = (e)=>{
     setAppleNum(e.target.value);
    }

    

    const history = useHistory()
  
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
       setStatus(response.status)
       if (response.status === 500 || response.status === 404){
          setNoUser(true)
         
       
       }
       
       const data = await response.json() 
       console.log(data)
       

       //console.log(data)
       setTitle(data.title)
       setDescription(data.description)
       setProfilePhoto(data.profile_photo)
       setUser(data.user)
       setSlug(data.slug)
       console.log(data.user)
     }

     const home = () => {
      history.push("/")
     }

     
     
    const Support = async () => {
      setLoading(false)
      const response =  await fetch('https://api-buymesumtin.onrender.com/support/payment-create/',{
        method: "POST",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
          "user": user,
          "email": email,
          "phone_number": phone_number,
          "number_of_apples": apple_num,
          "message": message
          
      })
      })

      let data = await response.json()
      setLoading(true)
      alert("You just bought someone an apple. yaaay!!!")
      console.log(data.user)
    }


    

     useEffect(() => {
        userpage()
        handleShow(true)
      }, [])


      const handleSubmit = (e) => {
        e.preventDefault()
        Support()
        e.preventDefault()
    }

   

    // Processing payment.
    const paywithpaystack = (e) =>{ 
      e.preventDefault()
      const paystack = new PaystackPop()
      paystack.newTransaction({
        key:"pk_test_0019a4e3acb7a9886c8c65386a5be0619de6223e",
        amount: apple_num*2.5*100,    
        email: email,
        username: email,

        onSuccess(transaction){
          let message = `Payment Complete! Reference ${transaction.reference}`
          alert(message)
          
        },
        onSuccess: () => Support(),
        
        onCancel(){
          alert("Transaction cancelled!")
        }
      })

     
   }
    

  
   
    return (
      <div class ="container">
{noUser? <h1>There is no such user</h1>:
       
        <div class="row">
            
            <div  class=""> 
            <div class="col-md-12">
            <div class="fb-profile-block">
                <div class="fb-profile-block-thumb cover-container"></div>
                <div class="profile-img">
                    <a href="#">
                        <img src={`${profile_photo}`} alt="" title=""/>        
                    </a>
                </div>
                <div class="profile-name">
                    <h2>{slug}</h2>
                </div>
                
                <div class="fb-profile-block-menu">
                    
                    <div class="block-menu">
                        <ul>
                            <li onClick={home}><Link to = "">Home</Link></li>
                            
                            
                        </ul>
                    </div>
                </div>
            </div>
            
        </div>
               
            </div>
            
           <div class="row">
           <br/><br/>
                <div class="col-sm"> <br/>
                 <h2 class="text-center display-3"> Hey 👋 <br/>
            Buy <strong>{slug}</strong> <br/>an apple 🍎 to show <br/>your love 🧡 <br/>and support 🚀 </h2>
            <hr/>
                  </div>
                  
          <div className="col-sm">
            
          <div class="row">
            
            <div className="col">
            <br/>
            <h5 class="text-center text-muted">Number of apples: </h5>
     
            </div>
          <div className="col">
            <br/>
                    <div class="input-group ">
                <div class="input-group-prepend">
                    <button class="btn btn-outline-primary" type="button" onClick={decAppleNum}>-</button>
                </div>
                <div>
                    
                    <input type="text" className="form-control increament_input" value={apple_num} onChange={handleAppleChange}/>
                    
                </div>
                <div class="input-group-prepend"><button class="btn btn-outline-primary" type="button" onClick={incAppleNum}>+</button>
                </div>
                </div>
                </div>  
                <br/><br/><br/>
         <><form onSubmit={paywithpaystack}>
     
            <input placeholder="momo number" type="text" className="form-control " value={phone_number} onChange={(e) => setPhone_number(e.target.value)} /><br /><br />
     
     
            <input placeholder="email" type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br />
     
            <input placeholder="message" type="text" className="form-control " value={message} onChange={(e) => setMessage(e.target.value)} /><br /><br />
     
     
            <input className="btn btn-outline-primary" type="submit" />
          </form></>
                
                </div>
                 
                
      </div>
      </div>
     </div> 
       
     

      }
      
      </div>
      
      )
  }
  
  

export default UserPage