var $ = require('jquery');
var React = require('react');


var HeaderElement = React.createClass({
   render: function(){
      return <header id={this.props.size}>
        <h1>React Chat</h1>
          <a className="bear-button" href="http://bear.works">
            <i className="bear-head"/>
          </a>
        </header>;
   }

});

module.exports = {
   HeaderElement: HeaderElement
};
