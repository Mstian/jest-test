# jest 自动测试

### 安装
`npm install jest@24.8.0 -D`
jest使用需要模块化机制。
配置npm script命令，`package.json`文件配置：

```json
  "scripts": {
    "test": "jest --watch"
  },
```
单元测试：单个模块进行测试
集成测试：多个模块进行测试
jest配置: `npx jest --init`
jest配置文件：`jest.config.js` 参数：coverageDirectory：生成的覆盖率文件夹存档地址
代码测试覆盖率：使用jest测试过的代码占所需测试代码百分比 `npx jest --coverage` 生成`coverage`文件夹内部包含测试文件覆盖率文件

如何使用es6 module ？
使用babel ：`npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D`
jest默认使用commonjs规范，使用es6module运行过程为：

+ npm run jest 
+ jest(babel-jest)
+ 检测是否有安装babel模块
+ 在运行测试之前结合babel，先把代码进行一次转化
+ 运行转化过得测试用例代码

### 测试用例

**匹配器**
**真假相关**
**toBe()**：使用Object.is()实现精确匹配
**toEqual()**：递归检查对象或数组的每一个字段。
**toBeNull()**：判断是否为null
**toBeUndefined()**：判断是否是undefined
**toBeDefined()**：判断是否是定义过的
**toBeTruthy()**：判断是否为真
**toBeFalsy()**：判断是否为假
**not**：取反匹配器 expect(a).not.toBeFalsy()

**数字相关**
**toBeGreaterThan()**
**toBeLessThan()**
**toBeGreaterThanOrEqual()**
**toBeLessThanOrEqual();**
**toBeCloseTo(); 比较浮点数计算的时候**

```javascript
test("目标数是否大于某个数字",()=>{
    expect(12).toBeGreaterThan(13)
})
```

**字符串相关**
**toMatch()**:参数可以是=字符串也可以是正则
```javascript
test("判断字符串是否包含某内容",()=>{
    var str = 'abcde'
    expect(str).toMatch('a')
})
```
**数组 Set**
**toContain()**
```javascript
test("判断数组是否包含某项",()=>{
    var arr = [1,2,3];
    expect(arr).toContain(2)
})
```
**异常**
**toThrow()**：参数可以为字符串也可为正则
```javascript
const throwNewError = function(){
    throw new Error("this is an error")
}
test("抛出异常",()=>{
    expect(throwNewError).toThrow("this is an error");
})
```
### jest命令行

w 进入选择模式
f 只运行失败的测试
a 每次将所有的测试用例都跑一次
o 只运行修改之后的测试文件（多个文件时，需要配合git使用）
```json
  "scripts": {
    "test": "jest --watch" // watch表示默认开启o模式
  },
```
t 根据一个测试用例名字正则表达式来过滤需要run的测试用例（可以理解为过滤模式）

p 配合matchAll使用 根据文件名过滤掉不需要测试的文件

### 异步测试
**1. 回调类型异步函数测试**
`fetchData.js`

```javascript
export const fetchData =(fn)=> {
    axios.get("http://www.dell-lee.com/react/api/demo111.json")
    .then((response)=>{
        fn(response.data)
    });
}

```
`fetchData.test.js`
```javascript
import {fetchData} from './fetchData.js';
test('测试fetchData函数返回结果为{success : true}',(done)=>{
    fetchData((data)=>{
        expect(data).toEqual({
            success:true
        })
        done()
    })
})
```
注意点：需要在test方法第二个参数中传入done函数作为参数，并在异步方法执行完成之后再执行，即可正确进行异步测试。

**2. 直接返回promise对象异步测试**
`fetchData.js`
```javascript
export const fetchData =()=> {
    return axios.get("http://www.dell-lee.com/react/api/demo111.json")
}
```
`fetchData.test.js`

```javascript
test("测试fetchDate返回结果是{success:true}",()=>{
    return fetchData()
    .then((response)=>{
        expect(response.data).toEqual({
            success:true
        })
    })
})
```
注意点：当fetchData函数返回一个promise对象的时候必须将执行结果return出去。

