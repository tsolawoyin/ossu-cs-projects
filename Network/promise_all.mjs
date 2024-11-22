
let promise = x => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (x) resolve(x);
            else reject(x);
        }, 1000)
    })
}

let arr = [1, 2, 3, "hi", 5, 5, 6, 994, 45596, 56556n, ,].map(e => promise(e));


const Promise_all = async (promises) => {
    let arr = [];
    for (let i = 0; i < promises.length; i++) {
        let res = await promises[i];
        if (res) arr.push(res);
        else return "failed"
    }
    return arr;
}

Promise_all(arr).then(e => console.log(e))


//  *  Author's solution  *

function Promise_all(promises) {
    return new Promise((resolve, reject) => {
        let results = [];
        let pending = promises.length;
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(result => {
                results[i] = result;
                pending--;
                if (pending == 0) resolve(results);
            }).catch(reject);
        }
        if (promises.length == 0) resolve(results);
    });
}


