<template>
    <div id="comment" class="w-100 shadow-sm p-2 px-3 my-2">
        <div id="comment-control">
            <div class="dropdown">
                <i class="fa-solid fa-ellipsis-vertical txt-dark" data-bs-target="dropdown" data-bs-toggle="dropdown"></i>

                <ul class="dropdown-menu p-0 m-0" style="transform:translateX(-100%) !important;">
                    <li class="dropdown-item">Edit</li>
                    <li class="dropdown-item">Delete</li>
                </ul>
            </div>
        </div>
        <div id="comment-info" class="d-flex gap-2 align-items-center">
            <img src="../../assets/logo.png" alt="image" style="width:40px;height:40px;border-radius:100%;box-shadow:0 0 2.5px rgba(0,0,0,0.75)"/>
            <div id="person-info" class="d-flex flex-column align-items-start ">
                <span id="name" class="fw-bold thm">Name</span>
                <span id="date" class="fw-bold thm">2022-1-2</span>
            </div>
        </div>
        <div id="comment-content">
            <p class="txt-dark text-start">Lorem ipsum dolor sit.</p>
        </div>
    </div>
</template>