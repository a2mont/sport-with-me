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
 *                  type: integer
 *              sport:
 *                  description: sport type of the activity
 *                  type: string
 *              creator:
 *                  description: creator of the activity
 *                  $ref: '#/components/schemas/UserNoFriends'
 *              location:
 *                  description: location of the activity
 *                  type: object
 *                  properties:
 *                      latitude:
 *                          type: number
 *                          example: 47.1
 *                      longitude: 
 *                          type: number
 *                          example: 7.5
 *              date:
 *                  description: day and hour(optional) of the activity
 *                  type: object
 *                  properties:
 *                      day:
 *                          type: string
 *                          example: YYYY-MM-DD
 *                      hour: 
 *                          type: string
 *                          example: HH:mm
 *              price:
 *                  description: price of the activity
 *                  type: number
 *                  example: 5.5
 *              public:
 *                  description: the activity is open to the public
 *                  type: boolean
 *              comments:
 *                  description: additional informations
 *                  type: string
 *                  example: Please bring a water bottle with you
 *              participants:
 *                  description: participants to the activity
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/UserNoFriends'
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
 *               type: number
 *           required: 
 *             - id
 *          date:
 *              type: object
 *              properties:
 *                  day:
 *                      type: string
 *                      example: YYYY-MM-DD
 *                  hour: 
 *                      type: string
 *                      example: HH:mm
 *              required:
 *                  - day
 *          location:
 *               type: object
 *               properties:
 *                  latitude:
 *                      type: number
 *                  longitude: 
 *                      type: number
 *          price:
 *              type: number
 *          public:
 *              type: boolean
 *          comments:
 *              type: string
 *          participants:
 *              type: array
 *              items:
 *                  type: integer
 *       required:
 *         - sport
 *         - creator
 *         - date
 *         - location
 * 
 *      ActivitiesArray:
 *         type: array
 *         items: 
 *           $ref: '#/components/schemas/Activity'
 */

let controller = {

    getById: async (id, ctx, next) => {
        try {
            ctx.activity = await Activity.findById(id)
            .populate('creator')
            .populate('participants')
            .exec();
            if (!ctx.activity) return ctx.status = 404;
            return next();
        } catch (err) {
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
        try {
            const user = await User.findById(ctx.request.body.creator.id);
            if (!user) return ctx.status = 400;
            let activity = new Activity({
                sport: ctx.request.body.sport,
                creator: user._id,
                date: ctx.request.body.date,
                location: ctx.request.body.location,
                participants: ctx.request.body.participants,
                price: ctx.request.body.price,
                comments: ctx.request.body.comments,
                public: ctx.request.body.public,
            });
            activity = await activity.save();
            await Activity.populate(activity, { path: 'creator' });
            await Activity.populate(activity, { path: 'participants' });
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
     *     summary: List all activities
     *     tags: 
     *       - activities
     *     parameters:
     *       - name: owner_id
     *         in: query
     *         description: the id of the owner (optional)
     *         schema: 
     *           type: string
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *              $ref: '#/components/schemas/ActivitiesArray'
     * 
     * /users/{user_id}/activities/:
     *   get:
     *     summary: List all activities owned by a given user
     *     operationId: listUserActivities
     *     tags: 
     *       - activities
     *     parameters:
     *       - name: user_id
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
        //console.log(ctx.query.owner_id);
        if (ctx.query.owner_id) {
            try {
                const user = await User.findById(ctx.query.owner_id).exec();
                //console.log(user);
                req.creator = user._id;
            } catch (err) {
                console.log(err);
                req.creator = null;
            }
        }
        if (ctx.user) req.creator = ctx.user._id;
        let activities = await Activity.find(req)
            .populate('creator')
            .populate('participants')
            .exec();
        for (let i = 0; i < activities.length; i++) {
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
    read: async (ctx) => {
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
        activity.location = ctx.request.body.location;
        activity.participants = ctx.request.body.participants;
        await activity.save();
        await activity
            .populate('creator')
            .populate('participants')
            .execPopulate();
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