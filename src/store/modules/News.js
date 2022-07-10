import axios from "axios"

export default {
    state : {
        newsInPage : [],//for pagination
        allNews : null,//for all news in home page
        todayNews : [],//for today news in home page
        wroteNews : null,//for news in panel that wrote by reporter
        otherNews : [],//news in detail page to show as latest news
        news : {}, // to read in detail page
        totalPage : 1,
    },
    getters : {
        allNews(state){
            return state.allNews;
        },
        
        todayNews(state){
            return state.todayNews;
        },

        wroteNews(state){
            return state.wroteNews;
        },

        otherNews(state){
            return state.otherNews;
        },

        news(state){
            return state.news;
        },

        newsInPage(state){
            return state.newsInPage;
        },

        totalPage(state){
            return state.totalPage;
        },
    },
    mutations : {
        setWroteNews(state,datas){
            state.wroteNews = datas;
        },

        setTodayNews(state,datas){
            state.todayNews = datas;
        },

        setAllNews( state , datas){
            state.allNews = datas;
        },
        setNews( state , datas ){
            state.news = datas;
        },
        setOtherNews( state , datas ){
            state.otherNews = datas;
        },

        setNewsInPage( state , datas){
            state.newsInPage = datas;
        },

        setTotalPage( state , data ){
            state.totalPage = data;
        }
    },
    actions : {
        async getWroteNews({ commit },userId = 17){
            const res = await axios.get(`http://localhost:8080/hexa/api/users/${userId}/news`);

            // console.log(res.data)
            commit('setWroteNews',res.data);
        },

        async getTodayNews({ commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/news/today');

            commit('setTodayNews',res.data);
        },

         async getAllNews( { commit , dispatch }  , infos ){
            const res = await axios.get('http://localhost:8080/hexa/api/news');
            
            dispatch('getNewsInPage',{ allNews : res.data , pageFrom : infos.pageFrom , maxPerPage : infos.maxPerPage});
            
            commit('setTotalPage',Math.ceil(res.data.length/infos.maxPerPage));
            
            commit('setAllNews',res.data);
         },

         async getAllNewsForAdmin( { commit }){
            const res = await axios.get('http://localhost:8080/hexa/api/news');
            
            commit('setAllNews',res.data);
         },

         async getNews( { commit } , newsId ){
            const res = await axios.get(`http://localhost:8080/hexa/api/news/${newsId}`);

            commit('setNews' , res.data)
         },

         async getOtherNews( { commit } , restrictId ){
            const res = await axios.get('http://localhost:8080/hexa/api/news/latest');

            const result = res.data.filter(d => d.news_id != restrictId );
            commit('setOtherNews',result);
         },

        getNewsInPage({ commit } , { allNews , pageFrom , maxPerPage}){
            let start = (Number(pageFrom) - 1 ) * maxPerPage;
            let end = start + maxPerPage;

            let results = [];

            for(let i = start ; i < end ; i++ ){
                if(!allNews[i]) break;
                else results.push(allNews[i]);
            }

            commit('setNewsInPage',results);
         },
        
    }
}