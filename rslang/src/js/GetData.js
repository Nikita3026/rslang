const axios = require('axios').default;

export default class GetData {
  constructor(link, method, body = null) {
    this.link = link;
    this.method = method;
    this.body = body;
  }

  sendRequest() {
    if (this.method === 'get') {
      return axios.get(this.link);
    }
    return axios.post(this.link, this.body);
  }
}