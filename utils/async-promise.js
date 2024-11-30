const to = (promise)=>{
    return promise
            .then((response)=>response.data)
            .catch((err)=>{
                throw new Error(err.response.data.message);
            })
}

export {to}