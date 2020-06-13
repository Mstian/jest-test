

// test('测试5与5是否相等',()=>{
//     // 匹配器
//     expect(5).toBe(5); //toBe machers Objetc.is()
// })

// test("测试对象内容是否相等",()=>{
//     const a = {one:123};
//     expect(a).toEqual({one:123})
// })

// test("判断是否为null",()=>{
//     expect(null).toBeNull();
// })

// test("判断是否为undefined",()=>{
//     expect(undefined).toUndefined();
// })

// test("判断是否定义过",()=>{
//     const a = 123;
//     expect(a).toBeDefined()
// })

// test("判断是否为真",()=>{
//     const a = 123;
//     expect(a).toBeTruthy()
// })

// test("判断是否为假",()=>{
//     const a = 2;
//     expect(a).not.toBeFalsy()
// })


// test("判断数字是否大于指定数字",()=>{
//     const a = 10;
//     expect(a).toBeGreaterThan(9)
// })


// test("判断数字是否小于指定数字",()=>{
//     const a = 10;
//     expect(a).toBeLessThan(11)
// })

// test("判断数字是否大于或等于指定数字",()=>{
//     const a = 10;
//     expect(a).toBeGreaterThanOrEqual(10)
// })

// test("判断数字是否小于或等于指定数字",()=>{
//     const a = 10;
//     expect(a).toBeLessThanOrEqual(9)
// })


// test("比较浮点数",()=>{
//     const a = 0.1;
//     const b = 0.2;
//     expect(a+b).toBeCloseTo(0.3)
// })


// test("是否含有某字符串",()=>{
//     const a = "https://www.tianleilei.cn";
//     expect(a).toMatch("leilei")
// })

test("是否含有某字符串",()=>{
    const a = "https://www.tianleilei.cn";
    expect(a).toMatch(/leilei/)
})

test("数组是否包含",()=>{
    const a = [1,2,3,4];
    expect(a).toContain(2)
})
const throwNewError = function(){
    throw new Error("this is an error")
}


test("抛出异常",()=>{
    expect(throwNewError).toThrow("this isddd an error");
})


//安装jest npm install jest@24.8.0 -D
//jest使用需要模块化。
//配置npm script命令

//单元测试：单个模块进行测试
//集成测试：多个模块进行测试
//jets配置 npx jest --init
//jest.config.js jest测试配置文件
//代码测试覆盖率：使用jest测试过的代码占所需测试代码百分比 npx jest --coverage

//如何使用es6 module 

//使用babel npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D

//运行机制
//npm run jest 
//jest(babel-jest)
//检测是否有安装babel模块
//在运行测试之前结合babel，先把代码进行一次转化
//运行转化过得测试用例代码

//测试用例

//匹配器

//真假相关
//toBe() 使用Object.is()实现精确匹配
//toEqual() 递归检查对象或数组的每一个字段。
//toBeNull() 判断是否为null
//toBeUndefined() 判断是否是undefined
//toBeDefined() 判断是否是定义过的
//toBeTruthy() 判断是否为真
//toBeFalsy() 判断是否为假
// not 取反匹配器 expect(a).not.toBeFalsy()

//数字相关
//toBeGreaterThan()
//toBeLessThan()
//toBeGreaterThanOrEqual()
//toBeLessThanOrEqual();
//toBeCloseTo(); 比较浮点数计算的时候


//字符串相关
//toMatch()

//数组 Set
//toContain()


//异常
//toThrow()

//jest命令行
//w
//f
//o



