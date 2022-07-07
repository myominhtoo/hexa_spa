
const getSecret = () => {
    const encode  = ( input )  => {
        return window.btoa(input);
    }

    const decode = ( input ) => {
        let result ;
        if(input != "" || typeof input != 'undefined'){
           result =  window.atob( input );
        }
        return result;
    }

    return { encode , decode };
}

export default getSecret;