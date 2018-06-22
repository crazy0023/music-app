<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif" alt="">
        <p class="desc">{{title}}</p>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '正在加载....'
        }
    }
}
</script>