案例：就需要判断必须是404

```javascript
test("测试fetchData返回结果为404",()=>{
    return fetchData()
    .catch((e)=>{
        expect(e.toString().indexOf('404')>-1).toBe(true)
    })
})
```
注意：当fetchData函数请求结果有正常数据，那么就不会走catch方法，也就不会走`expect(e.toString().indexOf('404')>-1).toBe(true)`测试，那么测试结果默认为通过。因此需要补一句`expect.assertions(1)`，表示，在下面必须再执行一条`expect`方法，否则就当该测试用例不通过。代码如下：
```javascript
test("测试fetchData返回结果为404",()=>{
    expect.assertions(1)
    return fetchData()
    .catch((e)=>{
        expect(e.toString().indexOf('404')>-1).toBe(true)
    })
})
```

+ **使用resolves + toMatchObject()匹配器测试**

```js
export const fetchData =()=> {
    return axios.get("http://www.dell-lee.com/react/api/demo.json")
}
```

```js
test("测试返回结果中是否包含data:{success:true}这个对象",()=>{
    return expect(fetchData()).resolves.toMatchObject({
        data:{
            success:true
        }
    })
})
```
注意：必须显式的return出结果，主要是判断fetchData返回结果中是否包含`data:{success:true}`这个对象。

+ **使用reject + toThrow()匹配器检测抛出异常**

```js
export const fetchData =()=> {
    return axios.get("http://www.dell-lee.com/react/api/demo1.json")
}
```

```js
test("使用toThrow()检测抛出异常",()=>{
    return expect(fetchData()).rejects.toThrow()
})
```

+ **使用async/await测试异步**
```js
export const fetchData =()=> {
    return axios.get("http://www.dell-lee.com/react/api/demo1.json")
}
```
```js
test("测试fetchData返回结果为404", async ()=>{
    await expect(fetchData()).resolves.toMatchObject({
        data:{
            success:true
        }
    })
})
```

```js
test("测试fetchData返回结果为404", async ()=>{
    await expect(fetchData()).rejects.toThrow()
})
```
注意：使用async/await可以代替使用return显示返回promise对象，但是需要注意的是async需要和await配合使用。

+ **使用await先获取代码执行结果再做后续判断**

```js
export const fetchData =()=> {
    return axios.get("http://www.dell-lee.com/react/api/demo.json")
}
```

```js
test("测试fetchData返回结果包含data:{success:true}", async ()=>{
    const data = await fetchData();
    expect(data).toMatchObject({
        data:{
            success:true
        }
    })
})
```
```js
test("测试fetchData返回结果为404", async ()=>{
    expect.assertions(1);
    try{
        await fetchData();
    }catch(e){
        expect(e.toString()).toMatch("404")
    }    
})
```
注意：在测试请求不通过的情况下需要使用try catch捕获错误，并且搭配expect.assertions()使用防止请求成功时不走catch逻辑，从而也显示测试通过。


### Jest钩子函数
**在jest执行过程中自动执行的函数**

`beforeAll()`：表示在所有测试用例执行之前执行一次。
`afterAll()`：表示在所有测试用例执行完成之后执行一次。
`beforeEach()`：表示在每个测试用例执行之前都会执行一次。
`afterEach()`：表示在每个测试用例执行完成之后都会执行一次。

**描述方法，可以归类所有的测试用例**

```js
describe('描述', () => {
    //测试用例
})
```
描述方法可以嵌套使用

