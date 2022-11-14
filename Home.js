import { Link } from "react-router-dom"


export default function Home(){
    return(<>
    <div className="card text-center">
  <div className="card-header">
 
    Featured
  </div>
  <div className="card-body">
    <h5 className="card-title">Special title treatment</h5>
    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
    
    <ul>
       
    <li><Link to="form" className="btn btn-primary">login</Link></li>
   
    </ul>
  </div>
  <div className="card-footer text-muted">
    2 days ago
  </div>
</div>
    </>)
}