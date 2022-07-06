import { ref } from 'vue';

const getSearch = () => {
    
    let search = ref('');

    const debounce = ( func , wait ) => {
        let timeout = null;
        return function(...args){
            console.log(args);
            let later = () => {
                timeout = null;
                func(args);
            }

            clearTimeout(timeout);
            timeout = setTimeout( later , wait );
        }
    }

    const handleSearch = () => {
        console.log(search.value)
    }
    
    
    return { search , handleSearch , debounce };
};

export default getSearch;