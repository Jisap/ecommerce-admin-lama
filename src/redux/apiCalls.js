import { MultilineChart } from "@material-ui/icons";
import axios from "axios";
import { LoadToken, publicRequest } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async ( dispatch, user ) => {                      // Función que controla el login de un user, usa el dispatch  
                                                                        // para poder usar los métodos del reducer
    dispatch(loginStart());                                             // Bandera de comienzo: true
    try {
        const res = await publicRequest.post("/auth/login", user);      // Petición de logueo al backend con los datos del usuario, 
        dispatch( loginSuccess( res.data ));                            // Establece el estado del usuario logeado (currentUser), bandera: false
    } catch (error) {
        dispatch(loginFailure());                                       // Si hay error bandera: false y state.Error: true
    }
}

export const getProducts = async (dispatch) => {                        // Función para obtener los productos de la bd
                                                                        // Se usa el dispatch para poder usar los métodos del reducer
    dispatch(getProductStart());                                        // En este caso el getProductStart, success y failure si se da el caso
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {                            // Función para borrado de productos según id
  
  dispatch(deleteProductStart());
  try {                                                                           // Dejo comentado esto para evitar el borrado en pruebas
    // let TOKEN = await LoadToken()
    // const res = await axios.delete(`http://localhost:5000/api/products/${id}` ,
    //     {
    //         headers: { token: `Bearer ${TOKEN}` }
    //     }
    // )
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    //const res = await userRequest.post(`/products`, product);
    let TOKEN = await LoadToken()
    const res = await axios.post(`http://localhost:5000/api/products` ,product ,
         {
             headers: { 
              "Content-Type": "application/json", 
              token: `Bearer ${TOKEN}`,}
            
         }, 
    )
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};