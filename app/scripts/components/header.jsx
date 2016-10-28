var $ = require('jquery');
var React = require('react');


var HeaderElement = React.createClass({
   render: function(){
      return <header id={this.props.size}><h1>React Chat</h1></header>;
   }

});

module.exports = {
   HeaderElement: HeaderElement
};
