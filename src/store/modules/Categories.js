import axios from "axios"

export default {
    state : {
        categories : null,
        fullCategories : null,
    },
    getters : {
        categories(state){
            return state.categories;
        },

        fullCategories( state ){
            return state.fullCategories;
        }
    },
    mutations : {
        setCategories(state,datas){
            state.categories = datas;
        },

        setFullCategories( state , datas ){
            state.fullCategories = datas;
        },

        unsetCategories( state , datas ){
            state.categories = datas;
        },

        unsetFullCategories( state , datas ){
            state.fullCategories= datas;
        }
    },
    actions : {
        async getCategories({ commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/categories');
       
            commit('setCategories',res.data);
        },

        async getFullCategories( { commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/fullcategories');
            commit('setFullCategories' , res.data);
        },

        removeCategories({ commit }){
            commit('unsetCategories', null );
        },

        removeFullCategories( { commit }){
            commit('unsetFullCategories' , null);
        }
    }
}