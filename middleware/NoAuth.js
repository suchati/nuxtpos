export default function ({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (store.state.auth.loggedIn && store.state.auth.user) {
    return redirect('/')
  }
}
