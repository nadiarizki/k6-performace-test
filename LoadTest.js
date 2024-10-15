import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export let options = {
  stages: [
    { duration: '1m', target: 50 }, // 50 pengguna dalam waktu 1 menit
    { duration: '3m', target: 50 }, // tetap 50 pengguna selama 3 menit
    { duration: '1m', target: 0 }, // turunkan pengguna ke 0 dalam waktu 1 menit
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