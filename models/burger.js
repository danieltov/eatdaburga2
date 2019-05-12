// * The Requires
// * ========================================
const orm = require('../config/orm');

// * The Model
// * ========================================
// ! Creating a burger model that will take the orm funcs and
// ! apply them specifically for my burgers
const burger = {
    all: function(cb) {
        // ! Pass the table 'burger'
        orm.selectAll('burger', function(r) {
            cb(r);
        });
    },
    add: function(cols, vals, cb) {
        // ! Pass the table 'burger'
        orm.insertOne('burger', cols, vals, function(r) {
            cb(r);
        });
    },
    update: function(data, condition, cb) {
        // ! Pass the table 'burger'
        orm.updateOne('burger', data, condition, function(r) {
            cb(r);
        });
    }
};

module.exports = burger;