```js
describe("测试用例", () => {
    describe("测试加法",() => {
        //所有关于加法的测试用例
    })
    describe("测试减法",() => {
        //所有关于减法的测试用例
    })
})
```
demo:
```js
//Counter.js

class Counter {
    constructor(){
        this.count = 1;
    }
    addOne(){
        this.count += 1;
    }
    minusOne(){
        this.count -= 1
    }
    addTwo(){
        this.count += 2;
    }
    minusTwo(){
        this.count -= 2
    }
}

export default Counter;
```
```js
Counter.test.js
import Counter from './Counter';
let counter = null;
beforeAll(() => {
    console.log("beforeAll")
})

beforeEach(() => {
    counter = new Counter();
    console.log("beforeEach")
})

afterEach(() => {
    console.log("afterEach")
})

afterAll(() => {
    console.log("afterAll")
})

describe("counter 测试代码", () => {
    describe("加法测试", () => {
        test('测试counter +1 ', () => {
            counter.addOne();
            expect(counter.count).toBe(2)
        })
        test("测试counter +2", () => {
            counter.addTwo();
            expect(counter.count).toBe(3)
        })
    })
    describe("减法测试", () => {
        test("测试counter -1 ", () => {
            counter.minusOne();
            expect(counter.count).toBe(0)
        })
        test("测试counter -2", () => {
            counter.minusTwo();
            expect(counter.count).toBe(-1);
        })
    })
})
```
**钩子函数的作用域**

每个`describe`方法都会对jest的钩子函数产生一个作用域。比如：
```js
describe("counter 测试", () => {
    beforeAll(() => {
        console.log("beforeAll")
    })
    
    beforeEach(() => {
        counter = new Counter();
        console.log("beforeEach")
    })
    
    afterEach(() => {
        console.log("afterEach")
    })
    
    afterAll(() => {
        console.log("afterAll")
    })
    
    describe("加法测试", () => {
        beforeAll(() => {
            console.log("beforeAll 加法测试")
        })
        beforeEach(() => {
            counter = new Counter();
            console.log("beforeEach 加法测试")
        })
        test('测试counter +1 ', () => {
            counter.addOne();
            expect(counter.count).toBe(2)
        })
        test("测试counter +2", () => {
            counter.addTwo();
            expect(counter.count).toBe(3)
        })
    })
    describe("减法测试", () => {
        test("测试counter -1 ", () => {
            counter.minusOne();
            expect(counter.count).toBe(0)
        })
        test("测试counter -2", () => {
            counter.minusTwo();
            expect(counter.count).toBe(-1);
        })
    })
})
```
描述为“加法测试”的describe中的钩子函数不会在“减法测试”中的describe去执行。
执行顺序为先执行外层的钩子函数，再执行内层的钩子函数，先执行`beforeAll()`钩子函数，再执行`beforeEach()`钩子函数。

注意：测试用例初始化准备的代码一般都写在钩子函数中，不能直接写在describe中，因为describe中的代码会优先于jest钩子函数执行。比如：

```js
describe("outer", ()=>{
    console.log("outer");
    beforeAll(()=>{
        console.log("outer beforeAll")
    })
    describe("inner",()=>{
        console.log("inner")
        beforeAll(()=>{
            console.log("inner beforeAll")
        }) 
        // ...test() 测试用例
    })
})
```
打印输出顺序为：outer -> inner -> outer BeforeAll -> inner beforeAll

**单个测试only**
如果只想对其中一个测试用例进行测试，而跳过其他测试用例可以使用`only`修饰符

```js
describe("加法测试", () => {
    beforeAll(() => {
        console.log("beforeAll 加法测试")
    })
    beforeEach(() => {
        counter = new Counter();
        console.log("beforeEach 加法测试")
    })
    test.only('测试counter +1 ', () => {
        counter.addOne();
        expect(counter.count).toBe(2)
    })
    test("测试counter +2", () => {
        counter.addTwo();
        expect(counter.count).toBe(3)
    })
})
```
此时只会执行“测试counter +1”这个测试用例，而跳过其他测试用例。

### Jest中的Mock
1. 使用`jest.fn`生成一个mock函数，可以用来测试一个函数是否执行（通过测试回调是否执行来测试）。
```js
// demo.js
export function Demo(cb){
    cb();
}
```

```js
// demo.test.js
import { Demo } from './demo.js';
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn()
    Demo(fn)
    expect(fn).toBeCalled()
})
```
使用`jest.fn()`生成一个mock函数，然后执行`Demo(fn)`，之后再使用`toBeCalled()`匹配器判断Demo函数中的回调函数是否执行，如果执行说明Demo函数正常执行，否则Demo函数中逻辑有错误。

