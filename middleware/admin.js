export default function ({ store, redirect, error, $auth }) {
  console.log($auth.user.level);
  //todo level == 1 이면 admin
}
