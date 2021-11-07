import React, { useEffect, useState } from 'react'
import "./widgetSm.css";
import { Visibility } from "@material-ui/icons"
import { LoadToken } from '../../requestMethods';
import axios from 'axios';


const WidgetSm = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const getUsers = async () => { //petición en http://localhost:5000/api/ + query = "/user/?new=true" + token
            try{
                //const res = await userRequest.get("users/?new=true")
                let TOKEN = await LoadToken()
                const res = await axios.get('http://localhost:5000/api/users/?new=true',
                {
                    headers: { token: `Bearer ${TOKEN}` }
                }
                )
                setUsers( res.data.users )
            }catch(error){ 
                console.log(error)
            }
        };
        getUsers()
    },[setUsers])

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
              { users.map((user) => (
                <li className="widgetSmListItem" key={user._id}>
                    <img src={user.img || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} 
                        alt=""
                        className="widgetSmImg">
                    </img>
                    <div className="widgetSmUser">
                        <span className="widgetSmUsername">{user.name}</span>
                    </div>
                    <button className="widgetSmButton">
                        <Visibility className="widgetSmIcon"/>
                        Display
                    </button>
                </li>
              ))}
            </ul>
        </div>
    )
}



export default WidgetSm
