export default {
  data () {
    return {
      productData: []
    }
  },
  created () {
    this.loadProductList()
  },
  methods: {
    async loadProductList () {
      const res = await this.$http.get('/goods', {
        params: {
          pagenum: 1,
          pagesize: 10
        }
      })
      this.productData = res.data.data.goods
    }
  }
}