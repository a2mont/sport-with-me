  
const activities = require('../controllers/activities');
const jwt = require('../middlewares/jwt');

module.exports = (router) => {
    router
        .param('activity_id', activities.getById)
        .post('/activities/', jwt, activities.create)
        .get('/activities/', activities.list)
        .put('/activities/:activity_id', jwt, activities.update)
        .delete('/activities/:activity_id', jwt, activities.delete)
        .get('/activities/:activity_id', activities.read)
        .delete('/activities/', jwt, activities.clear);
    
}