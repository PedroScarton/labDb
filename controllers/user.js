const User = require('../models/user');

exports.getUsers = (req, res, next) => {
    User.fetchAll()
        .then(users => {
            res.render('user/', {
                users: users,
                pageTitle: 'List of users',
                path: '/user'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            res.render('shop/product-detail', {
                user: user,
                pageTitle: 'List of users',
                path: '/user'
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postAddUser = (req, res, next) => {
    const userId = req.params.userId;
    const nickName = req.body.nickName;
    const name = req.body.name;
    const profileImageURL = req.body.profileImageURL;
    const description = req.body.description;
    const phone = req.body.phone;
    const user = new User(nickName, name, profileImageURL, description, phone, userId);
    user.save()
        .then(response => {
            res.redirect('/user');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditUser = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            if (!user) {
                return res.redirect('/');
            }
            res.render('user/edit-user', {
                pageTitle: 'Edit user',
                path: '/user/edit-user',
                editing: editMode,
                user: user
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postEditUser = (req, res, next) => {
    const userId = req.params.userId;
    const nickName = req.body.nickName;
    const name = req.body.name;
    const profileImageURL = req.body.profileImageURL;
    const description = req.body.description;
    const phone = req.body.phone;

    const user = new User(nickName, name, profileImageURL, description, phone, userId);
    user.save()
        .then(response => {
            res.redirect('/user');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postDeleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.deleteById(userId)
        .then(() => {
            res.redirect('/user');
        })
        .catch(err => {
            console.log(err);
        });
}

