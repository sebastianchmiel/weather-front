<template>
  <div class="box-transparent">
    <header>{{title}}</header>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

export default {
  props: ['title'],
}
</script>

<style>
  .box-transparent {
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 15px;
  }
  .box-transparent header {
    color: #888;
    font-size: 14px;
  }
  .box-transparent .content {
    font-weight: 900;
    font-size: 28px;
  }
</style>