mock函数能帮我们干什么？？？
+ 捕获函数的调用和返回结果以及this和调用顺序。
+ 可以让我们自由的设置返回结果
+ 改变函数的内部实现（比如只模拟axios发送请求，而不去测试返回结果）

```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn()
    Demo(fn)
    expect(fn).toBeCalled()
    console.log(fn.mock);//mock的函数会有一个mock属性,属性里面包括了fn被调用的情况
})
```
打印出结果为：
```js
{
    calls: [ [] ],
    instances: [ undefined ],
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
}
```
参数解读：
**calls**:数组，length,表示该fn被调用了几次，里面的每一项表示调用函数时，传入的参数，比如`calls:[["123"],["123"]]`表示`fn`被调用2次，每次调用的时候传递的参数都是“123”,举例：

```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn()
    Demo(fn);
    Demo(fn);
    expect(fn.mock.calls.length).toBe(2)
})
```
可以使用`fn.mock.calls.length`判断是否执行。
还可以判断调用参数是否是“123”:
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn()
    Demo(fn);
    Demo(fn);
    expect(fn.mock.calls[0]).toEqual(['123'])
})
```
**invocationCallOrder**:数组，表示被调用的顺序
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn()
    Demo(fn);
    Demo(fn);
    Demo(fn);
    console.log(fn.mock.invocationCallOrder)
})
```
输出[ 1, 2, 3 ]表示当执行3次`Demo(fn)`那么他会按照顺序执行。

**results**:数组，表示函数执行之后每次的返回值是什么
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn(()=>{
        return "456"
    })
    Demo(fn);
    Demo(fn);
    Demo(fn);
    console.log(fn.mock.results);
})
```
在jest.fn()中使用函数返回一个字符串“456”然后输出结果为
```js
[
      { type: 'return', value: '456' },
      { type: 'return', value: '456' },
      { type: 'return', value: '456' }
]
```
在给fn添加返回值时还有其他方法
使用`fn.mockReturnValueOnce(value)`api，表示模拟一个返回值，但只模拟一次。
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockReturnValueOnce("123")
    Demo(fn);
    Demo(fn);
    Demo(fn);
    console.log(fn.mock.results);
})
```
输出结果为：
```js
[
    { type: 'return', value: '123' },
    { type: 'return', value: undefined },
    { type: 'return', value: undefined }
]
```

可以使用这个方法模拟多次不同返回值：
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockReturnValueOnce("123");
    fn.mockReturnValueOnce("456");
    fn.mockReturnValueOnce("789");
    Demo(fn);
    Demo(fn);
    Demo(fn);
    console.log(fn.mock.results);
})
```
输出结果为：
```js
[
    { type: 'return', value: '123' },
    { type: 'return', value: '456' },
    { type: 'return', value: '789' }
]
```

也可以链式调用：
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockReturnValueOnce("123").mockReturnValueOnce("456").mockReturnValueOnce("789");
    Demo(fn);
    Demo(fn);
    Demo(fn);
    console.log(fn.mock.results);
})
```
如果每次只需要返回同一个值，可以使用刚才在`jest.fn()`中去封装一个方法，还可以使用`fn.mockReturnValue(value)`

```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockReturnValue("hello")
    Demo(fn);
    Demo(fn);
    Demo(fn);
    console.log(fn.mock.results);
})
```
输出结果为：
```js
[
    { type: 'return', value: 'hello' },
    { type: 'return', value: 'hello' },
    { type: 'return', value: 'hello' }
]
```

结合`fn.mock`的`results`属性可以写其他的测试用例了
比如：
```js
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockReturnValue("hello")
    Demo(fn);
    Demo(fn);
    Demo(fn);
    expect(fn.mock.results[0].value).toBe("hello");
})
```
测试结果为通过。

**instances**:数组，每项表示每次fn执行的时候fn中this指向。

