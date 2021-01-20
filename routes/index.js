module.exports = (router) => {
    require('./activities')(router);
    require('./users')(router);
}