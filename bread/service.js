/**
 * service of Mianbaoduo
 */

const BASE_URL = 'https://x.mianbaoduo.com/api/';

const getKey = () => localStorage.getItem('key');

const provider = (resp) => {
  const {
    code,
    error_info,
    result
  } = resp;
  if (code !== 200) {
    throw new Error(error_info || '请求异常');
  }
  return result;
};

const req = (url, type = 'GET', data) => {
  const key = getKey();
  if (!key) {
    throw new Error('缺少开发者 key');
  }
  return fetch(url, {
      headers: {
        'x-token': key,
      },
      method: type,
      body: JSON.stringify(data),
    }).then(resp => resp.json())
    .then(json => {
      // console.log(json);
      return json;
    })
    .then(provider);
};

const get = (url, data) => req(`${url}?${new URLSearchParams(data).toString()}`);
const post = (url, data) => req(url, 'POST', data);

const URLS = ((urlMap) => {
  return Object.entries(urlMap).reduce((acc, [key, path]) => {
    acc[key] = `${BASE_URL}${path}`;
    return acc;
  }, {});
})({
  /** 所有订单, https://mianbaoduo.com/open_doc/#/%E8%8E%B7%E5%8F%96%E6%89%80%E6%9C%89%E8%AE%A2%E5%8D%95 */
  orderList: 'order-list',
  /** 订单详情 */
  orderDetail: 'order-detail',
  /** 作品详情 */
  productDetail: 'product-detail',
});

const SERVICES = {
  /** 获取当前用户所有订单 */
  getOrderList({
    page,
    limit
  } = {
    page: 1,
    limit: 20
  }) {
    return get(URLS.orderList, {
        page,
        limit
      })
      .then(result => {
        return result.orders;
      });
  },

  /** 通过订单号获取订单信息 */
  getOrderDetail({
    orderId
  }) {
    return get(URLS.orderDetail, {
      order_id: orderId,
    });
  },

  /** 批量校验 order id */
  validateOrderIds(orderIds) {
    return Promise.all(orderIds.map(orderId => {
      return this.getOrderDetail({
          orderId
        })
        .then(order => order.state);
    }));
  },

  /** 查询作品详情 */
  getProductDetail(urlKey) {
    return get(URLS.productDetail, {
      urlkey: urlKey
    });
  },

};

export default SERVICES;