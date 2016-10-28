var $ = require('jquery');
var React    = require('react');
var Backbone = require('backbone');
var ReactDOM = require('react-dom');
var moment   = require('moment');
require('backbone-react-component');

var FontAwesome    = require('react-fontawesome');
var Button         = require('react-bootstrap').Button;
var Form           = require('react-bootstrap').Form;
var FormGroup      = require('react-bootstrap').FormGroup;
var FormControl    = require('react-bootstrap').FormControl;
var InputGroup     = require('react-bootstrap').InputGroup;
var ControlLabel   = require('react-bootstrap').ControlLabel;
var HelpBlock      = require('react-bootstrap').HelpBlock;
var Row            = require('react-bootstrap').Row;
var Col            = require('react-bootstrap').Col;
var Well           = require('react-bootstrap').Well;
var Panel          = require('react-bootstrap').Panel;
var Badge          = require('react-bootstrap').Badge;
var Label          = require('react-bootstrap').Label;
var OverlayTrigger = require('react-bootstrap').OverlayTrigger;
var Popover        = require('react-bootstrap').Popover;


var MessageCollection = require('../models/Message').MessageCollection;
var HeaderElement     = require('./header.jsx').HeaderElement;
var LoginForm         = require('./login.jsx').LoginForm;
var User              = require('./../models/User').User;


var MessageForm = React.createClass({

  mixins: [Backbone.React.Component.mixin],

  getInitialState: function(){
    return { message: ''};
  },

  handleMessage: function(e){
    this.setState({'message': e.target.value});
  },

  handleSubmit: function(e){
    e.preventDefault();

   this.getCollection().create( {
      username: this.getModel().get('username'),
      content:  this.state.message,
      time:     new Date().getTime()
   } );

   this.setState({message: ''});
   },

  render: function(){
     return (
      <form id="message-form" onSubmit={this.handleSubmit}>
        <FormGroup controlId="username-input" bsSize="lg">
          <InputGroup>
             <InputGroup.Button >
                <Button bsStyle="primary" bsSize="lg">
                  {this.getModel().get('username')}
                </Button>
             </InputGroup.Button>
             <FormControl type="text"
               value={this.state.message}
               onChange={this.handleMessage}
             />
             <InputGroup.Button >
                <Button type="submit" bsStyle="success" bsSize="lg">
                  <FontAwesome name="paper-plane"/>
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



  componentWillUpdate: function() {
      var node = ReactDOM.findDOMNode(this);
      this.shouldScroll = node.scrollTop + node.clientHeight === node.scrollHeight;
   },

   componentDidUpdate: function() {
      if (this.shouldScroll) {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
        console.log('didUpdate–scrollTop:',node.scrollTop);
      }
   },

   componentWillMount: function(){
      this.shouldScroll = true;
   },

   componentDidMount: function(){
      setInterval(function(){this.getCollection().fetch();}.bind(this), 15000);
      if (this.shouldScroll) {
        var node = ReactDOM.findDOMNode(this);
        node.scrollTop = node.scrollHeight;
        console.log('didMount–scrollTop:',node.scrollTop);
      }
 },

  render: function(){
    var collection = this.getCollection();

    var listOfMessages = collection.map(function(message){
      var key = message.get('_id') || message.cid;
      var username = message.get('username');
      var content = message.get('content');
      var time = moment(message.get('time')).format('h:mm a');

      return (
         <Panel key={key}>
            <h4> {username} </h4>
            {content}
            <Badge pullRight={true}> {time} </Badge>
         </Panel>
      );
    });

    return <div id="list-pane">{listOfMessages}</div>;
  }

});

var ChatComponent = React.createClass({
  mixins: [Backbone.React.Component.mixin],

  getDefaultProps: function(){
     var collection = new MessageCollection();
     collection.fetch();
     return {'collection': collection}
  },

  render: function(){
    return (
      <Row id="chat">
         <Col id="chat-col"
           xs={10} xsOffset={1}
           sm={8}  smOffset={2}
           md={6}  mdOffset={3}
         >
            <HeaderElement size="header-sm"/>
            <MessageListing/>
            <MessageForm/>
         </Col>
      </Row>
   );
  }
});

module.exports = {
  ChatComponent: ChatComponent
}
