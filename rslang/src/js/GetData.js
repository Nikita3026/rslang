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
      // .catch((error) => {
      //   if (error.response.status === 401) {
      //     window.location.href = '/authorization';
      //   } else {
      //   // Something happened in setting up the request that triggered an Error
      //     console.log('Error', error.message);
      //   }
      //   console.log(error.config);
      //   console.log(error.response.data); // human readable massage
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      //   console.log(error.request);
      // });
    }
    return axios.post(this.link, this.options);
    // .catch((error) => {
    //   if (error.response.status === 401) {
    //     window.location.href = '/authorization';
    //   } else {
    //   // Something happened in setting up the request that triggered an Error
    //     console.log('Error', error.message);
    //   }
    //   console.log(error.config);
    //   console.log(error.response.data); // human readable massage
    //   console.log(error.response.status);
    //   console.log(error.response.headers);
    //   console.log(error.request);
    // });
  }
}
