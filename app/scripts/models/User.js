var Backbone = require('backbone');

var User = Backbone.Model.extend({
    defaults: {
      //   "username": '',
        "user_avatar": null,
    },
    idAttribute: '_id'
});



module.exports = {
    User: User
};
