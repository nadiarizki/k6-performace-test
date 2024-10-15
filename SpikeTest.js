import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  stages: [
    { duration: '30s', target: 10 }, // 10 pengguna dalam waktu 30 detik
    { duration: '10s', target: 100 }, // lonjakan menjadi 100 pengguna dalam waktu 10 detik
    { duration: '30s', target: 10 }, // kembali ke 10 pengguna dalam waktu 30 detik
  ],
};

export default function () {
  http.get('https://reqres.in/api/users?page=2');
  sleep(1);
}

export function handleSummary(data) {
  return {
    'report.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
 