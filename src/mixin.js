export default {
  methods: {
    toOpen (name) {
      this[name] = true
    },
    toClose (name) {
      this[name] = false
    },
    toRoute (path, params = {}) {
      if (path === 'home/addShop/addShop') {
        this.$router.push({path: '/pages/' + path, query: {isAddVideo: true}})
        return
      }
      this.$router.push({path: '/pages/' + path, query: params})
    },
    select (name, value) {
      this[name] = value
    },
    handleError (msg) {
      this.$Message({
        content: msg,
        type: 'error'
      })
    }
  }
}
