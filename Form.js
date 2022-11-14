import React, {useState} from "react"



export default function DemoForm(){


  
  const[res1,setRes1]=useState("not set")
  const[res2,setRes2]=useState("not set")
 

  var username={neeraj:1234,raman:1111,ram:2222,shyam:3333}


    function result(e){
    let c=0
       
  for (let key in username) {
    
       
    if(key==res1 && username[key]==res2){
      // alert("login sucessufuly")
      
     
      window.location = '/welcome';
    }
    if(key==res1 && username[key]!=res2){
      alert("wrong password")
    }
    
    if(key!=res1 && username[key]==res2){
      alert("invlaid user")
    }
    // if(key!=res1 && username[key]!=res2){
    //   c++
    //  }
    //  if(c==res3){
     
    //   alert("please enter valid details")
    //  }
    }
    // console.log(Object.keys(username).length);
    
   
   // debugger;
  e.preventDefault();
}
function newuser(e){
  username[res1]=res2
  
}

   
  
  return (<div className="text-center">
  
 
  
    <input type="text" onChange={(e)=> setRes1(e.target.value)}  placeholder="username "/>

    <br/>
   
    <input type="text" onChange={(e)=> setRes2(e.target.value)}  placeholder="password" />
    <br/>
  <button onClick={result} >submit</button>
  <button onClick={newuser} >new login</button>



    </div>)
}