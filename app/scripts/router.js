var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

var LoginComponent = require('./components/login.jsx').LoginComponent;
var ChatComponent = require('./components/chat.jsx').ChatComponent;
var MessageCollection = require('./models/Message').MessageCollection;

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
    if(this.model) {this.navigate('', {trigger: true});}



    ReactDOM.render(
      React.createElement(ChatComponent, {model: this.model}),
      document.getElementById('app')
    );
  }

});

var router = new AppRouter();

module.exports = router;
