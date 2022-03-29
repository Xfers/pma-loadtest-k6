import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
    // tresholds: {
    //     http_req_failed: ['rate<0.01'],
    //     http_req_duration: ['p(95)<200', 'p(99)<400']
    // },
    stages: [
        { duration: '5s', target: 1 }, 
    ]
};

export default function () {
    // const res = http.get('https://httpbin.org/');
    // check(res, { 'status was 200': (r) => r.status == 200 });
    group("authenticate + pre-signin", function () {
        const res = http.post("https://sso-dev.internal.xfers.com/auth/realms/fazz/protocol/openid-connect/token", {
            'grant_type': 'password',
            'scope': 'openid',
            'username': '87785725657',
            'password': '999123'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic cG1hLWFwcDo1MDI5MTliZi1jNzhmLTRmYjQtODhjZS05Y2NmODlkYmEwOWQ=='
            }
        })
        check(res, { 'status was 200': (r) => r.status == 200 });
    })
    sleep(1);
}