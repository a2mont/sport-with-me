const User = require('../models/user');
const Activity = require('../models/activity');

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      Activity:
 *          description: Object representing an activity
 *          type: object    
 *          properties:
 *              id:
 *                  description: id of the activity
 *                  type: Number
 *              sport:
 *                  description: sport type of the activity
 *                  type: string
 *              creator:
 *                  description: creator of the activity
 *                  $ref: '#/components/schemas/User'
 * 
 *      ActivityPartial:
 *       properties:
 *          sport:
 *           type: string
 *          creator: 
 *           type: object
 *           properties: 
 *             id: 
 *               type: Number
 *           required: 
 *             - id
 *          date:
 *               type: Date
 *       required:
 *         - sport
 *         - creator
 *         - date
 * 
 *      ActivitiesArray:
 *         type: array
 *         items: 
 *           $ref: '#/components/schemas/Activity'
 */

 let controller = {

    getById: async(id, ctx, next) => {
        try{
            ctx.activity = await Activity.findById(id).populate('creator').exec();
            if(!ctx.activity) return ctx.status = 404;
            return next();
        }catch (err){
            ctx.status = 404;
        }
    },

    /**
     * @swagger
     * 
     * /activities/:
     *  post:
     *      summary: create a new activity
     *      tags: 
     *          - activities
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/ActivityPartial'
     *      responses:
     *          '201':
     *              description: Activity created
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/Activity'
     *          '400':
     *              description: Invalid request
     *          '401':
     *              description: Unauthorized
     * 
     */
    create: async (ctx) => {
        try{
            const user = await User.findById(ctx.request.body.creator.id);
            console.log(user);
            if(!user) return ctx.status = 400;
            let activity = new Activity({
                sport: ctx.request.body.sport,
                creator: user._id,
                date: ctx.request.body.date,
            });
            activity = await activity.save();
            await Activity.populate(activity, {path: 'creator'});
            ctx.body = activity.toClient();
            ctx.status = 201;
        } catch (err) {
            console.log(err);
            ctx.status = 400;
        }
    },

    /**
     * @swagger
     * 
     * /activities/:
     *   get:
     *     summary: list all activities
     *     tags: 
     *       - activities
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/ActivitiesArray'
     * 
     */

    list: async (ctx) => {
        const activities = await Activity.find({}).exec();
        for(let i = 0; i < activities.length; i++) {
            activities[i] = activities[i].toClient();
        }
        ctx.body = activities;
    },
    /**
     * @swagger
     * 
     * /activities/:
     *   delete:
     *     summary: delete all activities
     *     operationId: clearActivities
     *     tags: 
     *       - activities
     *     responses:
     *       '204':
     *         description: Activities deleted
     *       '401':
     *         description: Unauthorized
     *       '409':
     *         description: Conflict with dependent resources
     * 
     */
    clear: async (ctx) => {
        //const n = await Activity.countDocuments({creator: ctx.user._id}).exec();
        //if(n > 0) return ctx.status = 409;
        await Activity.deleteMany().exec();
        ctx.status = 204;
    },
 }
 module.exports = controller;