const React = require('react');
const Default = require('../layouts/Default');

class New extends React.Component{
    render(){
        return(
        <Default>
            <form action='/fruits' method='POST'>
                <fieldset>
                    <legend>Create a new fruit</legend>
                    <label>
                        NAME:<input type='text' name='name' placeholder='enter fruit name'/>
                    </label>
                    <label>
                        COLOR:<input type='text' name='color' placeholder='enter fruit color'/>
                    </label>
                    <label>READY TO EAT:<input type='checkbox' name='readyToEat' value='true'/></label>
                </fieldset>
                <input type='submit' value='create new fruit'/>
            </form>
        </Default>
        )
    }
}

module.exports = New;