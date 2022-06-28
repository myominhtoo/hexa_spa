import axios from "axios"

export default {
    state : {
        allNews : [],
        todayNews : [],
        wroteNews : [],
        otherNews : []
    },
    getters : {
        allNews(state){
            return state.allNews;
        },
        
        todayNews(state){
            return state.todyNews;
        },

        wroteNews(state){
            return state.wroteNews;
        },

        otherNews(state){
            return state.otherNews;
        }
    },
    mutations : {
        setWroteNews(state,datas){
            state.wroteNews = datas;
        }
    },
    actions : {
        async getWroteNews({ commit },userId = 17){
            const res = await axios.get(`http://localhost:8080/hexa/api/users/${userId}/news`);

            console.log(res.data)
            commit('setWroteNews',res.data);
        }
    }
}