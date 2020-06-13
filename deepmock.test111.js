jest.mock('./deepmock.js');
// jest.unmock('./deepmock.js');
import { getData } from './deepmock.js';

const { getNum } = jest.requireActual('./deepmock.js');
// import axios from 'axios';
// jest.mock('axios');



test('getData',() => {
    // axios.get.mockResolvedValue('(function(){return "123"})()')
    return getData().then((data)=>{
        expect(data).toEqual('123')
    })
})

test('getNum',() => {
    expect(getNum()).toEqual(456)
})