```js
//demo.js
export function createObj(classItem){
    new classItem();
}
```
表示createObj方法接收一个类，在createObj方法中对类进行实例化。

```js
//demo.test.js
test.only('测试createObj方法',() => {
    let fn = jest.fn();
    createObj(fn);
    console.log(fn.mock)
})
```
输出结果为：
```javascript
{
    calls: [ [] ],
    instances: [ mockConstructor {} ],
    invocationCallOrder: [ 1 ],
    results: [ { type: 'return', value: undefined } ]
}
```
也就是表示`fn`方法中的`this`，指向的是`jest.fn()`的构造函数`mockConstructor`;

小总结：通过`jest.fn()`模拟出来的函数它有一个mock属性，mock属性中的`calls`表示该函数被调用的几次，以及每次传入的参数，`instances`表示该函数被调用的几次，以及每次调用该函数中this指向，`invocationCallOrder`表示该函数被调用的几次，以及调用顺序，`resultes`表示该函数被调用的几次，以及每次调用的返回值。

改变函数的内部实现指的是，比如前端在测试后台接口返回数据问题时，不必测试接口返回了什么东西，只需要测试，前端是否发送ajax请求即可，返回值可以前端自己模拟一下。核心api`mockResolvedValue`;

```javascript
//demo.js
export function getData(){
    return axios.get('http://www.dell-lee.com/react/api/demo.json').then((response)=>{
        return response.data;
    })
}
```
```javascript
//demo.test.js
import { getData } from "./demo.js";
import axios from "axios";
jest.mock("axios");

test.only("测试 getData",async () => {
    axios.get.mockResolvedValue({data:"hello"}) //模拟axios get返回值
    await getData().then((data)=>{
        expect(data).toBe("hello") //确认发起请求
    })
})
```
此段代码表示，使用`axios.get.mockResolvedValue({data:"hello"})`方法模拟了axios的get方法返回值，当调用`getData()`方法时，请求回来的结果不是从服务器异步获取到的，而是我们同步模拟的，因此可以节省时间，节省资源。

`axios.get.mockResolvedValue()`api也可以换成`axios.get.mockResolvedValueOnce()`,这个表示只模拟一次，当发起多个请求的时候就会报测试不通过。
比如：
```javascript
test.only("测试 getData",async () => {
    axios.get.mockResolvedValue({data:"hello"})
    await getData().then((data)=>{
        expect(data).toBe("hello")
    })
    await getData().then((data)=>{
        expect(data).toBe("hello")
    })
})
```
上面这段代码会通过测试。
下面这段代码不会通过测试。
```javascript
test.only("测试 getData",async () => {
    axios.get.mockResolvedValueOnce({data:"hello"})
    await getData().then((data)=>{
        expect(data).toBe("hello")
    })
    await getData().then((data)=>{
        expect(data).toBe("hello")
    })
})
```
总结mock函数的作用：
+ 1. 捕获函数的调用和返回结果，以及this和调用顺序。
+ 2. 它可以让我们自由地设置返回结果。
+ 3. 可以改变函数的内部实现。

补充mock函数的一些语法。。。

**改变函数返回值**
第一种方法：直接在`jest.fn()`中去实现
```javascript
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn(()=>{
        return "hello"    
    });
    Demo(fn);
    console.log(fn.mock.results)
})
```

第二种方法：使用fn.mockReturnValue()
```javascript
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockReturnValue("hello");
    Demo(fn);
    console.log(fn.mock.results)
})
```

第三种方法：使用fn.mockImplementation() 
```javascript
test("demo 中的回调是否执行" , () => {
    let fn = jest.fn();
    fn.mockImplementation(()=>{
        return "world"
    });
    Demo(fn);
    console.log(fn.mock.results)
})
```
还有fn.mockImplementationOnce()表示只模拟一次。

`mockImplementationOnce()`比较`mockReturnValue()`前者可以在里面的函数中去做一些其他逻辑操作，而后者只是一个返回结果。

**返回this方法**

```javascript
fn.mockImplementationOnce(()=>{
    return this;
})
```
或者
```javascript
fn.mockReturnThis()
```

