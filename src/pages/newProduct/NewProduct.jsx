import React, { useState } from 'react'
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import "./newProduct.css"
import app from '../../firebase';
import { useDispatch } from "react-redux";
import { addProduct } from '../../redux/apiCalls';


const NewProduct = () => {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const dispatch = useDispatch();

    const handleChange = (e) => {
        setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };

    const handleClick = (e) => {
        e.preventDefault();
        const fileName = new Date().getTime() + file.name;          // Creamos un nombre único para cada imagen
        const storage = getStorage(app);                            // Definimos nuestra base de datos de firebase                   
        const storageRef = ref(storage, fileName);                  // ubicación específica en la base de datos donde se guarda el file
        const uploadTask = uploadBytesResumable(storageRef, file);  // Datos del archivo subidos al firebase

        uploadTask.on(          // Se observará el estado de esta tarea de subida
            "state_changed",    // cada vez que cambie (subida de datos)
            (snapshot) => {     // se generará un snapshot
            
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;   // porcentaje de subida 
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {                           // Si el estado de snapshot recibe la prop "paused"
                case "paused":                                      // mensaje
                    console.log("Upload is paused");
                    break;
                case "running":                                     // Si el estado de snapshot recibe la prop "running"
                    console.log("Upload is running");               // mensaje
                    break;
                default:
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                
                getDownloadURL(uploadTask.snapshot.ref)                                     // Promesa finalización de la subida
                    .then((downloadURL) => {                                                // Si todo fue bien recibiremos la URL del file
                        const product = { ...inputs, img: downloadURL, categories: cat };   // Crearemos el producto con el contenido del form
                        addProduct(product, dispatch);                                      // Lo añadiremos a la store
                    });
            }
    );
    
    
    }

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Product</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])} // Esto genera un file que se utilizará en el handleclick
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Apple Airpods"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                        <input
                            name="desc"
                            type="text"
                            placeholder="description..."
                            onChange={handleChange}
                        />
                </div>
                <div className="addProductItem">
                    <label>Price</label>
                            <input
                                name="price"
                                type="number"
                                placeholder="100"
                                onChange={handleChange}
                            />
                </div>
                <div className="addProductItem">
                    <label>Categories</label>
                        <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
                </div>
                <div className="addProductItem">
                    <label>Stock</label>
                        <select name="inStock" onChange={handleChange}>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
    


export default NewProduct
