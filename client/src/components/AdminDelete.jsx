import axios from "axios";

const SERVER = process.env.NODE_ENV === "production" ? (process.env.REACT_APP_SERVER || "http://localhost:5000") : "http://localhost:5000";

function AdminDelete(id){

    axios.delete(`${SERVER}/admindelete/${id}`)
    
      return <h1>YES!</h1>;
    
}

export default AdminDelete;