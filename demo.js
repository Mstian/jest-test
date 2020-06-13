import axios from 'axios';
export function Demo(cb){
    cb("123");
}
export function createObj(classItem){
    var obj = new classItem();
    console.log(obj)
}

export function getData(){
    return axios.get('http://www.dell-lee.com/react/api/demo.json').then((response)=>{
        return response.data;
    })
}