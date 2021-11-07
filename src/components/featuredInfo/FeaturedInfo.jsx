import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./featuredInfo.css"
import { ArrowDownward, ArrowUpward } from "@material-ui/icons"
import { LoadToken } from '../../requestMethods';

const FeaturedInfo = () => {
                                               
    const [income, setIncome] = useState([]); // INGRESOS POR MES ACTUAL Y PREVIO 
    const [perc, setPerc] = useState(0);

    useEffect(() => {
       const getIncome = async () => { //petición en http://localhost:5000/api/ + "/orders/income" + token 
            try{
                let TOKEN = await LoadToken()
                const res = await axios.get('http://localhost:5000/api/orders/income',
                    {
                        headers: { token: `Bearer ${TOKEN}` }
                    }
                )
                setIncome(res.data.income);
                        //total de ventas mes actual-1     /  total ventas mes (actual-1)-1
                setPerc((res.data.income[1].total * 100) / res.data.income[0].total - 100);
            }catch(error){ 
                console.log(error)
            }
        };
        getIncome()
    }, [])

    console.log(income)

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revanue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">${income[1]?.total}</span>
                    <span className="featuredMoneyRate">
                        %{Math.floor(perc)}{" "} 
                        {perc < 0 ? (
                            <ArrowDownward className="featuredIcon negative"/>
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">Compare to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$4,415</span>
                    <span className="featuredMoneyRate">
                        -1.4 <ArrowDownward className="featuredIcon negative"/>
                    </span>
                </div>
                <span className="featuredSub">Compare to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Cost</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$2,225</span>
                    <span className="featuredMoneyRate">
                        +2.4 <ArrowUpward className="featuredIcon"/>
                    </span>
                </div>
                <span className="featuredSub">Compare to last month</span>
            </div>
        </div>
    )
}

export default FeaturedInfo
