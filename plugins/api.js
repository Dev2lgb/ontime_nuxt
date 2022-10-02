export default function({ $axios, redirect }) {
  //axios 요청시 실행되는 함수
  $axios.onRequest((config) => {
    config.headers['Accept-Language'] = localStorage.getItem('locale');
    console.log("Making request to " + config.url); // 요청 때마다 url 출력
  });

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 400) {
      redirect("/400"); // 400 에러 발생시 /400으로 리다이렉트
    }
  });
}

