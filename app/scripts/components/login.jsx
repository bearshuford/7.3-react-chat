require('react-bootstrap');
var $ = require('jquery');
var React = require('react');
var FontAwesome = require('react-fontawesome');

var Button        = require('react-bootstrap').Button;
var Form          = require('react-bootstrap').Form;
var FormGroup     = require('react-bootstrap').FormGroup;
var FormControl   = require('react-bootstrap').FormControl;
var InputGroup    = require('react-bootstrap').InputGroup;
var ControlLabel  = require('react-bootstrap').ControlLabel;
var HelpBlock     = require('react-bootstrap').HelpBlock;
var Row           = require('react-bootstrap').Row;
var Col           = require('react-bootstrap').Col;

var User          = require('./../models/User').User;
var HeaderElement = require('./header.jsx').HeaderElement;


var LoginForm = React.createClass({
  getInitialState: function() {
    return {username: ''};
  },

  handleChange: function(e) {
    this.setState({ username: e.target.value });
  },

  handleSubmit: function(e) {
     e.preventDefault();
     var router = this.props.router;
     var nick = this.state.username;

     router.model = new User({'username': nick});
     console.log(router.model.get('username'));

     this.setState({username: ''});
     router.navigate('chat', {trigger: true});
  },

  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="username-input">
          <InputGroup>
             <FormControl
               type="text"
               value={this.state.username}
               placeholder="username"
               onChange={this.handleChange}
             />
             <InputGroup.Button>
                <Button type="submit" bsStyle="primary">
                  <FontAwesome name="sign-in"/>
                </Button>
             </InputGroup.Button>
          </InputGroup>
          <HelpBlock>choose a nickname to chat</HelpBlock>
        </FormGroup>
     </form>
    );
  }

});


var LoginComponent = React.createClass({
   render: function(){
      return (
      <div id="login">
         <HeaderElement/>
         <Row>
            <Col sm={6} smOffset={3}>
               <LoginForm router={this.props.router}/>
            </Col>
         </Row>
         <a className="bear-button" href="http://bear.works">
           <i className="bear-head"/>
         </a>
      </div>
      );
   }
});


module.exports = {
  LoginForm: LoginForm,
  LoginComponent: LoginComponent
}
