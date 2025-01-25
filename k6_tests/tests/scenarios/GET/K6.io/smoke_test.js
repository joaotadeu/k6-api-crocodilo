import http from 'k6/http';
import { check } from 'k6';
import { Counter, Gauge, Rate,Trend } from 'k6/metrics';

export const options = {
    vus: 1,
    duration: '5s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{threshold: 'p(95) < 200', abortOnFail: true}], // Quando teste não atingir vai ser abortado
        checks: ['rate > 0.99']
    }
};

const chamadas = new Counter('chamadas'); // adicionando metrica tipo contadot
const myGauge = new Gauge('Tempo_bloqueado'); // adicionando metrica do tipo medidor
const myRate = new Rate('Taxa_requisicao_200'); // adicionando metrica tipo taxa
const myTrend = new Trend('taxa_tendencia'); // Adicionando metrica tipo tendencia

export default function(){
    const res = http.get('http://test.k6.io/');

    chamadas.add(1);
    myGauge.add(res.timings.blocked);
    myRate.add(res.status === 200);
    myTrend.add(res.timings.waiting);

    // Descomente e corrija a linha abaixo se deseja utilizar a verificação de status
    // check(res, {
    //     'status code deve ser 200': (r) => r.status === 200
    // });
}