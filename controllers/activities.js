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
 *              price:
 *                  description: price of the activity
 *                  type: Number
 *              sport:
 *                  description: sport type of the activity
 *                  type: string
 *              date:
 *                  description: date of the activity
 *                  type: Date
 *              creator:
 *                  description: creator of the activity
 *                  $ref: '#/components/schemas/User'
 *              outdoor:
 *                  description: is the activity outdoor
 *                  type: Boolean
 *              public:
 *                  description: is the activity public
 *                  type: Boolean
 * 
 *      ActivityPartial:
 *       properties:
 *         sport:
 *           type: string
 *         creator: 
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
     *   post:
     *     summary: create a new activity
     *     tags: 
     *       - activities
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/BookPartial'
     *     responses:
     *       '201':
     *         description: Book created
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       '400':
     *         description: Invalid request
     *       '401':
     *         description: Unauthorized
     * 
     */
    create: async (ctx) => {
        try{
            const user = await User.findById(ctx.request.body.owner.id);
            if(!user) return ctx.status = 400;
            let activity = new Activity({
                sport: ctx.request.body.sport,
                creator: user._id,
                date: ctx.request.body.date,
            });
            activity = await activity.save();
            await Activity.populate(activity, {path: 'creator'});
            ctx.body = book.toClient();
            ctx.status = 201;
        } catch (err) {
            ctx.status = 400;
        }
    },
 }
 module.exports = controller;