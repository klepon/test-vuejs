<template>
  <v-form class="layout justify-space-between">

    <v-flex class="xs7 sm4">
      <v-text-field
        :label="keywordPlaceholder"
        v-model="keyword"
        @keyup.native="keywordSearch"
      ></v-text-field>
    </v-flex>

    <v-flex class="xs5 sm4">
      <v-select
        :items="sortByList"
        v-model="sortBy"
        :label="sortByLabel"
        @change="doSorting"
      ></v-select>
    </v-flex>

    <!-- next feature: collapsible advance filter -->

  </v-form>
</template>

<script>
/* eslint-disable no-plusplus */

export default {
  name: 'ListingFilter',
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
      const filter = arg[0].split('~');
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
