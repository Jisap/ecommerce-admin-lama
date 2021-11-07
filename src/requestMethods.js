
import axios from 'axios';

const BASE_URl = "http://localhost:5000/api/";
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken 

export const publicRequest = axios.create({
    baseURL: BASE_URl,
});

export const LoadToken = async() => {
    let res = await JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken
    return res      
}

// export const TOKEN = LoadToken()
//     .then( (data) => {  
//         console.log(data)
//         return data
//     })
//     //.catch(error => console.log(error))
    

// export const userRequest = axios.create({
//     baseURL: BASE_URl,
//     headers: { token: `Bearer ${TOKEN}` },
// });

