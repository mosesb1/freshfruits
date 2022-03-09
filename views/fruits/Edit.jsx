const React = require('react');
const Default = require('../layouts/Default');

class Edit extends React.Component{
    render(){
        const {fruit} = this.props;
        return(
        <Default>
            <div>
                <form action={`/fruits/${fruit._id}?_method=PUT`} method="POST">
                    Name: <input type='text' name='name' defaultValue={fruit.name}/><br/>
                    Color: <input type='text' name='color' defaultValue={fruit.color}/><br/>
                    Ready to Eat: {fruit.readyToEat ? <input type='checkbox' name='readyToEat' value='true' defaultChecked/> : <input type='checkbox' name='readyToEat' value='true'/>}<br/>
                    <input type='submit' value='Submit Changes'/>
                </form>
                <nav>
                    <a href={`/fruits/${fruit._id}`}>Go back to show page</a>
                </nav>
            </div>
        </Default>
        )
    }
}

module.exports = Edit;