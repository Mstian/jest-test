import axios from 'axios';
export const getData = () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json')
}

export const getNum = () => {
    return 456
}