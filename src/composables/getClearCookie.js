const getClearCookie = ( infos ) => {
    for(let info in infos){
        document.cookie = `${info}=; Max-Age=-999999; expires=Thu, 01 Jan 1970 00:00:00 GMT; `;
    }
}

export default getClearCookie;