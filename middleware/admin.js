export default function ({ store, redirect, error, $auth }) {
  if ($auth.user.scope != 'admin') {
    redirect('/home');
  }
}
