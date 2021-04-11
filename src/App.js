import React from 'react'
import axios from 'axios'
import Reminder from './components/Reminder'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      reminders: [
        {
          name: 'Buy some eggs',
          timestamp: "2018-11-10T13:00",
          id: 1
        }
      ],
      newName: '',
      newDate: ''
    }
  }

  componentDidMount() {
    console.log('did mount')
    axios
      .get('http://localhost:3001/reminders')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ reminders: response.data })
      })
  }

  addReminder = (event) => {
    event.preventDefault()
    const reminderObject = {
      name: this.state.newName,
      timestamp: this.state.newDate,
      id: Date.now()
    }

    if(this.state.reminders.some(name=>name.name === reminderObject.name)){
      alert("same name cannot be given")
    }else{
      const reminders = this.state.reminders.concat(reminderObject)
      axios.post('http://localhost:3001/reminders', reminderObject)
        .then(response => {
          this.setState({
            reminders: reminders,
            newName: '',
            newDate: ''
          })
        })

    }
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleDateChange = (event) => {
    this.setState({ newDate: event.target.value })
  }

  handleRemove = (e, id) => {
    console.log(id)
    if(window.confirm("Do you really want to delete this?")){
        const url = `http://localhost:3001/reminders/`;
        e.preventDefault();
        axios.delete(url + id)
            .then(response => {
                console.log(response.data);
                this.setState(
                axios
                  .get('http://localhost:3001/reminders')
                  .then(response => {
                    console.log('promise fulfilled')
                    this.setState({ reminders: response.data })
                  }))
            })
            .catch((err) => {
                console.log(err);
            })
      }

      //dynamic 
      //2.7
    }


  render() {
    return (
      <div>
        <h2>Add Reminder</h2>
        <form onSubmit={this.addReminder}>
          <div>
            Name: <input type="text" value={this.state.newName} onChange={this.handleNameChange} required/>
          </div>
          <div>
            Date: <input type="datetime-local" value={this.state.newDate} onChange={this.handleDateChange} required/>
          </div>
          <div>
            <button type="submit">Add</button>
          </div>
        </form>
        <h2>Reminders</h2>
        {this.state.reminders.map(reminder=><Reminder timestamp={reminder.timestamp} name={reminder.name} clickHandler={e => this.handleRemove(e, reminder.id)}/>)}
      </div>
    )
  }
}

///////

export default App