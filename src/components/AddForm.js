import React, { Component } from 'react';

class AddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: Math.random().toString(36).substring(2) + (new Date()).getTime().toString(),
            work: '',
            status: 1
        }
        this.handlingChange = this.handlingChange.bind(this);
        this.handlingSubmit = this.handlingSubmit.bind(this);
    }

    handlingSubmit(event) {
        event.preventDefault();
        if(this.state.work !== '' || !this.state.status) {
        let storage = JSON.parse(sessionStorage.getItem("works"));
        storage.push(this.state);
        sessionStorage.setItem("works", JSON.stringify(storage));
        let task = JSON.parse(sessionStorage.getItem("works"));
        this.props.addTask(task);
        this.props.setShowAddForm();
        this.props.message('Add task successful!');
        } else {
            this.props.setShowAddForm();
            this.props.message('Add task fail!');
        }
    }
    handlingChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if(name === 'status') {
            value = value === '1' ? 1 : 0;
        }
        this.setState({
            [name] : value
        });
    }
    render() {
        return (

            <form onSubmit={this.handlingSubmit}>
                <div className="card border-primary">
                    <img className="card-img-top" src="holder.js/100px180/" alt="" />
                    <div className="card-body">
                    <i onClick={()=>this.props.setShowAddForm()} className="btn far fa-times-circle float-right"></i>
                        <h4 className="card-title">Add Work</h4>
                        <hr />
                        <div className="form-group">
                            <label className="float-left">Work</label>
                            <input onChange={this.handlingChange} type="text" name="work" className="form-control" placeholder="Name work" />
                        </div>
                        <div className="form-group">
                            <label className="float-left">Status</label>
                            <select onChange={this.handlingChange} defaultValue={this.state.status} className="form-control" name="status">
                                <option value={1}>Active</option>
                                <option value={0}>Hidden</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary"><i className="fas fa-plus-circle"></i> Save</button>&ensp;
                    <button type="reset" className="btn btn-secondary"><i className="fas fa-minus"></i>&nbsp;Reset</button>
                    </div>
                </div>
            </form>

        );
    }
}

export default AddForm;