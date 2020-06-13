jest.mock('./util.js',()=>{
    const Util = jest.fn(()=>{
        console.log("Util")
    });
    Util.prototype.a = jest.fn(()=>{
        console.log("a")
    });
    Util.prototype.b = jest.fn(()=>{
        console.log("b")
    });
    return Util;
});
import { demoFunction } from "./demoUtil.js";

import Util from './util.js';

test('测试demoFunction',() => {
    demoFunction();

    expect(Util).toHaveBeenCalled();
    // expect()
    expect(Util.mock.instances[0].a).toHaveBeenCalled();
    expect(Util.mock.instances[0].b).toHaveBeenCalled();
    console.log(Util.mock);
})