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
 *          time:
 *               type: string
 *          latitude:
 *               type: string
 *          longitude: 
 *               type: string
 *       required:
 *         - sport
 *         - creator
 *         - date
 *         - latitude
 *         - longitude
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
     *      security:
     *          - bearerAuth: []
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
            if(!user) return ctx.status = 400;
            let activity = new Activity({
                sport: ctx.request.body.sport,
                creator: user._id,
                date: ctx.request.body.date,
                time: ctx.request.body.time,
                location:{
                    latitude: ctx.request.body.latitude,
                    longitude: ctx.request.body.longitude,
                }
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
     * /users/{id}/activities/:
     *   get:
     *     summary: list all activities owned by a given user
     *     operationId: listUserActivities
     *     tags: 
     *       - activities
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: the id of the owner
     *         schema: 
     *           type: string
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items: 
     *                 $ref: '#/components/schemas/Activity' 
     *       '404':
     *         description: User not found
     */

    list: async (ctx) => {
        const req = {};
        if (ctx.query.owner_id) {
            try{
                const user = await User.findById(ctx.query.owner_id).exec();
                console.log(user);
                req.owner = user._id;
            } catch (err) {
                console.log(err);
                req.owner = null;
            }
        }
        if (ctx.user) req.owner = ctx.user._id;
        const activities = await Activity.find(req).populate('creator').exec();
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
     *     security:
     *       - bearerAuth: []
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
        await Activity.deleteMany().exec();
        ctx.status = 204;
    },

    /**
     * @swagger
     * 
     * '/activities/{id}':
     *  get:
     *      summary: Gets one activity
     *      tags:
     *          - activities
     *      parameters:
     *          - name: id
     *            in: path
     *            description: The id of the activity
     *            required: true
     *            schema:
     *              type: string
     *      responses:
     *          '200':
     *              description: The requested activity
     *              content:
     *                  application/json:
     *                      schema:
     *                          - $ref: '#/components/schemas/Activity'
     *          '404':
     *              description: Activity not found
     * 
     */
    read: async(ctx) => {
        ctx.body = ctx.activity.toClient();
    },

    /**
     * @swagger
     * 
     * /activities/{id}:
     *   put:
     *     summary: Updates an activity by id
     *     operationId: updateUser
     *     tags: 
     *       - activities
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: the id of the activity to update
     *         schema: 
     *           type: string
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/ActivityPartial'
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Activity'
     *       '404':
     *         description: Activity not found
     *       '400':
     *         description: Invalid request body
     *       '401':
     *         description: Unauthorized
     * 
     */
    update: async (ctx) => {
        const activity = ctx.activity;
        activity.date = ctx.request.body.date;
        activity.sport = ctx.request.body.sport;
        activity.creator = ctx.request.body.creator.id;
        await activity.save();
        ctx.body = activity.toClient();
    },

    /**
     * @swagger
     * 
     * '/activities/{id}':
     *  delete:
     *      summary: Deletes one activity
     *      tags:
     *          - activities
     *      parameters:
     *          - name: id
     *            in: path
     *            description: The id of the activity
     *            required: true
     *            schema:
     *              type: string
     *      security:
     *          - bearerAuth: []
     *      responses:
     *          '204':
     *              description: No description
     *              content:
     *                  application/json:
     *                      schema:
     *                          - $ref: '#/components/schemas/Activity'
     *          '404':
     *              description: User not found
     * 
     */
    delete: async (ctx) => {
        await Activity.findByIdAndDelete(ctx.activity._id).exec();
        ctx.status = 204;
    },
 }
 module.exports = controller;