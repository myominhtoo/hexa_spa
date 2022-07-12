import axios from "axios"

export default {
    state : {
        cmtsInReporter : null,//in reporter panel when see cmts in reporter created
        cmtsInNews : null,//in reporter panel when see one news post' comment
        publicComments : [],
    },
    getters : {
        cmtsInReporter(state){
            return state.cmtsInReporter;
        },
        cmtsInNews(state){
            return state.cmtsInNews;
        },
        publicComments(state){
            return state.publicComments;
        }
    },
    mutations : {
        setCmtsInReporter(state,datas){
            state.cmtsInReporter = datas;
        },

        setCmtsInNews( state , datas ){
            state.cmtsInNews = datas.map(data => {
                return { comment_id : data.comment_id , comment : data.comments , commented_user : data.user_name , commented_date : data.commented_date };
            });
        },

        setPublicComments( state , datas ){
            state.publicComments = datas;
        }
    },
    actions : {
        async getCmtsInReporter({ commit } , userId = 17){
            const res = await axios.get(`http://localhost:8080/hexa/api/users/${userId}/news/comments`);
            commit('setCmtsInReporter',res.data);
        },

        async getCmtsInNews({ commit } , info ){
            console.log(info)
            const res = await axios.get(`http://localhost:8080/hexa/api/users/${info.userId}/news/${info.newsId}/comments`);

            commit('setCmtsInNews' , res.data);
        },

        async getPublicComments( { commit } , newsId ){
            const res = await axios.get(`http://localhost:8080/hexa/api/news/${newsId}/comments`);
            commit('setPublicComments',res.data);
        }
    }
}