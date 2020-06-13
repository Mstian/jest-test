import {fetchData} from './fetchData.js';
// test('测试fetchData函数返回结果为{success : true}',(done)=>{
//     fetchData((data)=>{
//         expect(data).toEqual({
//             success:true
//         })
//         done()
//     })
// })

// test("测试fetchDate返回结果是{success:true}",()=>{
//     return fetchData()
//     .then((response)=>{
//         expect(response.data).toEqual({
//             success:true
//         })
//     })
// })

// test("测试fetchData返回结果为404",()=>{
//     expect.assertions(1)
//     return fetchData()
//     .catch((e)=>{
//         expect(e.toString().indexOf('404')>-1).toBe(true)
//     })
// })

// test("测试fetchData返回结果为404",()=>{
//     return expect(fetchData()).resolves.toMatchObject({
//         data:{
//             success:true
//         }
//     })
// })

// test("测试fetchData返回结果为404",()=>{
//     return expect(fetchData()).rejects.toThrow()
// })





// test("测试fetchData返回结果为404", async ()=>{
//     await expect(fetchData()).resolves.toMatchObject({
//         data:{
//             success:true
//         }
//     })
// })



// test("测试fetchData返回结果为404", async ()=>{
//     await expect(fetchData()).rejects.toThrow()
// })

// test("测试fetchData返回结果包含data:{success:true}", async ()=>{
//     const data = await fetchData();
//     expect(data).toMatchObject({
//         data:{
//             success:true
//         }
//     })
// })

test("测试fetchData返回结果为404", async ()=>{
    expect.assertions(1);
    try{
        await fetchData();
    }catch(e){
        expect(e.toString()).toMatch("404")
    }    
})


