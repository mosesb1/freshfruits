const React = require('react');
const Default = require('../layouts/Default')

class Index extends React.Component {
    render(){
        const {fruits} = this.props;
        return(
        <Default>
            <div>
                <nav>
                    <a href='/fruits/new'>Create a new fruit</a>
                </nav>
                {
                    fruits.map((fruit) => (
                        <article>
                            <a href={`/fruits/${fruit._id}`}>
                                <h2>
                                    {fruit.name} - {fruit.readyToEat ? 'Ripe' : 'Not Ripe Yuck That\'s Nasty'}
                                </h2>
                            </a>
                            <form action={`fruits/${fruit._id}?_method=DELETE`} method="POST">
                                <input type='submit' value={`DELETE ${fruit.name}`}/>
                            </form>
                        </article>
                    ))
                }

            </div>
        </Default>
        )
    }
}

module.exports = Index;