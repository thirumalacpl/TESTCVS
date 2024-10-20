
const {add} = require('../server');

test('toBe', ()=>{
    expect(add(1,2).toBe(3))
})