import React, { Component } from 'react';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }
    
    handlingChange = (event) => {
        this.setState({
            keyword: event.target.value
        })
    }
    handlingSubmit = (event) => {
        event.preventDefault();
        let tasks = JSON.parse(sessionStorage.getItem("works"));
        let result = [];
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].work.search(this.state.keyword) !== -1) {
                result.push(tasks[i]);
            }
        }
        this.props.search(result);
    }
    render() {
        return (
            <form className="float-left" onSubmit={this.handlingSubmit}>
                <div className="btn-group" style={{width: 400}}>
                  <input onChange={this.handlingChange} type="text" name="keyword" className="form-control"/>
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>
        );
    }
}

export default SearchForm;