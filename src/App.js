import React, { useState} from 'react';
import './App.css';
import AddForm from './components/AddForm';
import Header from './components/Header';
import ManagerTodoList from './components/ManagerTodoList';
import UpdateForm from './components/UpdateForm';


function App() {
  let [showAddForm, setShowAddForm] = useState(false);
  let [showUpdateForm, setShowUpdateForm] = useState(false);
  let [idUpdate, setIdUpdate] = useState('');
  let [tasks, setTasks] = useState(JSON.parse(sessionStorage.getItem("works")));
  let [message, setMessage] = useState('');

  if(!sessionStorage.getItem("works")) {
    sessionStorage.setItem("works", JSON.stringify([]));
  }

  let showResultMessage =(message) => {
    setMessage(message);
  }


  let search = (data) => {
    setTasks(data);
  }

  let addTask = (data) => {
    setTasks(data);
  }

  let addForm = () => {
    if (showAddForm) {
      return <AddForm 
      setShowAddForm={handlingShowAddForm} 
      addTask={addTask} 
      message={showResultMessage}/>
    }
  }

  let updateTask = (data) => {
    setTasks(data);
    if(showAddForm || showUpdateForm) {
      setShowAddForm(false);
      setShowUpdateForm(false);
    }
  }

  let updateForm = () => {
    if (showUpdateForm) {
      return <UpdateForm 
      setShowUpdateForm={handlingShowUpdateForm} 
      updateTask={updateTask} 
      idUpdate={idUpdate}
      message={showResultMessage}
      />
    }
  }

  let handlingShowAddForm = () => {
    setShowAddForm(!showAddForm);
    if(!showAddForm) {
      setShowUpdateForm(false);
    }
  }

  let handlingShowUpdateForm = (id) => {
    setShowUpdateForm(!showUpdateForm);
    setIdUpdate(id);
    if(!showUpdateForm) {
      setShowAddForm(false);   
    }
  }

  let hiddenForm = () => {
    if(showAddForm || showUpdateForm) {
      setShowAddForm(false);
      setShowUpdateForm(false);
    }
  }
  
  return (
   
    <div className="App">
      <Header/>
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            {updateForm()}
            {addForm()}
          </div>
          <div className={showAddForm || showUpdateForm ? "col-sm-8" : "col-sm-12"}>
            <ManagerTodoList
            filterTask={updateTask} 
            search={search}
            updateStatus={addTask} 
            message={message} 
            setShowAddForm={handlingShowAddForm} 
            sendTasks={tasks}
            setShowUpdateForm={handlingShowUpdateForm}
            deleteTask={updateTask}
            hiddenForm={hiddenForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
