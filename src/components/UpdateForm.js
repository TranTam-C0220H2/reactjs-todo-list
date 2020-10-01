import React, { Component } from 'react';

class UpdateForm extends Component {
  constructor(props) {
    super(props);
    let { idUpdate } = this.props;
    let tasks = JSON.parse(sessionStorage.getItem("works"));
    let taskUpdate = '';
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === idUpdate) {
        taskUpdate = tasks[i];
        break;
      }
    }
    this.state = {
      id: taskUpdate.id,
      work: taskUpdate.work,
      status: taskUpdate.status
    }
  }
  handlingChange = (event) => {
    let target = event.target;
    let name = target.name;
    let value = target.value;
    if(name === 'status') {
      value = value === '1' ? 1 : 0;
  }
    this.setState({
      [name]: value
    })
  }
  handlingSubmit = (event) => {
    event.preventDefault();
    if(this.state.work !== '' || !this.state.status) {
      let tasks = JSON.parse(sessionStorage.getItem("works"));
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === this.state.id) {
        tasks[i].work = this.state.work;
        tasks[i].status = this.state.status;
        break;
      }
    }
    sessionStorage.setItem("works", JSON.stringify(tasks));
    this.props.updateTask(tasks);
    this.props.message('Update work successful!')
    } else {
      this.props.message('Update work fail!')
    }
    
    this.props.setShowUpdateForm();
  }

  render() {
    return (
      <form onSubmit={this.handlingSubmit}>
        <div className="card border-primary">
          <img className="card-img-top" src="holder.js/100px180/" alt="" />
          <div className="card-body">
          <i onClick={()=>this.props.setShowUpdateForm()} className="btn far fa-times-circle float-right"></i>
            <h4 className="card-title">Update Work</h4>
            <hr />
            <div className="form-group">
              <label className="float-left">Work</label>
              <input onChange={this.handlingChange} value={this.state.work} type="text" name="work" className="form-control" />
            </div>
            <div className="form-group">
              <label className="float-left">Status</label>
              <select onChange={this.handlingChange} className="form-control" name="status" defaultValue={this.state.status}>
                <option value={1}>Active</option>
                <option value={0}>Hidden</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Save</button>&ensp;
                <button type="reset" className="btn btn-default">Reset</button>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateForm;