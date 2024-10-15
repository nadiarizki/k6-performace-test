import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';



export let options = {
  vus: 100, // 100 pengguna virtual
  duration: '1m', // Durasi pengujian (5s)
};


export default function () {

  group('Performance Reqres Get User', () => {
    let response = http.get('https://reqres.in/api/users?page=2');

    // Memeriksa apakah status response adalah 200 (OK)
    check(response, {
      'status is 200': (r) => r.status === 200,
    });
  
    // Memeriksa apakah response time kurang dari 200 ms
    check(response, {
      'response time is less than 200ms': (r) => r.timings.duration < 200,
    });
  
    // Memeriksa apakah response body tidak kosong
    check(response, {
      'response body is not empty': (r) => r.body.length > 0,
    });

})
  // Tunggu 1 detik sebelum melakukan request berikutnya
  sleep(1);
}

export function handleSummary(data) {
  return {
    'report.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
