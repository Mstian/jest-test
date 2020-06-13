import Counter from './Counter';
let counter = null;

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
        test.only('测试counter +1 ', () => {
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

