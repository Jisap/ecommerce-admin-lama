import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import "./home.css" 
//import { userData } from "../../dummyData"
import Charts from '../../components/charts/Charts'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import { LoadToken } from '../../requestMethods'

const Home = () => {

     const [userStats, setUserStats] = useState([]);

     const MONTHS = useMemo(
            () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
            ],
        []
    );

    useEffect(() => {
       const getStats = async () => { //petición en http://localhost:5000/api/ + "/users/stats" + token 
            try{
                let TOKEN = await LoadToken()
                const res = await axios.get('http://localhost:5000/api/users/stats',
                    {
                        headers: { token: `Bearer ${TOKEN}` }
                    }
                )
            await (res.data.data).map( (item) => (                              // Devuelve total de ventas por mes
                setUserStats( prev => [                                         // Por cada usuario...
                    ...prev,
                    {name:MONTHS[item._id-1], "Active User": item.total}        // estableceremos el mes de la venta y el total 
                ] )                                                             // proporcionado por mongo
            ))
            }catch(error){ 
                console.log(error)
            }
        };
        getStats()
    }, [MONTHS])

    return (
        <div className="home">
            <FeaturedInfo />
            <Charts 
                title="User Analitycs"
                data={ userStats }
                dataKey="Active User"
                grid
            />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    )
}

export default Home
