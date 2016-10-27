var $ = require('jquery');

var React = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
require('backbone-react-component');

var Button = require('react-bootstrap').Button;
var Form = require('react-bootstrap').Form;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var InputGroup = require('react-bootstrap').InputGroup;
var ControlLabel = require('react-bootstrap').ControlLabel;
var HelpBlock = require('react-bootstrap').HelpBlock;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Well = require('react-bootstrap').Well;
var Panel = require('react-bootstrap').Panel;
var Badge = require('react-bootstrap').Badge;
var Label = require('react-bootstrap').Label;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover = require('react-bootstrap').Popover;

var User = require('./../models/User').User;
var MessageCollection = require('../models/Message').MessageCollection;
var LoginForm = require('./login.jsx').LoginForm;


var MessageForm = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  getInitialState: function(){
    return {
      message: ''
    };
  },

  handleMessage: function(e){
    var message = e.target.value;
    this.setState({'message': message});
  },

  handleSubmit: function(e){
    e.preventDefault();

    this.getCollection().create( {
         content: this.state.message,
         time: new Date().getTime(),
         username: this.getModel().get('username')
      } );

    this.setState({message: ''});
  },

  render: function(){
     return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username-input" bsSize="lg">
          <InputGroup>
             <InputGroup.Button >
                <Button bsStyle="primary" bsSize="lg">
                  {this.getModel().get('username')}
                </Button>
             </InputGroup.Button>
             <FormControl
               type="text"
               value={this.state.message}
               onChange={this.handleMessage}
             />
             <InputGroup.Button >
                <Button type="submit" bsStyle="success" bsSize="lg">
                  <Glyphicon glyph="send"/>
                </Button>
             </InputGroup.Button>
          </InputGroup>
        </FormGroup>
     </form>
    );
  }
});

var MessageListing = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  /* http://blog.vjeux.com/2013/javascript/scroll-position-with-react.html */
   componentWillUpdate: function() {
      var node = ReactDOM.findDOMNode(this);
      this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
   },

   componentDidUpdate: function() {
      if (this.shouldScrollBottom) {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight
      }
   },

  render: function(){
    var collection = this.getCollection();
    var listOfMessages = collection.map(function(message){
      return (
         <Panel key={message.get('_id') || message.cid}>
            <h4>{message.get('username')}</h4>
            {message.get('content')}
            <Badge pullRight={true}>{message.get('time')}</Badge>
         </Panel>
      );
    });

    return (
         <div id="list-pane">
            {listOfMessages}
         </div>

    );
  }
});

var ChatComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function(){
    return (
      <div id="chat">
        <MessageListing/>
        <MessageForm/>
      </div>
   );
  }
});

module.exports = {
  ChatComponent: ChatComponent
}
