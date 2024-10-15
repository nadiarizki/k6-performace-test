import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 100, // 100 pengguna virtual
  duration: '1m', // Durasi pengujian (5s)
};

export default function () {
  // Query parameters
  let queryParams = {
    page: '2',
    // tambahkan query parameters lain jika diperlukan
  };

  // Menggabungkan query parameters menjadi string query
  let queryString = new URLSearchParams(queryParams).toString();

  // Melakukan GET request untuk mendapatkan pengguna dengan query parameters
  let response = http.get(`https://reqres.in/api/users?${queryString}`);

  // Tunggu 1 detik sebelum melakukan request berikutnya
  sleep(1);
}

export function handleSummary(data) {
  return {
    'report.html': htmlReport(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}