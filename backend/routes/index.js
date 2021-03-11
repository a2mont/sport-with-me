module.exports = (router) => {
    require('./activities')(router);
    require('./users')(router);
    require('./auth')(router);
}