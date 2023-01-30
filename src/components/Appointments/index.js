// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    showFav: false,
  }

  updateTitle = e => this.setState({titleInput: e.target.value})

  updateDate = e => this.setState({dateInput: e.target.value})

  submitDetails = e => {
    e.preventDefault()
    const {titleInput, dateInput} = this.state
    if (titleInput !== '' && dateInput !== '') {
      this.setState(prevState => ({
        appointmentsList: [
          ...prevState.appointmentsList,
          {
            id: uuidv4(),
            title: titleInput,
            date: dateInput,
            isFavorite: false,
          },
        ],
        titleInput: '',
        dateInput: '',
      }))
    }
  }

  toggleFav = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (eachItem.id === id) {
          return {
            ...eachItem,
            isFavorite: !eachItem.isFavorite,
          }
        }
        return eachItem
      }),
    }))
  }

  filterFav = () => this.setState(prevState => ({showFav: !prevState.showFav}))

  render() {
    const {appointmentsList, titleInput, dateInput, showFav} = this.state

    const starredAppointments = appointmentsList.filter(
      eachItem => eachItem.isFavorite,
    )

    const renderList = appointments =>
      appointments.map(eachItem => (
        <AppointmentItem
          key={eachItem.id}
          appointmentItem={eachItem}
          toggleFav={this.toggleFav}
        />
      ))

    const toggleFavBg = showFav ? 'active-fav' : ''

    return (
      <div className="bg-container">
        <div className="card">
          <h1 className="main-heading">Add Appointment</h1>
          <div className="form-and-image">
            <form onSubmit={this.submitDetails}>
              <label className="title-label" htmlFor="titleInputs">
                TITLE
              </label>
              <input
                onChange={this.updateTitle}
                value={titleInput}
                type="text"
                id="titleInputs"
                className="title-input"
                placeholder="Title"
              />
              <label className="date-label" htmlFor="dateInputs">
                DATE
              </label>
              <input
                onChange={this.updateDate}
                value={dateInput}
                type="date"
                id="dateInputs"
                className="date-input"
                placeholder="dd/mm/yyyy"
              />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              className="illustration"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>

          <hr />

          <div className="para-star-container">
            <h1 className="main-heading2">Appointments</h1>
            <button
              type="button"
              className={`starred-btn ${toggleFavBg}`}
              onClick={this.filterFav}
            >
              Starred
            </button>
          </div>

          <ul className="appointment-container">
            {showFav
              ? renderList(starredAppointments)
              : renderList(appointmentsList)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
