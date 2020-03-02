function sum(input) {
    // TODO: 在这里编写代码
    const array = String.prototype.split.call(input, /,|\n/ig);
    const new_array = [];
    array.forEach(element => {
        new_array.push(parseInt(element.replace(/[^0-9]/ig, ""), 10));
    });

    return new_array.reduce(
        (result, element) => result += element % 2 === 0 ? 0 : element);
}


test("特殊符号", () => {
    assert(sum(`%%%1#123,12314534344,
    1231244as25254,
    5oddde!$^&*,6,
    zzzoo2%,`) === 1123);
});
test("空数空行", () => {
    assert(sum(`
    ,,
    
    1235
    4as3,    a,s
    
    `) === 1277);
});
test("大数相加", () => {
    assert(sum(`
    das14444444444444444444444444444444444444444444444444444441,
    asdf12414,
    4123
    `) === 5);
});