export default function ({ store, redirect, error, $auth }) {
  if (!$auth.hasScope('admin')) {
    redirect('/home');
  }
}
