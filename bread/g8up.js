import Service from './service.js';

const $ = (selector, doc = document) => doc.querySelector(selector);

const StringRes = {
  orderid: {
    text: '订单 ID',
    render(val) {
      return val
    },
  },
  ordertime: {
    text: '支付时间',
    render(val) {
      return new Date(val * 1e3).toLocaleString();
    },
  },
  orderamount: {
    text: '订单金额(元)',
    render(val) {
      return val
    },
  },
  state: {
    text: '支付状态',
    render(val) {
      return {
        success: '已支付',
        cancel: '取消支付',
        invalid: '订单已过期'
      } [val] || val;
    },
  },
  payway: {
    text: '支付渠道',
    render(val) {
      return val
    },
  },
  urlkey: {
    text: '作品的查询 key',
    render(val) {
      return `<a
                href="https://mianbaoduo.com/o/bread/${val}"
                title="点击查看作品详情"
                target="_blank">${val}</a>`;
    },
  },
  creatorid: {
    text: '创作者 ID',
    render(val) {
      return `<a
                  href="https://mianbaoduo.com/o/author/${val}"
                  title="点击查看创作者主页"
                  target="_blank">${val}</a>`;
    },
  },
};


$('#setKey').addEventListener('click', () => {
  const key = prompt('填写开发者 Key:').trim();
  if (key) {
    localStorage.setItem('key', key);
  }
});

$('#orderId').addEventListener('change', (e) => {
  const orderId = $('#orderId').value;
  if (orderId) {
    Service.getOrderDetail({
        orderId,
      }).then(order => {
        const data = Object.entries(order).reduce((obj, cur) => {
          const [key, val] = cur;
          const {
            text,
            render,
          } = StringRes[key] || {
            text: key,
            render: (val) => val,
          };

          obj[text] = render(val);
          return obj;
        }, {});

        // $('#result').textContent = JSON.stringify(data, null, 2);
        $('#result').innerHTML = render(data);
      })
      .catch(e => {
        alert(e.message);
      });
  }
});

const render = (data)=>{
  return Object.entries(data).reduce((html, item)=>{
    const [key, val] = item;
    html += `<p>
      <span class="item-title">${key}</span>:
      <span class="item-value">${val}</span>
    </p>`;
    return html;
  }, '');
};