import React, { Component } from 'react';

class WorkTable extends Component {

    updateStatus(id){
        let tasks = JSON.parse(sessionStorage.getItem("works"));
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].id === id) {
                tasks[i].status = tasks[i].status === 0 ? 1 : 0;
                break;
            }
        }
        sessionStorage.setItem("works", JSON.stringify(tasks));
        tasks = JSON.parse(sessionStorage.getItem("works"));
        this.props.updateStatus(tasks);
    }

    showUpdateForm(id) {
        this.props.showUpdateForm(id);
    }
    deleteTask(id) {
        let tasks = JSON.parse(sessionStorage.getItem("works"));
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].id === id) {
                tasks.splice(i,1);
                break;
            }
        }
        sessionStorage.setItem("works", JSON.stringify(tasks));
        this.props.deleteTask(tasks);
    }
    handlingChange = (event) => {
        let keyword = event.target.value;
        let tasks = JSON.parse(sessionStorage.getItem("works"));
        let result = [];
        for(let i = 0; i < tasks.length; i++) {
            if(tasks[i].work.search(keyword) !== -1) {
                result.push(tasks[i]);
            }
        }
        this.props.filterTask(result);
    }

    handlingFilter = (event) => {
        let tasks = JSON.parse(sessionStorage.getItem("works"));
        let select = event.target.value === '1' ? 1 : (event.target.value === '2' ? 2 : 3);
        let result = [];
        if(select === 1) {
            this.props.filterTask(tasks);
        } else if (select === 2) {
            for(let i = 0; i < tasks.length; i++) {
                if(tasks[i].status === 1) {
                    result.push(tasks[i]);
                }
            }
            this.props.filterTask(result);
        } else {
            for(let i = 0; i < tasks.length; i++) {
                if(tasks[i].status === 0) {
                    result.push(tasks[i]);
                }
            }
            this.props.filterTask(result);
        }
    }
    
    render() {
        let works = this.props.sendTasks.map((value, key) => {
            return (
                <tr key={value.id}>
                    <td>{key+1}</td>
                    <td>
                        {value.work}
                    </td>
                    <td>
                        <button onClick={()=>{this.props.hiddenForm() ; this.updateStatus(value.id)}}  className={value.status === 1 ? "btn btn-success" : "btn btn-warning"}>{value.status === 1 ? 'Active' : 'Hidden'}</button>
                    </td>
                    <td>
                        <div className="btn-group">
                            <button onClick={()=>this.showUpdateForm(value.id)} type="button" className="btn btn-danger">Edit</button>
                            <button onClick={()=>{if(window.confirm('Are you delete?')){this.deleteTask(value.id)};}} type="button" className="btn btn-secondary">Delete</button>
                        </div>
                    </td>
                </tr>
            )
        })
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <div className="form-group">
                                <input type="text"
                                    onChange={this.handlingChange}
                                    className="form-control" name="filter_name" />
                            </div>
                        </td>
                        <td>
                            <div className="form-group">
                                <select onChange={this.handlingFilter} className="form-control" name="filter_status">
                                    <option value={1}>All</option>
                                    <option value={2}>Active</option>
                                    <option value={3}>Hidden</option>
                                </select>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    {works}
                </tbody>
            </table>
        );
    }
}

export default WorkTable;