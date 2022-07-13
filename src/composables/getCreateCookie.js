import getSecret from '@/composables/getSecret.js';

//keys mean key , datas mean => datas[key] = value 
const getCreateCookie = ( data = {}) => {
    const { decode , encode } = getSecret();

    for(let d in data){
       let key = d == "user_password" ? "code" :d ;
       let value = d == "user_password" ? encode(encode(data[d])) : encode(data[d]);

        document.cookie = `${key}=${value}`;
       
    }
            
}

export default getCreateCookie;