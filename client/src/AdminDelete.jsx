import axios from "axios";

function AdminDelete(id){

    axios.delete(`http://localhost:5000/adminDelete/${id}`)
    
      return <h1>YES!</h1>;
    
}

export default AdminDelete;