import grpc from 'k6/net/grpc';
import { sleep } from 'k6';
import http from 'k6/http';

const BACKEND = 'odroid2:5000';
const PG_HOST = 'http://controller.lan:8080';
const SESSION_ID = __ENV.SESSION_ID;
const IMPLEMENTATION = __ENV.IMPLEMENTATION;

const client = new grpc.Client();
client.load(['.'], 'user_service.proto');

export const options = {
    vus: 4000,
    duration: '30s',
};

export function setup() {
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/measurement/start/CLIENT/${IMPLEMENTATION}`);
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/run/start/CLIENT/1`);
}

export default function () {
    client.connect(BACKEND, { plaintext: true });
    
    client.invoke('UserService/GetUserWithPostsAndComments', {
        user_id: 1,
        posts_limit: 10,
        comments_limit: 10
    });
    
    client.close();
    sleep(1);
}

export function teardown() {
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/run/stop/CLIENT/1`);
    http.get(`${PG_HOST}/api/v2/session/${SESSION_ID}/measurement/stop/CLIENT/${IMPLEMENTATION}`);
}