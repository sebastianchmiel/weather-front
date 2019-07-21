<template>
  <div class="box-white">
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
  .box-white {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #fff;
  }
  .box-white header {
    color: #888;
    font-size: 14px;
  }
  .box-white .content {
    font-weight: 900;
    font-size: 28px;
  }
</style>
