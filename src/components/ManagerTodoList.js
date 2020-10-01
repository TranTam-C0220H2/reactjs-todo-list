import React, { Component } from 'react';
import SearchForm from './SearchForm';
import WorkTable from './WorkTable';

class ManagerTodoList extends Component {
    constructor(props) {
        super(props);
        this.updateStatus = this.updateStatus.bind(this);
        this.search = this.search.bind(this);
        this.showUpdateForm = this.showUpdateForm.bind(this);
        this.sortTasks = this.sortTasks.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.filterTask = this.filterTask.bind(this);
    }

    updateStatus(data) {
        this.props.updateStatus(data);
    }

    search(data) {
        this.props.search(data);
    }

    showUpdateForm(id) {
        this.props.setShowUpdateForm(id);
    }

    deleteTask(data) {
        this.props.deleteTask(data);
    }
    filterTask(data) {
        this.props.filterTask(data);
    }

    sortTasks(sort) {
        let tasks = JSON.parse(sessionStorage.getItem('works'));
        if (sort === 1) {
            for (let i = 0; i < tasks.length - 1; i++) {
                for (let j = i + 1; j < tasks.length; j++) {
                    if (tasks[i].work > tasks[j].work) {
                        let tmp = tasks[i];
                        tasks[i] = tasks[j];
                        tasks[j] = tmp;
                    }
                }
            }
            return this.props.updateStatus(tasks);
        }
        if (sort === 2) {
            for (let i = 0; i < tasks.length - 1; i++) {
                for (let j = i + 1; j < tasks.length; j++) {
                    if (tasks[i].work < tasks[j].work) {
                        let tmp = tasks[i];
                        tasks[i] = tasks[j];
                        tasks[j] = tmp;
                    }
                }
            }
            return this.props.updateStatus(tasks);
        }
        let arrayActive = [];
        let arrayHidden = [];
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].status === 1) {
                arrayActive.push(tasks[i]);
            } else {
                arrayHidden.push(tasks[i]);
            }
        }
        for (let i = 0; i < arrayActive.length - 1; i++) {
            for (let j = i + 1; j < arrayActive.length; j++) {
                if (arrayActive[i].work > arrayActive[j].work) {
                    let tmp = arrayActive[i];
                    arrayActive[i] = arrayActive[j];
                    arrayActive[j] = tmp;
                }
            }
        }
        for (let i = 0; i < arrayHidden.length - 1; i++) {
            for (let j = i + 1; j < arrayHidden.length; j++) {
                if (arrayHidden[i].work > arrayHidden[j].work) {
                    let tmp = arrayHidden[i];
                    arrayHidden[i] = arrayHidden[j];
                    arrayHidden[j] = tmp;
                }
            }
        }
        if (sort === 3) {
            return this.props.updateStatus(arrayActive.concat(arrayHidden));
        }
        if (sort === 4) {
            return this.props.updateStatus(arrayHidden.concat(arrayActive));
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-12">
                        <button onClick={() => this.props.setShowAddForm()} type="button" className="btn btn-primary float-left">Add my work</button>
                        <div className={this.props.message === "Add task fail!" ? "text-danger" : "text-success"}>{this.props.message}</div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-sm-7">
                        <SearchForm search={this.search} />
                    </div>
                    <div className="col-sm-5">
                        <div className="dropdown open">
                            <button className="btn btn-primary dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                Sort works
                                </button>
                            <div className="dropdown-menu">
                                <button onClick={() => this.sortTasks(1)} className="dropdown-item" href="#"><i className="fas fa-sort-alpha-down"></i>&emsp;A-Z</button>
                                <button onClick={() => this.sortTasks(2)} className="dropdown-item" href="#"><i className="fas fa-sort-alpha-down-alt"></i>&emsp;Z-A</button>
                                <hr />
                                <button onClick={() => this.sortTasks(3)} className="dropdown-item" href="#"><i className="far fa-eye"></i>&ensp;Active</button>
                                <button onClick={() => this.sortTasks(4)} className="dropdown-item" href="#"><i className="far fa-eye-slash"></i>&ensp;Hidden</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-sm-12">
                        <WorkTable
                            updateStatus={this.updateStatus}
                            sendTasks={this.props.sendTasks}
                            showUpdateForm={this.showUpdateForm}
                            deleteTask={this.deleteTask}
                            filterTask={this.filterTask}
                            hiddenForm={this.props.hiddenForm}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default ManagerTodoList;