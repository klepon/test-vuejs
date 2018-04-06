<template>
  <b-form class="form-inline list-util">

    <b-form-input class="mr-2 mb-2"
      type="text"
      v-model="keyword"
      :placeholder="keywordPlaceholder"
      @keyup.native="keywordSearch" />

    <label class="ml-auto mr-2 mb-2 d-none d-sm-block">{{sortByLabel}}</label>
    <b-form-select class="mb-2"
      v-model="sortBy"
      :options="sortByList"
      @change.native="doSorting" />

    <!-- next feature: collapsible advance filter -->

  </b-form>
</template>

<script>
/* eslint-disable no-plusplus */

export default {
  name: 'listUtil',
  props: [
    'data',
    'updateData',
    'addItemButtonLink',
    'addItemButtonText',
    'keywordPlaceholder',
    'searchIn',
    'sortByLabel',
    'sortByList',
  ],
  data() {
    return {
      keyword: '',
      sortBy: this.sortByList[0].value,
    };
  },
  methods: {
    keywordSearch() {
      let i;
      let newItem;

      const newdata = [];

      this.data.map((item) => {
        newItem = {
          ...item,
          visible: false,
        };

        for (i = 0; i < this.searchIn.length; i++) {
          if (item[this.searchIn[i]].indexOf(this.keyword) >= 0) {
            newItem = {
              ...item,
              visible: true,
            };
          }
        }

        newdata.push(newItem);
        return true;
      });

      this.$emit('updateData', newdata);
    },

    doSorting(...arg) {
      const filter = arg[0].target.value.split('~');
      this.data.sort((a, b) => {
        if (filter[1] === 'asc') {
          if (a[filter[0]].toLowerCase() < b[filter[0]].toLowerCase()) return -1;
          if (a[filter[0]].toLowerCase() > b[filter[0]].toLowerCase()) return 1;
        } else {
          if (a[filter[0]].toLowerCase() > b[filter[0]].toLowerCase()) return -1;
          if (a[filter[0]].toLowerCase() < b[filter[0]].toLowerCase()) return 1;
        }

        return 0;
      });

      this.$emit('updateData', this.data);
    },
  },
};
</script>
