import React from 'react'
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
//import { productRows } from "../../dummyData"; //Filas de productos
import { Link } from 'react-router-dom';
import "./productList.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from '../../redux/apiCalls';

const ProductList = () => {

    //const[ data, setData ] = useState( productRows );
    const products = useSelector((state) => state.product.products); // Estado de productos
    
    const dispatch = useDispatch()  // Hook para poder usar los métodos del reducer contenidos en el apicall getProducts
    
    useEffect(() => {
        getProducts(dispatch)        // Cada vez que se carga este componente cargamos los productos 
    }, [dispatch])
    
    const handleDelete = ( id ) => {
        //setData( data.filter((item) => item.id !== id)); // Excluimos de data aquellos items cuya id coincida con el id seleccionado
         deleteProduct(id, dispatch);
    }

    const columns = [
        { field: 'id', 
          headerName: 'ID',
          width: 220 },
        {
            field: 'product',
            headerName: 'Product',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img className="productListImg" src={params.row.img} alt="img" />
                        { params.row.title }
                    </div>
                )
            }
        },
        {
            field: 'instock',
            headerName: 'Stock',
            width: 200,
            editable: true,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 200,
            editable: true,
        },
        { 
            field: 'action',
            headerName: "Action",
            width:150,
            renderCell: ( params ) => {
                return(
                    <>
                        <Link to={ "/product/" + params.row._id }>
                            <button className="productListEdit">Edit</button>
                        </Link>
                            <DeleteOutline className="productListDelete" onClick={() => handleDelete( params.row._id )}/>
                    </>
                )
            }
        }
        
    ];


    return (
        <div className="productList">
            <DataGrid
                rows={ products }                   // Vienen del state, esto se considera "params"
                columns={ columns }                 // Las columns se definen con los "params"
                getRowId={ ( row ) => row._id }
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

export default ProductList
