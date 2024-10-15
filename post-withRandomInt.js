import http from 'k6/http';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';


export let options = {
  vus: 100, // 100 pengguna virtual
  duration: '1m', // Durasi pengujian (5s)
};

export default function () {
    // Data pengguna baru yang akan dibuat
    let payload = JSON.stringify({
  
        // Menghasilkan data pengguna secara acak
      name: 'John Doe ' + randomIntBetween(1,10),
      job: 'Software Engineer'
    });
  
    // Header untuk request POST
    let headers = {
      'Content-Type': 'application/json',
    };
  
    // Melakukan POST request untuk membuat pengguna baru
    let response = http.post('https://reqres.in/api/users', payload, { headers: headers });
    console.log(JSON.stringify(payload))
    //console.log(JSON.stringify(response))
  
    console.log(JSON.stringify(response.json))
    // Tunggu 1 detik sebelum melakukan request berikutnya
    sleep(1);
  }
  
export function handleSummary(data) {
    return {
      'report.html': htmlReport(data),
      stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
  }
   