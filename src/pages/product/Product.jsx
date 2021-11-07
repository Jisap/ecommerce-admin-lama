import "./product.css";
import Chart from "../../components/charts/Charts"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { LoadToken } from "../../requestMethods";
import axios from 'axios';


const Product = () => {

    const location = useLocation();                     // Devuelve el objeto de ubicación que contiene información sobre la URL actual
    const productId = location.pathname.split("/")[2]   // Seleccionamos la id del pathname
    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId) // Buscamos en el state el producto seleccionado
    );

    const [pStats, setPStats] = useState([]); // Estado para las estadísticas de productos
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
    const getStats = async () => { //INGRESOS POR MES ACTUAL Y PREVIO
      try {
        //const res = await userRequest.get("orders/income?pid=" + productId);
        let TOKEN = await LoadToken()
        const res = await axios.get(('http://localhost:5000/api/orders/income?pid='+productId), // Petición a la bd, puede llevar o no
            {                                                                                     // el productId
                headers: { token: `Bearer ${TOKEN}` }
            }
                )
        const list = await res.data.income.sort((a,b)=>{     // Ordenamos los resultados de mayor a menor
            return a._id - b._id                // Si a-b > 0 -> a>b -> índice asignado a b menor que el de a
        })
        list.map((item) =>                      // mapeamos los resultados ordenados
          setPStats((prev) => [                 // Establecemos el estado de las estadísticas del producto
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  
    return (
       
       <div className="product">

    {/* Título + boton de crear producto */}   
           <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
    
    {/* Gráfica de producto + info */}  
      <div className="productTop">
      
          <div className="productTopLeft">
              <Chart 
                data={pStats} 
                dataKey="Sales" 
                title="Sales Performance"
              />
          </div>
          
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={ product.img } alt="" className="productInfoImg" />
                  <span className="productName">{ product.title }</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">{product._id}:</span>
                      <span className="productInfoValue">123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue">{product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>

      {/*Actualización datos producto */}
      <div className="productBottom">
          <form className="productForm">
              
              <div className="productFormLeft">

                  <label>Product Name</label>
                  <input type="text" placeholder={ product.title } />
                  <label>Product Description</label>
                  <input type="text" placeholder={ product.desc } />
                  <label>Price</label>
                  <input type="text" placeholder={ product.price } />
                  
                  <label>In Stock</label>
                  <select name="inStock" id="idStock">
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>

              </div>

              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={ product.img } alt="" className="productUploadImg" />
                      <label htmlFor="file">
                          <Publish/>
                      </label>
                      <input type="file" id="file" style={{display:"none"}} />
                  </div>
                  <button className="productButton">Update</button>
              </div>
              
          </form>
      </div>
    </div>
    )
}

export default Product
