// import '@babel/polyfill';

const add = () => {
    return 1223
}

const pro = new Promise(res => {
    setTimeout(() => {
        console.log('peomise完成')
        res()
    }, 1200)
})

console.log(pro)