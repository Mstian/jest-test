import axios from 'axios';

// export const fetchData =(fn)=> {
//     axios.get("http://www.dell-lee.com/react/api/demo111.json")
//     .then((response)=>{
//         fn(response.data)
//     });
// }


export const fetchData =()=> {
    return axios.get("http://www.dell-lee.com/react/api/demo1.json")
}