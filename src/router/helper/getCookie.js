

const getCookie = () => {
    
    const data = document.cookie == ""  || null
                 ? ""
                 :  document.cookie.split("; ")
                    .map(d => {
                        return d.split("=");
                    }).reduce((prev,cur) => {
                        prev[decodeURIComponent(cur[0].trim())] = decodeURIComponent(cur[1].trim());
                        return prev;
                    } , {})
    return data;
}

export default getCookie;