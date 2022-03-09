const React = require('react');
const Default = require('../layouts/Default')

class Show extends React.Component {
    render(){
        const {fruit} = this.props;
        return(
        <Default>
            <div>
                <h1>{fruit.name}</h1>
                <p>{fruit.color}<br/>{fruit.name} is {fruit.readyToEat ? 'ready to eat' : 'not ready to eat'}</p>
                <a href={`/fruits/${fruit._id}/edit`}>Edit fruit</a><br/>
                <a href='/fruits'>Go back to index</a>
            </div>
        </Default>
        )
    }
}

module.exports = Show;