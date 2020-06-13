import { generateConfig } from "./snap.js";
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
// test("测试generateAnotherConfig配置文件",()=>{
//     expect(generateAnotherConfig()).toMatchSnapshot();
// })
