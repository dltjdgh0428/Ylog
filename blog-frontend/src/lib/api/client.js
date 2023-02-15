import axios from 'axios';

const client = axios.create();
/**
 * 글로벌 설정예시
 * //API주소를 다른곳으로 사용함
 * client defaults.baseURL = 'https://external-api-server.com/'
 * 
 * //헤더설정
 * \
 */

export default client;