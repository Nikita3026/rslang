const axios = require('axios').default;

export default class GetData {
  constructor(link, method, options) {
    this.link = link;
    this.method = method;
    this.options = options;
  }

  sendRequest() {
    if (this.method === 'get') {
      return axios.get(this.link, this.options);
    }
    return axios.post(this.link, this.options);
  }
}
