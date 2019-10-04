// 获取一位数
const getSigleDigit = () => {
  return Math.floor(Math.random() * 10);
};
// 获取两位数
const getDoubleDigit = () => {
  return 10 + Math.floor(Math.random() * 90);
};
// 大数在前
const desc = (a, b) => {
  return b - a;
};
const sortDesc = (arr) => {
  return arr.sort(desc);
};
const combind = (a, b) => {
  const [first, second] = [a, b].sort(desc);
  return `${first} - ${second} = ${first - second}`;
};
const doubleAndDouble = () => sortDesc([getDoubleDigit(), getDoubleDigit()]);
const doubleAndSigle = () => sortDesc([getDoubleDigit(), getSigleDigit()]);
const sigleAndSigle = () => sortDesc([getSigleDigit(), getSigleDigit()]);
const LevelMap = {
  0: sigleAndSigle,
  1: doubleAndSigle,
  2: doubleAndDouble,
};
const Question = Vue.component('Question', {
  template: '#question',
  props: ['first', 'second', 'operation', 'result', 'value'],
  data() {
    return {
      input: '', // 应答
    };
  },
  watch:{
    value(val){
      this.input = val;
    },
    input(val){
      this.$emit('input', val);
    },
  },
  methods: {
    keypress(e) {
      if (e.which === 13) {
        console.log('enter');
        this.$emit('enter');
      }
    }
  }
});
new Vue({
  el: '#app',
  components: {
    Question,
  },
  data: {
    level: 1,
    first: 2,
    second: 1,
    operation: '-',
    input: '',
    result: 1,
    history: [],
  },
  computed: {
    finished() {
      return this.history.filter(item => {
        return (item.input !== '' && +item.input === item.result);
      }).length;
    },
  },
  methods: {
    gen() {
      const func = LevelMap[`${this.level}`];
      const [first, second] = func();
      this.record({
        first,
        second,
        operation: this.operation,
        result: first - second,
        input: '',
      });
    },
    record({
      first,
      second,
      operation,
      result,
      input,
    }) {
      // this.history.push(`${first} ${operation} ${second} = ${result}`);
      this.history.unshift({
        first,
        second,
        operation,
        result,
        input,
      });
      this.$set(this.$data, 'history', this.history);
    }
  },
  created() {
    this.gen();
  }
});
/*
const hideBadge = (doc) => {
  const badge = doc.querySelector('.full-page-logo');
  if (badge) {
    badge.remove();
  }
};
const setViewport = (doc) => {
  let vp = doc.querySelector('meta[name=viewport]');
  if (!vp) {
    vp = document.createElement('meta');
    vp.setAttribute('name', 'viewport');
  }
  vp.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
};
const setBodyHeight = (doc) => {
  const body = doc.querySelector('body');
  body.style.minHeight = '100vh';
  body.style.maxWidth = '100vw';
};
const doc = window.parent.document;
setInterval(() => {
  hideBadge(doc);
  setViewport(doc);
  // setBodyHeight(doc);
}, 3e3);
setViewport(document); */