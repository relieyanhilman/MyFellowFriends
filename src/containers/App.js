import React, {Component} from 'react';
import CardList from '../components/CardList';
// import {robots} from './robots.js';
import SearchBox from '../components/SearchBox';
import './app.css';
import Scroll from "../components/Scroll"
import ErrorBoundry from "../components/ErrorBoundry";

class App extends Component {
    constructor(){
        super();
        this.state = {
            robots : [],
            searchFilter:''
        }
        
    }

    onSearchChange = (event) => {
        this.setState({searchFilter: event.target.value})
        // console.log(event.target.value);
    }

    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots : users}))
        
    }

    render(){
        const {robots, searchFilter} = this.state;
        const filteredComponent = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchFilter.toLowerCase())
        });
        return (!robots.length)? <h1>Loading</h1> :
            (
                <>
                <div className='tc'>
                    <h1 className="f1">Robofriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredComponent} />
                        </ErrorBoundry>
                    </Scroll>
                </div>
                </>
            )
    }
    
}

export default App;