**toBeCalledWith()匹配器**

```
expect(fn.mock.calls[0].toEqual(["abc"]))
```
等价于
```
expect(fn).toBeCalledWith("abc")
```
区别是前者表示第一次调用fn的参数是abc，后者表示每次调用fn参数都是abc

vsCode插件jest，可以不用手动去执行`npm run test`。这个插件会自动去检测测试用例是否执行成功，并且会给与提示。


### Snapshot(快照测试)
**基础使用**
在测试配置文件的时候，当频繁修改配置文件时，需要同步更新测试文件，为了避免这种情况，可以使用快照匹配器。
```javascript
//snap.js
export const generateConfig = function(){
    return {
        name:"lisa",
        age:19,
        sex:"male",
        couple:true
    }
}
```
```javascript
//snap.test.js
import { generateConfig } from './snap.js';
test("测试配置文件",()=>{   
    expect(generateConfig()).toMatchSnapshot();
})
```
快照测试过程：
第一次执行测试命令时生成一个和配置文件一样的快照文件（__snapshots__），对比快照文件和配置文件，相同则表示测试通过。
当修改配置文件之后，再执行测试命令，会拿新的配置文件快照去和之前的快照做对比，如果相同则通过测试，否则不会通过。
不会通过的时候会提示具体的原因，可以使用jest命令行w查看所有的指令，之后使用u,再用新的配置文件快照去更新快照，这样再去进行测试。

当有多个配置文件需要进行快照测试时，使用u会更新所有的配置文件方法，因此可以使用i，每次只提示一个配置文件方法，然后使用u去更新当前快照，之后在重复循环执行i->u即可实现每次只修改一个文件机制。

当一个配置文件中有日期（new Date()）时，内次更新快照和之前的date都不一样，所以，这种情况下如下处理：

```javascript
export const generateConfig = function(){
    return {
        name:"lisa",
        age:40,
        sex:"female",
        couple:true,
        date:new Date()
    }
}
```
```javascript
test("测试generateConfig配置文件",()=>{   
    expect(generateConfig()).toMatchSnapshot({
        date:expect.any(Date)
    });

})
```
在toMatchSnapshot()匹配器中传入一个对象参数，表示，date字段只要是Date类型即可，不需要完全相等。

**行内snapshot**

需要安装`prettier`模块
`npm install prettier@1.18.2 --save`

```javascript
import { generateConfig } from "./snap.js";
test("测试generateConfig配置文件", () => {
  expect(generateConfig()).toMatchInlineSnapshot(
    {
      date: expect.any(Date)
    }
  );
});
```
使用toMatchInlineSnapshot()匹配器，执行测试命令之后，会将生成的快照自动在toMatchInlineSnapshot()中的第二个参数展示。

```javascript
test("测试generateConfig配置文件", () => {
  expect(generateConfig()).toMatchInlineSnapshot(
    {
      date: expect.any(Date)
    },
    `
    Object {
      "age": 40,
      "couple": true,
      "date": Any<Date>,
      "name": "lisa",
      "sex": "female",
    }
  `
  );
});
```
行内快照（toMatchInlineSnapshot）与普通快照（toMatchSnapshot）的区别就是行内快照生成快照文件存放在测试文件里，而普通快照是将快照文件生成一个新的文件夹存放。

命令行s是跳过当前错误提示，直接到下一个提示。

### mock深入学习

在之前学习过异步测试可以通过模拟返回值进行测试

```javascript
// deepmock.js
import axios from 'axios';
export const getData = () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json')
}
```

