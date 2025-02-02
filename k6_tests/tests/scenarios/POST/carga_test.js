import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

const dadosCrocodilos = new SharedArray("dadosCrocodilos", function () {
    const filePath = '/Users/joaotadeu/Documents/Workspace/JavaScript/k6/k6.io/k6_tests/tests/data/dados.json';
    let fileContents = open(filePath);
    return JSON.parse(fileContents).crocodilos;
});

export const options = {
    stages: [
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        checks: ['rate > 0.90'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 150000']
    }
};

export default function () {
    const BASE_URL = 'https://test-api.k6.io';

    const user = `${Math.random()}@gmail.com`;
    const pass = 'user123';

    console.log( user + pass)

    const response = http.post(`${BASE_URL}/user/register/`, {
        username: user,
        first_name: 'croco',
        last_name: 'dino',
        email: user,
        password: pass
    });

    check(response, {
        'sucesso ao registrar': (r) => r.status === 201
    });

    sleep(1)

}