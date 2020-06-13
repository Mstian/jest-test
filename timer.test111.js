import {timer} from './timer.js';

// test("timer", (done) => {
//     timer(()=>{
//         expect(1).toBe(1);
//         done();
//     })
// })

beforeEach(()=>{
    jest.useFakeTimers();
})

test("test timers",()=>{
    const fn = jest.fn();
    timer(fn);
    // jest.runAllTimers();
    // jest.runOnlyPendingTimers()
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(2)
})

test("test1 timers",()=>{
    const fn = jest.fn();
    timer(fn);
    // jest.runAllTimers();
    // jest.runOnlyPendingTimers()
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(1)
    jest.advanceTimersByTime(3000)
    expect(fn).toHaveBeenCalledTimes(2)
})