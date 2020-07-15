// Today Yandex do not issue free API keys for API Yandex.Translate anymore. with 27 may 2020 -only paid keys
const API_KEY = 'trnsl.1.1.20200529T204914Z.fd9767866d765238.db0f2d3090eed1461d13bebfbc26da286c8cada3';
const URL_API = 'https://translate.yandex.net/';

export default async (text) => {
  const url = `${URL_API }api/v1.5/tr.json/translate?lang=ru&key=${API_KEY}&text=${text}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.text;
};
