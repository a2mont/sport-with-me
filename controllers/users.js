const User = require('../models/user');
const Activity = require('../models/activity');

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      User:
 *          description: Object representing an user
 *          type: object    
 *          properties:
 *              id:
 *                  description: id of the user
 *                  type: Number
 *                  example: 42   
 *              firstname:
 *                  description: first name of the user
 *                  type: string
 *                  example: John
 *              lastname:
 *                  description: last name of the user
 *                  type: string
 *                  example: Doe
 */

 let controller = {

    getById: async(id, ctx, next) => {
        try{
            ctx.user = await User.findById(id).exec();
            if(!ctx.user) return ctx.status = 404;
            return next();
        }catch (err){
            ctx.status = 404;
        }
    },

    /**
     * @swagger
     * 
     * '/users/{id}':
     * get:
     *  tags:
     *      - users
     *      summary: Gets one user
     *  parameters:
     *      - name: id
     *      in: path
     *      description: The id of the user
     *      required: true
     *      schema:
     *          type: string
     *          example: '42'
     *  responses:
     *      '200':
     *          description: The requested user
     *          content:
     *              application/json:
     *                  schema:
     *                      - $ref: '#/components/schemas/User'
     *      '404':
     *          description: User not found
     * 
     */
    read: async(ctx) => {
        ctx.body = ctx.user.toClient();
    },

    /**
     * @swagger
     * 
     * put:
     *  tags:
     *      - users
     *      summary: Gets one user
     *  parameters:
     *      - name: id
     *      in: path
     *      description: The id of the user
     *      required: true
     *      schema:
     *          type: string
     *          example: '42'
     *      requestBody:
     *          description: The user to update
     *          content:
     *               application/json:
     *                   schema:
     *                       $ref: '#/components/schemas/User'
     *       responses:
     *           '200':
     *           description: The updated user
     *           content:
     *               application/json:
     *               schema:
     *                   $ref: '#/components/schemas/User'
     */
    update: async (ctx) => {
        const user = ctx.user;
        user.email = ctx.request.body.email;
        user.password = ctx.read.body.email;
        await user.save();
        ctx.body = user.toClient();
    },

    /**
     * @swagger
     * 
     * '/users/{id}':
     * delete:
     *  tags:
     *      - users
     *      summary: Gets one user
     *  parameters:
     *      - name: id
     *      in: path
     *      description: The id of the user
     *      required: true
     *      schema:
     *          type: string
     *          example: '42'
     *  responses:
     *      '204':
     *          description: No description
     *          content:
     *              application/json:
     *                  schema:
     *                      - $ref: '#/components/schemas/User'
     *      '404':
     *          description: User not found
     * 
     */
    delete: async (ctx) => {
        const n = await Activity.countDocuments({owner: ctx.user._id}).exec();
        if(n > 0) return ctx.status = 409;
        await User.findByIdAndDelete(ctx.user._id).exec();
        ctx.status = 204;
    },

    /**
     * @swagger
     * 
     * /users/:
     *   get:
     *     summary: list all users
     *     operationId: listUsers
     *     tags: 
     *       - users
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *              type: array
     *                  items:
     *                      $ref: '#/components/schemas/UsersArray'
     * 
     */

    list: async (ctx) => {
        const users = await User.find({}).exec();
        for(let i = 0; i < users.length; i++) {
            users[i] = users[i].toClient();
        }
        ctx.body = users;
    },

    /**
     * @swagger
     * 
     * /users/:
     *   delete:
     *     summary: delete all users
     *     operationId: clearUsers
     *     tags: 
     *       - users
     *     responses:
     *       '204':
     *         description: Users deleted
     *       '401':
     *         description: Unauthorized
     *       '409':
     *         description: Conflict with dependent resources
     * 
     */
    clear: async (ctx) => {
        const n = await Activity.countDocuments.exec();
        if(n > 0) return ctx.status = 409;
        await User.deleteMany().exec();
        ctx.status = 204;
    }

 }
 module.exports = controller;