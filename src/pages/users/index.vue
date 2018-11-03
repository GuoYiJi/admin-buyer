<style lang="scss" scoped>
  @import './index.scss';
</style>
<template>
  <div>
    <zan-tab
      :list="tab"
      :selected-id="selectedId"
      @tabchange="handleZanTabChange"
    >
    </zan-tab>
    <div class="tab-container" v-show="selectedId === tab.id" v-for="(tab, index) in tab" :key="index">
      <div class="van-cell-group van-hairline--top-bottom van-panel demo-panel" v-for="(item, subIndex) in tab.data" :key="item.id">
        <div class="van-cell van-panel__header">
          <div class="van-cell__title">
            <span>{{ item.nick || '该管理员未授权' }}</span>
            <div class="van-cell__label">{{ item.mobile }}</div>
          </div>
          <div class="van-cell__value">
            <span v-if="item.state === 1">已冻结状态</span>
            <span style="color: #010101;" v-else>正常</span>
          </div>
        </div>
        <div class="van-hairline--top van-panel__footer">
          <div>
            <span class="van-button van-button--default van-button--small" @click="handleUpdateStatus(item, subIndex)">
              <span class="van-button__text">{{ item.state == 0 ? '冻结' : '解冻' }}</span>
            </span>
            <span class="van-button van-button--danger van-button--small" @click="handleRemove(item, subIndex)">
              <span class="van-button__text">删除</span>
            </span>
          </div>
        </div>
      </div>
      <div class="navbar-b" @click="handleAdd">
        <div class="van-button van-button--warning van-button--normal van-button--bottom-action">
          <span class="van-button__text">添加管理员</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import wx from 'wx';
  export default {
    data() {
      return {
        selectedId: 'enable',

        tab: [
          {
            id: 'enable',
            title: '已授权',
            state: 0,
            data: []
          },
          {
            id: 'disable',
            title: '已冻结',
            state: 1,
            data: []
          }
        ]
      }
    },
    computed: {
      current() {
        const index = this.tab.findIndex(item => item.id === this.selectedId);
        return index !== -1 ? this.tab[index] : {};
      }
    },
    methods: {
      handleRemove(item, index) {
        wx.showModal({
          title: '删除管理员',
          content: `确认是否删除管理员${item.nick || ''}`,
          success: res => {
            if (res.confirm) {
              console.log('1')
              this.$API.delPrivilege({
                privilegeIds: item.id
              })
                .then(res => {
                  this.removeTabDataItem(index);
                })
            }
          }
        })
      },
      setTab(data) {
        const index = this.tab.findIndex(item => item.id === this.selectedId);
        if (index !== -1) {
          this.tab.splice(index, 1, {
            ...this.tab[index],
            ...data
          })
        }
      },
      
      removeTabDataItem(e) {
        const index = this.tab.findIndex(item => item.id === this.selectedId);
        if (index !== -1) {
          console.log(this.tab[index].data.filter((item, i) => i !== e), e)
          this.tab.splice(index, 1, {
            ...this.tab[index],
            data: this.tab[index].data.filter((item, i) => i !== e)
          })
        }
      },
      handleAdd() {
        this.$router.push({
          path: '/pages/users/add/index'
        })
      },

      handleZanTabChange(e) {
        let { detail: selectedId } = e.mp;
        if (selectedId === this.selectedId) return;
        this.selectedId = selectedId;
        this.fetch();
      },

      fetch() {
        wx.showLoading({
          title: '加载中'
        })
        try {
          
          this.$API.selectPrivilege({
            state: this.current.state
          })
            .then(data => {

              this.setTab({
                data: data.data
              })
            })
            .catch(res => {
              const { data } = res;
              wx.showModal({
                title: '提示',
                content: data.desc,
                confirmText: '知道了',
                showCancel: false,
                success: res => {
                  if (res.confirm) {
                    this.$router.back();
                  }
                }
              })
            })
            .finally(() => {
              wx.hideLoading();
            })
        } catch (err) {
          console.log(err);
        }
      },
      handleUpdateStatus(item, index) {
        const status_text = item.state === 0 ? '冻结' : '解冻';
        wx.showModal({
          title: '提示',
          content: `确认是否${status_text}管理员${item.nick || ''}`,
          success: res => {
            if (res.confirm) {

              this.$API.updateState({
                privilegeIds: item.id,
                state: item.state === 0 ? 1 : 0
              })
                .then(res => {
                  this.fetch();
                })
                .catch(err => {

                })
            }
          }
        })
      }
    },
    onShow() {
      this.fetch();
    },
    async mounted() {
    },
    onUnload() {
      Object.assign(this, this.$options.data());
    }
  }
</script>