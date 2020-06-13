const Util = jest.fn(()=>{
    console.log("Util")
});
Util.prototype.a = jest.fn(()=>{
    console.log("a")
});
Util.prototype.b = jest.fn(()=>{
    console.log("b")
});
export default Util;