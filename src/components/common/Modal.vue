<template>
    <div class="modal fade" :id="id">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content p-3">
                <header class="modal-head d-flex justify-content-between">
                    <p class="h4 text-danger fw-bold">{{ title }}</p>
                    <i class="fa-solid fa-circle-xmark text-danger h4" data-bs-dismiss="modal" :data-bs-target="'#'+id" ></i>
                </header>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name : "Modal",
    props : {
        id : {
            type : String,
            default : "",
        },
        title : {
            type : String , 
            default : "",
        }
    }
}

</script>
