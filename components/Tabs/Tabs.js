// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
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
    handleTabItemChange (e) {
      // console.log(e.currentTarget.dataset.index)
      const {index} = e.currentTarget.dataset
      this.triggerEvent("changeTabItemActive", {index})
    }
  }
})
