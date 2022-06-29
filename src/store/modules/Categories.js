import axios from "axios"

export default {
    state : {
        categories : []
    },
    getters : {
        categories(state){
            return state.categories;
        }
    },
    mutations : {
        setCategories(state,datas){
            state.categories = datas;
        }
    },
    actions : {
        async getCategories({ commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/categories');
            // console.log(res.data)
            commit('setCategories',res.data);
        }
    }
}