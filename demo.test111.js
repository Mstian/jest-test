import { Demo,createObj,getData } from './demo.js';
import axios from 'axios';
jest.mock("axios");

test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    // fn.mockReturnValue("hello")
    fn.mockImplementation(()=>{
        return "N"
    })
    Demo(fn);
    Demo(fn);
    Demo(fn);
    // expect(fn).toBeCalled()
    // console.log(fn.mock);//mock的函数会有一个mock属性
    // expect(fn.mock.calls[0]).toEqual(['123'])
    // console.log(fn.mock.invocationCallOrder)
    // console.log(fn.mock.results);
    // expect(fn.mock.results[0].value).toBe("hello")
    console.log(fn.mock.results)
})
/*
{
    calls: [ [] ],
    instances: [ undefined ],
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
}
*/

// test.only('测试实例化对象指向',() => {
//     let fn = jest.fn();
//     createObj(fn);
//     console.log(fn.mock)
// })


test("测试 getData",async () => {
    axios.get.mockResolvedValue({data:"hello"})
    await getData().then((data)=>{
        expect(data).toBe("hello")
    })
    await getData().then((data)=>{
        expect(data).toBe("hello")
    })
})