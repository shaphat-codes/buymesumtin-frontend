<Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div class ="container">
{ noUser  ?
        <Redirect to =""/>
       :<div class="row">
            
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
               <h2>{name}</h2>
           </div>
           
           <div class="fb-profile-block-menu">
               
               <div class="block-menu">
                   <ul>
                       <li onClick={home}><Link to = "/">Home</Link></li>
                       
                       
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
       Buy khal <br/>an apple 🍎 to show <br/>your love 🧡 <br/>and support 🚀 </h2>
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
</div> }
      </div>

        </Modal.Body>
      </Modal>