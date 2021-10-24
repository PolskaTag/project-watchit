import {useEffect, useState } from 'react'
import axios from 'axios'


function AdminUpdate(props) {
    
    const [users, setUsers] = useState([])
    
    
        axios.put("http://localhost:5000/adminupdate", {
            
        
        
        });
    


    return users;
}

export default AdminUpdate;