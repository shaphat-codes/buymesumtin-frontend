import React, {useContext, useEffect, useState } from "react"
import AuthContext from '../context/AuthContext'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

import Spinner from 'react-bootstrap/Spinner'

import {Link} from 'react-router-dom'

const ProfilePage = () => {
  let {user, logoutUser} = useContext(AuthContext)


  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [show_withdraw, setShow_Withdraw] = useState(false)
  const [showWhithdrawalHistory, setShowWithdrawalHistory] = useState(false)
  const [showTotalWithdrawn, setShowTotalWithdrawn] = useState(false)
  const [showBalance, setShowBalance] = useState(false)


  const handleClose = () => setShow(false);
  const handleWithdrawClose = () => setShow_Withdraw(false)
  const handleWithdrawalHistoryClose = () => setShowWithdrawalHistory(false)
  const handleShow = () => setShow(true);
  const handleShow_Withdraw = () => setShow_Withdraw(true)
  const handleShowWithdrawalHistory = () => setShowWithdrawalHistory(true)



  const [userr, setUserr] = useState()
  const [id, setId] = useState()
  const [slug, setSlug] = useState()
  const [profile_photo, setProfilePhoto] = useState()
  const [photo, setPhoto] = useState()
  const [photoUpdate, setphotoUpdate] = useState()
  const [titleUpdate, setTitleUpdate] = useState()
  const [descriptionUpdate, setDescriptionUpdate] = useState()
  
  const [total_amount, setTotalAmount] = useState()
  const [apple_total, setApple_Total] = useState()
  const [supports, setSupports] = useState()


  //TRANSFERS

  const [recipient_code, setRecipientCode] = useState()
  const [withdrawalAmount, setWithdrawalAmount] = useState()
  const [withdrawalStatus, setWithdrawalStatus] = useState()
  const [withdrawalList, setWithdrawalList] = useState()
  const [withdrawalTotal, setWithdrawalTotal] = useState()
  const [balance, setBalance] = useState()


  const [isLoading, setIsLoading] = useState(false);

  const userPageGet = async () => {
      
    const response = await fetch('http://127.0.0.1:8000/page-list',
    {
     method: 'GET',
     credentials: "include",
     headers: {
       "Content-Type": "application/json",
      },
       
   }
   )
   
   //console.log(response.status)
   const data = await response.json() 
   //console.log(data)
   

   //console.log(data[0].id)
   setId(data[0].id)
   setSlug(data[0].slug)
   setUserr(data[0].user)
   setPhoto(data[0].profile_photo)
   //console.log(data.user)
 }

  
 let formData = new FormData();
  formData.append("file", profile_photo);
  formData.append("upload_preset", "buymeanapple")
  

  const PageUpdate = async (e) => {

    const response =  await fetch(`https://api.cloudinary.com/v1_1/dmdf71t0f/image/upload`,{
      method: "POST",
      
      
     headers: {
      
       
      },
      
      
      body:formData
    })

    let data = await response.json()
    setphotoUpdate(data.secure_url)
    console.log(data.secure_url)
    alert("photo updated. PLease click on APPLY to save changes.")
  }

  
  const PageUpdate_v2 = async (e) => {
    setIsLoading(true)
    const response =  await fetch(`http://127.0.0.1:8000/page-create/${user.user.pk}`,{
      method: "PUT",
      
      
     headers: {
      
       "Content-Type": "application/json"
      },
      
      
      body:JSON.stringify({
       "profile_photo": photoUpdate 
        
    })
  })
    let data = await response.json()
    setIsLoading(false)
    if (response.status == "500"){
      alert("Please upload photo before you apply changes")
    } else {
      alert("photo updated successfully")
    }
    console.log(data) 
  }




  const userpage = async () => {
      
      
    const response = await fetch(`http://127.0.0.1:8000/${user.user.username}`,
    {
     method: 'GET',
     credentials: "include",
     headers: {
       "Content-Type": "application/json",
      },
       
   }
   )
   
   console.log(response.status)
  
  
   
   const data = await response.json() 
   console.log(data)
   

   //console.log(data)
   
   setProfilePhoto(data.profile_photo)
  
   console.log(data.user)
 }
  
  const userPaymentGet = async () => {
      
    const response = await fetch(`http://127.0.0.1:8000/support/user-payment-list/${user.user.pk}`,
    {
     method: 'GET',
     credentials: "include",
     headers: {
       "Content-Type": "application/json",
      },
       
   }
   )
   
   //console.log(response.status)
   const data = await response.json() 
   //console.log(data)
   setSupports(data)
    
   // Total amount
    let amount_total = 0;
    for (var i = 0; i < data.length; i++) {
           amount_total = amount_total + parseFloat(data[i].amount_received);
         }
   //console.log(amount_total)
   setTotalAmount(amount_total)

   //console.log(data)


   //Total apples
   let apple_total = 0;
   for (var i = 0; i < data.length; i++) {
    apple_total = apple_total + data[i].number_of_apples;
   }
  //console.log(apple_total)
   setApple_Total(apple_total)

 }


 //WITHDRAWALS

 // List Of Banks
 const ListBanks = async () => {
    const response = await fetch(`https://api.paystack.co/bank?currency=GHS&type=mobile_money`,{
      method: "GET",
      
      headers:{
        "Content-Type": "application/json",
        "Authorization": "Bearer pk_test_0019a4e3acb7a9886c8c65386a5be0619de6223e",
      }
    })

    const data = await response.json()
    //console.log(data)
 }

 //Creating receipient

 const Receipient = async () => {
  const response = await fetch(`https://api.paystack.co/transferrecipient`,{
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk_test_ff6da6f1a15dbc14e2eb995db694bb824e3679c2",

    },

    body:JSON.stringify({
      "type": "mobile_money", 
      "name": user.user.username, 
      "account_number": "0551911595", 
      "bank_code": "MTN", 
      "currency": "GHS"
      
  })
  })

  const data = await response.json()
  //console.log(data)
  setRecipientCode(data.data.recipient_code)
 }


 //initiate transfer
 

 const createWithdrawal = async () => {
  const response = await fetch(`https://buymeanapple.herokuapp.com/withdrawal/`,{
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",

    },

    body:JSON.stringify({
      "user": user.user.pk,
      "amount": withdrawalAmount
      
  })
  })

  const data = await response.json()
  //console.log(data)
  
 }




 const initiateTransfer = async () => {
  const response = await fetch(`https://api.paystack.co/transfer`,{
    method: "POST",
    
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer sk_test_ff6da6f1a15dbc14e2eb995db694bb824e3679c2",

    },

    body:JSON.stringify({
      "source": "balance", 
      "amount": withdrawalAmount, 
      "recipient": "RCP_ngj4s2o8ss2cfo0", 
      "reason": "Holiday Flexing" 
      
  })
  })

  const data = await response.json()
  //console.log(data.status)

  ///// verified withdrwal
  if (data.status == true){
    createWithdrawal()
    alert("withdrwal went through!")
  } else{
    alert("sorry! We do not support withdrawals at the moment")
  }
  
 }


 /// withdrawal history
 const getWithdrawals = async () => {
  const response = await fetch(`https://buymeanapple.herokuapp.com/withdrawal-list/`,{
    method: "GET",
    
    headers:{
      "Content-Type": "application/json",
    }
  })

  const data = await response.json()
  console.log(data)
  setWithdrawalList(data)

  let withdrawalTotal = 0;
    for (var i = 0; i < data.length; i++) {
           withdrawalTotal = withdrawalTotal + parseFloat(data[i].amount);
         }
   //console.log(amount_total)
   setWithdrawalTotal(withdrawalTotal)

}
 
    const total_balance = () => {
      let total_left = 0
       total_left = total_amount - withdrawalTotal
      setBalance(total_left)

    }
 
 

  

 
  

  useEffect(() => {
    total_balance()
    getWithdrawals()
    Receipient()
    ListBanks()
    //initiateTransfer()
    userPaymentGet()
    userPageGet()
    userpage()
    //createWithdrawal()
  }, [])

  
  
    return (
      <div class="container">
   <div class="row">
      <div class="col-md-12">
         <div id="content" class="content content-full-width">
            
            <div class="profile">
               <div class="profile-header">
                  
                  <div class="profile-header-cover"></div>
                  
                  <div class="profile-header-content">
                     
                     <div class="profile-header-img">
                        <img height="115px" src={`${profile_photo}`} alt="" title=""/>
                     </div>
                     
                    
                     <div class="profile-header-info">
                        <h4 class="m-t-10 m-b-5">{user.user.username}</h4>
                        <p class="m-b-10">{user.user.email}</p>
                        <a class="btn btn-sm btn-info mb-2"  onClick={handleShow_Withdraw} >Withdraw Funds</a>
                        
                     </div>
                     
                  </div>
                  
                  
                  <ul class="profile-header-tab nav nav-tabs">
                     <li class="nav-item"><a variant="primary" onClick={handleShow}>My Page</a></li>
                     <li class="nav-item"><a variant="primary" onClick={handleShowWithdrawalHistory}>Withdrawal history</a></li>
                     
                     
                     
                     
                  </ul>
                  
               </div>
            </div>
            
            
            <div class="profile-content">
              
               <div class="tab-content p-0">
               {supports && supports.map((support, index) => (
                  <React.Fragment key={index}>
                  <div class="tab-pane fade active show" id="profile-post">
                     
                     <ul class="timeline">
                        <li>
                         
                           <div class="timeline-time">
                              <span class="date">today</span>
                              <span class="time">04:20</span>

                           </div>
                           
                           <div class="timeline-icon">
                              <a href="javascript:;">&nbsp;</a>
                           </div>
                           
                           
                           <div class="timeline-body">
                              <div class="timeline-header">
                                 <span class="userimage"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt=""/></span>
                                 <span class="username"><p>GHS {support.amount}</p>  </span>
                                 <span class="pull-right text-muted"><small>{support.email}</small></span><br/>
                                 <span class="pull-right text-muted"></span>
                              </div>
                              <div class="timeline-content">
                                 <p><strong>
                                 {support.message}
                                 </strong></p>
                              </div>
                              
                              <div class="timeline-footer">
                                 <p href="javascript:;" class="m-r-15 text-inverse-lighter"><p class="fa fa-thumbs-up fa-fw fa-lg m-r-3"></p><span><small>{support.phone_number}</small></span></p>
                                 
                              </div>
                              
                                 
                                 
                              
                           </div>
                           
                        </li>

  
                     </ul>


                    
                  </div>
                  
                  </React.Fragment>))}
                  
               </div>
               
            </div>
            
         </div>
      </div>
   </div>
   
   <div>

   

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>UPDATE PROFILE PHOTO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>upload photo</Form.Label>
              <Form.Control
                type="file"
                name = "profile_photo"
                files={profile_photo}
                onChange={(e) => setProfilePhoto(e.target.files[0])}
                
              />
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              
            </Form.Group>
            <Button variant="secondary" onClick={PageUpdate}>
            Upload
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        {isLoading ? <Spinner animation="border" variant="light" /> : <p></p>}
          <Button variant="primary" onClick={PageUpdate_v2}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showWhithdrawalHistory} onHide={handleWithdrawalHistoryClose}>
        <Modal.Header closeButton>
          <Modal.Title>Withdrawal History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {withdrawalList && withdrawalList.map((withdrawal, index) => (
        <React.Fragment key={index}>
          <hr/>
          <h4>Amount: <span><p>GHs {withdrawal.amount}</p></span></h4>
          <h3/>
          </React.Fragment>
        ))}
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      </Modal>
      



      <Modal show={show_withdraw} onHide={handleWithdrawClose}>
        <Modal.Header closeButton>
          <Modal.Title>Initiate Withdrawal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Amount GHS</Form.Label>
              <Form.Control
                type="number"
                name = "withdrawFunds"
                value = {withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                
              />
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              
            </Form.Group>
            <Button variant="primary" onClick={initiateTransfer}>
            Withdraw
          </Button>
          </Form>
        </Modal.Body>
        
         
      </Modal>

      
      
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Amount Earned
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>GHS  {total_amount}</strong>
        </Modal.Body>
      </Modal>



      <Modal
        size="sm"
        show={showTotalWithdrawn}
        onHide={() => setShowTotalWithdrawn(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Total Withdrawn
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>GHS  {withdrawalTotal}</strong>
        </Modal.Body>
      </Modal>


      <Modal
        size="sm"
        show={showBalance}
        onHide={() => setShowBalance(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Balance
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <strong>GHS  {total_amount-withdrawalTotal}</strong>
        </Modal.Body>
      </Modal>



      


      
      
   </div>
   
</div>
    )
  }
  

export default ProfilePage