export const timer = function (fn){
    setTimeout(()=>{
        fn()
        setTimeout(()=>{
            fn()
        },3000)
    },3000)
}