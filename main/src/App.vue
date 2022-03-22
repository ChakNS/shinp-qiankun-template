<template>
  <div id="app">
    <ul>
      <li v-for="item in menus"><a class="menu" @click="active = item.value">{{item.label}}</a></li>
    </ul>
    <div id="micro-app" class="micro-app-container"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      active: ''
    }
  },
  computed: {
    menus() {
      let result = this.$microApps.appsInfo.filter(item => !item.hidden).map(item => ({
        label: item.alias,
        value: item.name,
        detail: item
      }))

      return result
    },
  },
  watch: {
    active(val) {
      this.$microApps.push(val)
    }
  }
}
</script>

<style>
#app .menu {
  cursor: pointer;
  color: blue;
}
#app .menu:hover {
  color: gray;
}
</style>
