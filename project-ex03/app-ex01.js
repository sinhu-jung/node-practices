/*
sinhu-math.js npm 모듈 테스트 (모듈 패키지 원격 레지스트리 배포)
npm i sinhu-math
명령으로 설치 후, 테스트 할 것
*/
const shMath = require('sinhu-math')

console.log(shMath.sum(1,2,3,4));
console.log(shMath.max(-10, -20, -30, -40));
console.log(shMath.min(-10, -20, -30, -40));