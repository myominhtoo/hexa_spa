import axios from "axios"

export default {
    state : {
        user : {},
        users : [],
        emails : [],
        userInfo : {},//from cookie
        isLogin : false,
    },
    getters : {
        user(state){
            return state.user;
        },
        users(state){
            return state.users;
        },
        emails( state ){
            return state.emails;
        },
        userInfo( state ){
            return state.userInfo;
        },

        isLogin( state ){
            return state.isLogin;
        }
    },
    mutations : {
        setUsers(state,datas){
            state.users = datas;
        },

        setEmails( state , datas ){
            state.emails = datas;
        },

        setUserInfo( state , data ){
            state.userInfo = data;
        },

        setIsLogin( state , status ){
            state.isLogin = status;
        },

        unsetUserInfo(state , data ){
            state.userInfo = data;
        }
    },
    actions : {
        async getUsers({ commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/users');

            commit('setUsers',res.data);
        },

        async getEmails( { commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/emails');

            let email = res.data.map( d => {
                return d.user_email;
            });            

            commit('setEmails', email );
        },
        getUserInfo( { commit } ){

            let cookie = document.cookie;
            let data = "";

            if(cookie == "" || cookie == null){
                data = "";
            }else{
                data = document.cookie.split("; ").map( ele => {
                    return ele.split("=");
                }).reduce( ( prev , cur ) => {
                    prev[decodeURIComponent(cur[0].trim())] = decodeURIComponent(cur[1].trim());
                    return prev;
                } , {} )  
            
            }
                
            commit('setIsLogin', data == "" ? false : true );
            commit('setUserInfo',data);
        },

        removeUserInfo({ commit } , infos ){
            for(let info in infos){
                document.cookie = `${info}=; Max-Age=-999999; expires=Thu, 01 Jan 1970 00:00:00 GMT; `;
            }
            commit('unsetUserInfo',"");
            commit('setIsLogin',false)
        },
    }
}