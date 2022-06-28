<template>
    <nav id="admin-sidebar" class="w-15 bg-dark shadow-thm position-fixed p-0 m-0">
        <router-link to="/admin" id="sidebar-title" class="h5 thm fw-bold text-center py-3 mb-3 text-decoration-none ">
            Dashboard
        </router-link>

        <div  id="sidebar-links" class="d-flex flex-column w-100 py-0  px-1 m-0 text-start">
            <router-link to="/admin/users" class="w-100 py-2 px-2 txt-light" id="sidebar-link"><i class="fa-solid fa-users mx-2"></i>Users</router-link>
            <router-link to="/admin/news" class="w-100 py-2 px-2 txt-light" id="sidebar-link"><i class="fa-brands fa-neos mx-2"></i>News</router-link>
            <router-link to="/admin/createnews" class="w-100 py-2 px-2 txt-light" id="sidebar-link"><i class="fa-solid fa-circle-plus mx-2"></i>Create News</router-link>
            <router-link to="/admin/categories" class="w-100 py-2 px-2 txt-light" id="sidebar-link"><i class="fa-solid fa-layer-group mx-2"></i>Categories</router-link>
            <router-link to="/admin/newscomments" class="w-100 py-2 px-2  txt-light" id="sidebar-link"><i class="fa-solid fa-comments mx-2"></i>Comments</router-link>
            <router-link to="/" class="w-100 py-2 px-2 txt-light " id="sidebar-link"><i class="fa-solid fa-globe mx-2"></i>Public Panel</router-link>
        </div>

        <footer id="sidebar-footer">
            <span class="txt-light" >Created By Hexa_Group</span>
        </footer>
    </nav>
</template>

<style scoped>
#admin-sidebar{
    position: relative;
    height:100vh !important;
}


#admin-sidebar:hover{
    cursor: pointer;
}

#sidebar-title{
    display: block;
    border-bottom: 0.5px solid rgba(245, 197, 125,0.55);
    transition: 0.5s all;
}

#sidebar-title:hover{
    border-bottom:0.5px dashed rgba(245, 197, 125,0.55);
}


#sidebar-link{
   transition:0.5s all;
   text-decoration: none;
   font-weight: normal;
}

#sidebar-link:hover{
    background: rgba(245, 197, 125,0.1);
}

#sidebar-footer{
    position: absolute;
    left:10px;
    bottom:10px;
}

#sidebar-footer *{
    font-size: 13px;
}
</style>