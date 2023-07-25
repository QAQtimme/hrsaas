const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userInfo.username,
  staffphoto: state => state.user.staffphoto,
  routes: state => state.permission.routes
}
export default getters
