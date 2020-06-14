export default function({ store, redirect }) {
  const { user } = store.state;

  if (!user) {
    redirect('/');
  } else if (user && !user.emailVerified) {
    redirect('/auth/verify');
  } else if (user && user.emailVerified) {
    redirect('/dashboard');
  }
}
