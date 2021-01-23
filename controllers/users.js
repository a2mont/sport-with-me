const User = require('../models/user');
const Activity = require('../models/activity');

/**
 * @swagger
 * 
 * components:
 *  schemas:
 *      User:
 *          type: object    
 *          properties:
 *              id:
 *                  type: Number
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *      UserPartial: 
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *          required:
 *              - email
 *              - password
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
     *     summary: update a user by id
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
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema: 
     *             $ref: '#/components/schemas/UserPartial'
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
        user.password = ctx.request.body.password;
        await user.save();
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
     *      responses:
     *          '204':
     *              description: No description
     *              content:
     *                  application/json:
     *                      schema:
     *                          - $ref: '#/components/schemas/User'
     *          '404':
     *              description: User not found
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
        //const n = await Activity.countDocuments({creator: ctx.user._id}).exec();
        //if(n > 0) return ctx.status = 409;
        await User.deleteMany().exec();
        ctx.status = 204;
    },
    /**
     * @swagger
     * 
     * /users/:
     *  post:
     *      summary: create a new user
     *      tags: 
     *          - users
     *      requestBody:
     *          required: true
     *          content:
     *              application/json:
     *                  schema: 
     *                      $ref: '#/components/schemas/UserPartial'
     *      responses:
     *          '201':
     *              description: User created
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/User'
     *          '400':
     *              description: Invalid request
     *          '401':
     *              description: Unauthorized
     * 
     */
    create: async (ctx) => {
        try{
            let user = new User({
                email: ctx.request.body.email,
                password: ctx.request.body.password,
            });
            user = await user.save();
            await User.populate(user, {path: 'creator'});
            ctx.body = user.toClient();
            ctx.status = 201;
        } catch (err) {
            console.log(err)
            ctx.status = 400;
        }
    },

 }
 module.exports = controller;