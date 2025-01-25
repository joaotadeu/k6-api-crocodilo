import { check } from 'k6';

export function verifyStatusCode(response, expectedStatusCode) {
    return check(response, {
        [`status code deve ser ${expectedStatusCode}`]: (r) => r.status === expectedStatusCode
    });
}