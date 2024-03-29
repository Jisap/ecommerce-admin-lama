import React, { useEffect, useState } from 'react'
import { LoadToken } from '../../requestMethods';
import "./widgetLg.css"
import axios from 'axios';
import {format} from "timeago.js" // yarn add timeago.js

const WidgetLg = () => {

    const [orders, setOrders] = useState([]);
    
    useEffect(() => {
        const getOrders = async () => { //petición en http://localhost:5000/api/ + "orders" + token
            try{
                //const res = await userRequest.get("users/?new=true")
                let TOKEN = await LoadToken()
                const res = await axios.get('http://localhost:5000/api/orders',
                {
                    headers: { token: `Bearer ${TOKEN}` }
                }
                )
                setOrders( res.data.orders )
            }catch(error){ 
                console.log(error)
            }
        };
        getOrders()
    },[setOrders])


    const Button = ({ type }) => {
        return <button className={ "widgetLgButton " + type }>{ type }</button>
    }

    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Latest Transactions</h3>
            <table className="widgetLgTable">
              <thead>
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customer</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                </tr>
              </thead>
              <tbody>

                { orders.map(order => (

                <tr className="widgetLgTr" key={order._id}>
                    <td className="widgetLgUser">
                        {/* <img src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                             alt=""
                             className="widgetLgImg" /> */}
                        <span className="widgetLgName">{order.userId}</span>
                    </td>
                    <td className="widgetLgDate">{format(order.createdAt)}</td>
                    <td className="widgetLgAmount">{order.amount}</td>
                    <td className="widgetLgStatus">
                        <Button type={order.status}/>
                    </td>
                </tr>

                ))}

              </tbody> 
            </table>
        </div>
    )
}


export default WidgetLg