```javascript
// deepmock.test.js
import axios from 'axios';
jest.mock('axios');
test('getData',() => {
    axios.get.mockResolvedValue({data:"123"})
    return getData().then((data)=>{
        expect(data.data).toEqual('123')
    })
})
```
现在可以模拟一个专门用来模拟异步请求方法的文件：
在根目录下创建一个文件夹`__mocks__`,里面写一个和需要测试的文件完全一样的名称比如 `deepmock.js`里面可以模拟异步请求
```javascript
// __mocks__/deepmock.js
export const getData = () => {
    return new Promise((resolved,rejected)=>{
        resolved("123")
    })
}
```
在deepmock.test.js中这么测试
```javascript
jest.mock('./deepmock.js');
import { getData } from './deepmock.js';
test('getData',() => {
    return getData().then((data)=>{
        expect(data).toEqual('123')
    })
})
```
第一步模拟文件，第二步导入文件，此时导入的`deepmock.js`文件是`__mocks__/deepmock.js`文件,然后进行测试。

如果将`jest.config.js`中`automock`属性设置为true,那么相当于默认进行mock，可以不用写`jest.mock('./deepmock.js')`.

如果`deepmock.js`中有同步代码，不需要放在`__mocks__`文件夹中的`deepmock.js`中时，可以使用`const { getNum } = jest.requireActual('./deepmock.js')`来实现引用源文件中的`getNum`，而不使用模拟文件中的`getNum`.

比如：
```javascript
//deepmock.js
import axios from 'axios';
export const getData = () => {
    return axios.get('http://www.dell-lee.com/react/api/demo.json')
}

export const getNum = () => {
    return 456
}
```

```
//__mocks__/deepmock.js
export const getData = () => {
    return new Promise((resolved,rejected)=>{
        resolved("123")
    })
}
```

```javascript
//deepmock.test.js
jest.mock('./deepmock.js');
import { getData } from './deepmock.js';
const { getNum } = jest.requireActual('./deepmock.js');
test('getData',() => {
    return getData().then((data)=>{
        expect(data).toEqual('123')
    })
})
test('getNum',() => {
    expect(getNum()).toEqual(456)
})j
```
test文件中异步方法`getData`引用的是`__mocks__/deepmock.js`中的方法，而同步方法`getNum`引用的是根目录下`deepmock.js`中的方法。

小总结：
`jest.mock("文件路径")`：模拟该文件中的方法。对应在`__mocks__/文件路径`下。
`jest.unmock("文件路径")`：可以取消模拟文件。
`requireActual`：表示可以引用真实文件中的方法，而非模拟文件中的。


### jest中的timer测试

根据之前学习可以测试延时代码如下：
```javascript
//timer.js
export const timer = function (fn){
    setTimeout(()=>{
        fn()
    },3000)
}
```
```javascript
//timer.test.js
import {timer} from './timer.js';
test("timer", (done) => {
    timer(()=>{
        expect(1).toBe(1);
        done();
    })
})
```
这样表示等3s之后会执行一部中的测试语句，问题来了，如果延时为很长时间的话，使用等待时间这种机制不是很好，那么就需要另外一种方法：使用假的定时器。

方法：`jest.useFakeTimers()`
```javascript
//timer.test.js
jest.useFakeTimers();
test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(1)
})
```
使用`jest.useFakeTimers()`，表示开始使用假的定时器，之后配合`jest.runAllTimers()`表示立即运行玩所有的定时器。再配合`toHaveBeenCalledTimes(1)`匹配器，表示fn方法被调用了几次，来进行测试。注意：`fn`必须是一个mock函数，否则会报错。


假如`timer.js`是这样

```javascript
//timer.js
export const timer = function (fn){
    setTimeout(()=>{
        fn()
        setTimeout(()=>{
            fn()
        },3000)
    },3000)
}
```
` jest.runAllTimers()`表示运行所有的timer，假如只想检测外层的`setTimeout()`那么这个方法是不行的，可以使用`jest.runOnlyPendingTimers()`表示只会运行处于当前运行处于队列中即将运行的timer,而不会运行那些还没有被创建的timer。代码如下：

```javascript
jest.useFakeTimers();
test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.runOnlyPendingTimers()
    expect(fn).toHaveBeenCalledTimes(1)
})
```
小总结：
`runAllTimers()`:表示运行所有的timer
`runOnlyPendingTimers()`：表示只运行当前队列中的timer，而不管还未创建的。

