// Write your code here
import './index.css'

import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentItem, toggleFav} = props
  const {id, title, date, isFavorite} = appointmentItem
  const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')

  const starUrl = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onToggle = () => toggleFav(id)

  return (
    <li className="appointment-item">
      <div className="title-and-star-container">
        <p className="title">{title}</p>
        <button type="button" data-testid="star" onClick={onToggle}>
          <img src={starUrl} alt="star" className="star-img" />
        </button>
      </div>
      <p className="appointment-date">{formattedDate}</p>
    </li>
  )
}
export default AppointmentItem
