<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination mt-2 justify-content-center">
      <li :class="`page-item ${disableClass('first')}`">
        <a class="page-link" :href="projectPageUrl(1)" v-on:click="selectPage(1)">
          <span class="d-flex align-items-center">
            <icon name="angle-double-left" class="mr-2"></icon>
            <span>{{e('first')}}</span>
          </span>
        </a>
      </li>

      <li :class="`page-item ${activeClass(page)}`" v-bind:key="page"
        v-for="page in getPages()"
        v-if="showPage(page)"
      >
        <a class="page-link" :href="projectPageUrl(page)" v-on:click="selectPage(page)">{{page}}</a>
      </li>

      <li :class="`page-item ${disableClass('last')}`">
        <a class="page-link" :href="projectPageUrl(getPages())" v-on:click="selectPage(getPages())">
          <span class="d-flex align-items-center">
            <span>{{e('last')}}</span>
            <icon name="angle-double-right" class="ml-2"></icon>
          </span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
/* eslint-disable no-plusplus */
import componentText from './pagination.lang';
import buttonIcon from '../widget/ButtonIcon';

export default {
  name: 'Pagination',
  components: {
    buttonIcon,
  },
  props: ['currentPage', 'perpage', 'total', 'setPage'],
  data() {
    return {
      maxPageItem: 5,
    };
  },
  // computed: { // kenapa error, canot find getPages() :()
  //   getPages() {
  //     return Math.ceil(this.total / this.perpage);
  //   },
  // },
  methods: {
    e(copy) {
      return this.$kpUtils.getTextByLang(componentText, copy);
    },
    getPages() {
      return Math.ceil(this.total / this.perpage);
    },
    getMin() {
      const padding = Math.floor(this.maxPageItem / 2);
      let min = (this.currentPage + 1) - padding;
      min = min < 1 ? 1 : min;
      min = min + (this.maxPageItem - 1) > this.getPages() ? this.getPages() - (this.maxPageItem - 1) : min;

      return min;
    },
    getMax() {
      const max = this.getMin() + (this.maxPageItem - 1);

      return max > this.getPages() ? this.getPages() : max;
    },
    showPage(page) {
      // console.log(page, page >= this.getMin() && page <= this.getMax());
      return page >= this.getMin() && page <= this.getMax();
    },
    selectPage(page) {
      this.$emit('setPage', page - 1);
    },
    projectPageUrl(page) {
      return `${this.$kpUtils.routerUrl.Project.path}${this.$kpUtils.routerUrl.ProjectPage.path}${page}`;
    },
    activeClass(page) {
      return page === (this.currentPage + 1) ? 'active' : '';
    },
    disableClass(btn) {
      return (btn === 'first' && this.currentPage === 0) || (btn === 'last' && this.currentPage === this.getPages() - 1)
        ? 'disabled'
        : '';
    },
  },
};
</script>