更好的api：`jest.advanceTimersByTime(3000)`表示让时间快进3s。
```javascript
//timer.test.js
import {timer} from './timer.js';
jest.useFakeTimers();
test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
})
```
很明显快进3s之后，回调函数fn只执行了一次，因此`expect(fn).toHaveBeenCalledTimes(1)`测试会通过。
如果将修改一下参数`jest.advanceTimersByTime(6000)`，那么回调fn被执行了两次，因此想要通过测试必须修改断言`expect(fn).toHaveBeenCalledTimes(2)`

```javascript
//timer.test.js
import {timer} from './timer.js';
jest.useFakeTimers();
test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(6000)
    expect(fn).toHaveBeenCalledTimes(2)
})
```
或者

```javascript
test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(2)
})
```
表示快进3s后fn被调用1次，再快进3s后fn被调用2次。那就存在一个问题，每一次快进是在前一次快进基础上进行调用的有可能会有冲突，那么解决办法就是在钩子函数中进行处理。

```javascript
beforeEach(()=>{
    jest.useFakeTimers();
})

test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(2)
})

test("test1 timers",()=>{
    const fn = jest.fn();
    timer(fn);
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(2)
})
```
每次在进入测试之前都重新`jest.useFakeTimers()`即可。

### ES6中类的测试
**单元测试：**表示只仅仅对单一一个文件或方法进行测试，从而忽略掉该文件中引用的其他内容，如果其他内容比较耗费性能，那么在进行单元测试的时候进行mock简化引用。
举例：在一个方法文件中引用了一个类。然后对该方法进行单元测试。
```javascript
//util.js (ES6类)
class Util {
    a(){
        //...逻辑复杂，耗费性能
    }
    b(){
        //...逻辑复杂，耗费性能
    }
}
export default Util
```
Util类中有两个方法，都很耗性能，逻辑也很复杂。

```javascript
//demoUtil.js
import Util from './util.js';

export const demoFunction = () => {
    let util = new Util();
    util.a();
    util.b();
}
```
在demoUtil文件中引用了这个Util类，并且使用了。

```javascript
//demoUtil.test.js
jest.mock('./util.js');
/*
    Util Util.a Util.b jest.fn()
*/
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
```
在`demoUtil.test.js`文件中对`demoFunction`进行测试，此时由于Util中类逻辑复杂耗费性能，那么我们需要采取mock对其进行模拟，只需要判断在`demoFunction`方法中`Util`类，以及它的实例化方法调用了没有即可。

这段代码流程解释一下就是：
`jest.mock('./util.js')`：当`jest.mock()`中的参数检测到是一个类时，那么就会直接默认将类，以及里面的方法转换成mock函数，例如：` Util` ,`Util.a`,`Util.b`都将会转换成`jest.fn()`;
引入`Util`,此时的`Util`已经转换成了`jest.fn()`,那么此时就可以采用`Util.mock`下的一些属性进行测试啦。

还有一种办法就是，直接在`__mocks__`文件夹中自己去模拟实现一下`jest.mock()`方法的内部实现。

```javascript
//__mocks__/util.js
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
```
这样就相当于把`jest.mock("./util")`,自动转换过程手写了一遍，这样做比较优雅，而且还可以对方法进行拓展，写一些逻辑。

还可以直接在`demoUtil.test.js`中直接写
```javascript
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
```
在jest.mock()第二个参数中可以放刚才自动转换的逻辑。

单元测试就是指只对我自身做一些测试，集成测试是指对我自身以及自身其他依赖一起做测试。

### jest中对dom节点测试

node环境中是没有dom的，jest在node环境下自己模拟了一套dom的api，jsDom。
需要对dom操作为了方便，安装jquery依赖。
看下面例子：

```javascript
//dom.js
import $ from "jquery";
export const addDivToBody = () => {
    $('body').append("<div/>")
}
```

```javascript
//dom.test.js
import {addDivToBody} from './dom';
import $ from 'jquery';
test("addDivToBody",() => {
    addDivToBody();
    addDivToBody();
    expect($('body').find("div").length).toBe(2)
})  
```




































