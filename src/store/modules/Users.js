import axios from "axios"

export default {
    state : {
        user : {},
        users : [],
    },
    getters : {
        user(state){
            return state.user;
        },
        users(state){
            return state.users;
        }
    },
    mutations : {
        setUsers(state,datas){
            state.users = datas;
        }
    },
    actions : {
        async getUsers({ commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/users');

            // console.log(res.data);

            commit('setUsers',res.data);
        }
    }
}