const USER = require('../models/user');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const render = require('../until/render')

class UserController {

    get = async (req, res, next) => {
        await res.render('login')
    }

    signup = async  (req, res, next) => {
        await res.render('signup')
    }

    createUser = async (req, res, next) => {
        try {
            // Kiểm tra xem trường password có tồn tại trong req.body không
            if (!req.body.password) {
                throw new Error('Password is missing in the request body');
            }
            const salt = crypto.randomBytes(16).toString('hex');
            const hmac = crypto.createHmac('sha256', salt);
            const hpass = hmac.update(req.body.password).digest('hex');
            await USER.create({ ...req.body, salt, hpass });
    
            res.redirect('/login');
        } catch (error) {
            console.error('Error during user creation:', error);
            res.redirect('/signup?error=serverError');
        }
    }

    login = async (req, res, next) => {
        if(req.body && req.body.username && req.body.password) {
            const dbUser = await USER.findOne({username: req.body.username});
            if(dbUser) {
                const hmac = crypto.createHmac('sha256', dbUser.salt);
                const hpass = hmac.update(req.body.password).digest('hex');
                if(hpass === dbUser.hpass) { //login thanh cong
                    const token = jwt.sign({username: dbUser.username, role: dbUser.role}, config.secretkey);
                    res.cookie('token', token);
                    if(req.body.redirectURL) {
                        res.redirect(req.body.redirectURL);
                    } else res.redirect('/');
                    
                } else { //password sai
                    
                    res.render('login', {errMessage: 'Wrong password'})
                }
            } else { //Username khong ton tai
                
                res.render('login', {errMessage: `${req.body.username} not existed}`})
            }
    
        } else {
            
            res.render('login', {errMessage: 'Bad Form Data'});
        }
    }

    out = async (req, res, next) => {
        res.clearCookie('token');
        res.redirect('/');
    }

    getUser = async function (req, res, next) {
        try {
            const users = await USER.find({}); // Sử dụng find
            render(req, res, 'user', {users});
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }

    manageUser = async (req, res, next) => {
        try {
            const user = await USER.findById(req.params.id); // Sử dụng find
            render(req, res, 'updateUser', {user});
        } catch (error) {
            res.status(500).json({ error: 'Error fetching user' });
        }
    }
    

    updateUser = async (req, res, next) => {
        const formData = req.body;
        await USER.updateOne({_id: req.params.id}, { formData });
        res.redirect("/login");
    }

    deleteUser = async (req, res, next) => {
        const users = await USER.find({});
        await USER.findByIdAndDelete(req.params.id);
	    render(req, res, 'user', {users});
    
    }
}

module.exports = new UserController();