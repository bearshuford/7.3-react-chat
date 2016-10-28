var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginComponent = require('./components/login.jsx').LoginComponent;
var ChatComponent = require('./components/chat.jsx').ChatComponent;
var MessageCollection = require('./models/Message').MessageCollection;
var User = require('./models/User').User;

var AppRouter = Backbone.Router.extend({

  routes: {
    '':     'index',
    'chat': 'chat',
  },

  index: function(){
    ReactDOM.render(
      React.createElement(LoginComponent, {router: this}),
      document.getElementById('app')
    );
  },

  chat: function(){
    if(this.model ) {this.navigate('', {trigger: true});}

    var collection = new MessageCollection();
    collection.fetch();
    setInterval(function(){collection.fetch();}, 15000);

    ReactDOM.render(
      React.createElement(ChatComponent, {collection: collection, model: this.model}),
      document.getElementById('app')
    );
  }

});

var router = new AppRouter();

module.exports = router;
