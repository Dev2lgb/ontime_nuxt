export default /* async */ function (ctx) {
  return {
    authorizer(channel, options) {
      return {
        authorize(socketId, callback) {
          ctx.app.$axios.post(options.authEndpoint, {
            socket_id: socketId,
            channel_name: channel.name
          }, {credentials: true})
            .then((response) => {
              callback(false, response.data)
            })
            .catch((error) => {
              callback(true, error)
            })
        }
      }
    }
  }
}
