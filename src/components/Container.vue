<template>
  <div class="container">
    <slot name="header"></slot>
    <div class="container-body"></div>
    <slot name="footer"></slot>
  </div>
</template>
<script>
export default {
  name: 'Container'
}
</script>

