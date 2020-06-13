import {addDivToBody} from './dom';
import $ from 'jquery';
test("addDivToBody",() => {
    addDivToBody();
    addDivToBody();
    expect($('body').find("div").length).toBe(2)
})  