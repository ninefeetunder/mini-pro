// components/Upimg/Upimg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleDeleteImg () {
      const {index} = this.properties
      this.triggerEvent('deleteImg', {index})
    }
  }
})
