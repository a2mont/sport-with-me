const User = require('../models/user');
const Activity = require('../models/activity');
const Bcrypt = require('bcrypt');

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      User:
 *          type: object    
 *          properties:
 *              id:
 *                 type: number
 *              name:
 *                  type: object
 *                  properties:
 *                      firstname:
 *                          type: string
 *                          example: Firstname
 *                      lastname:
 *                          type: string
 *                          example: Lastname
 *              email:
 *                  type: string
 *                  example: name@email.com
 *              friends:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/User'
 *      UserLogin: 
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - email
 *              - password
 * 
 *      UserNoFriends:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              name:
 *                  type: object
 *                  properties:
 *                      lastname:
 *                          type: string
 *                      firstname:
 *                          type: string
 *          required:
 *              - email
 *              - password
 *      
 *      UserPartials: 
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *              name:
 *                  type: object
 *                  properties:
 *                      lastname:
 *                          type: string
 *                      firstname:
 *                          type: string
 *              friends:
 *                  type: array
 *                  items:
 *                      type: integer
 *          required:
 *              - email
 *              - password
 *      
 *      UsersArray:
 *         type: array
 *         items: 
 *           $ref: '#/components/schemas/User'
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
     *  get:
     *      summary: Gets one user
     *      tags:
     *          - users
     *      parameters:
     *          - name: id
     *            in: path
     *            description: The id of the user
     *            required: true
     *            schema:
     *              type: string
     *      responses:
     *          '200':
     *              description: The requested user
     *              content:
     *                  application/json:
     *                      schema:
     *                          - $ref: '#/components/schemas/User'
     *          '404':
     *              description: User not found
     * 
     */
    read: async(ctx) => {
        ctx.body = ctx.user.toClient();
    },

    /**
     * @swagger
     * 
     * /users/{id}:
     *   put:
     *     summary: Updates a user by id
     *     operationId: updateUser
     *     tags: 
     *       - users
     *     parameters:
     *       - name: id
     *         in: path
     *         required: true
     *         description: the id of the user to update
     *         schema: 
     *           type: string
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/UserPartials'
     *     responses:
     *       '200':
     *         description: success
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *       '404':
     *         description: User not found
     *       '400':
     *         description: Invalid request body
     *       '401':
     *         description: Unauthorized
     * 
     */
    update: async (ctx) => {
        const user = ctx.user;
        user.email = ctx.request.body.email;
        user.password = await Bcrypt.hash(ctx.request.body.password, 10);
        user.friends = ctx.request.body.friends;
        user.name = ctx.request.body.name;
        await user.save();
        await user.populate('friends').execPopulate();
        ctx.body = user.toClient();
    },

    /**
     * @swagger
     * 
     * '/users/{id}':
     *  delete:
     *      summary: Deletes one user
     *      tags:
     *          - users
     *      parameters:
     *          - name: id
     *            in: path
     *            description: The id of the user
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
     *                          - $ref: '#/components/schemas/User'
     *          '404':
     *              description: User not found
     *          '409':
     *              description: Conflict with dependent resources
     * 
     */
    delete: async (ctx) => {
        const n = await Activity.countDocuments({creator: ctx.user._id}).exec();
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
     *              $ref: '#/components/schemas/UsersArray'
     * 
     */

    list: async (ctx) => {
        const users = await User.find({})
            .populate('friends')
            .exec();
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
     *     security:
     *       - bearerAuth: []
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
        const n = await Activity.countDocuments().exec();
        if(n > 0) return ctx.status = 409;
        await User.deleteMany().exec();
        ctx.status = 204;
    },

 }
 module.exports = controller;