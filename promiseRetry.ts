// ## 2. 三次重试

// 小明解开了升职加薪的秘密了之后，拿着密码去找老板，可是老板说，最近涨工资的服务器 API 接口有点不稳定，老是失败，叫小明自己想办法。
// 小明觉得不服，想着如果涨工资失败了，就多试几次，但如果一直失败的话，也就只好放弃了。
// 请你帮小明实现一个函数 retry，它的参数是另一个函数 job，job 函数调用后后会执行一些异步任务，并返回一个 Promise，但 job 所执行的异步任务有可能会失败。
// 当 retry 执行后会尝试调用 job，如果 job 返回成功 (即 Promise fulfilled)，retry 函数返回 job 函数的返回内容；
// 如果 job 返回失败 (即 Promise rejected)，retry 函数会再次尝试调用 job 函数。
// 如果 job 函数连续三次均返回失败，retry 则不再尝试调用，并返回其最后一次失败的内容。

/**
 * 三次重试
 * @param job {() => Promise<any>} 一个可能会失败的任务
 * @returns {Promise<any>} job 函数的返回结果
 */
function retry(job:() => Promise<any>): Promise<any> {
    // TODO: 在这里编写代码
    let lastError:any;
    let times:number = 3;

    return new Promise(function(resolve,reject) {
        const fn:() => void = () => {
            if (times === 0) {
                reject(lastError)
            }
            else {
                job().then(resolve).catch(
                    (error) => {
                        lastError = error;
                        times-=1;
                        fn();
                    }
                )
            }
        }
        fn();
    });
    // TODO: (可选) 完善 retry 函数的 TypeScript 类型定义
}

// TODO: 请对你编写的函数进行测试
// 你可以基于该模板编写测试用例，也可以使用自己喜欢的方式编写测试用例
// 你需要编写至少三个测试用例
test("测试正常功能", () => {
    retry(
        () => (
            new Promise((resolve,reject) => {
                const num = Math.ceil(Math.random()*10);
                if (num <=3) {
                    resolve(num);
                }
                else {
                    reject(num);
                }
            }) 
        )
    )
});

test("测试超时", () => {
    retry(
        () => (
            new Promise((resolve,reject) => {
                setTimeout(() => {

                },999999999)
            }) 
        )
    )
});

test("测试功能", () => {
    retry(
        () => (
            new Promise((resolve,reject) => {
                reject(null);
            }) 
        )
    )
});