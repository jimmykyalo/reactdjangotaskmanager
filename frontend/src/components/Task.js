import React from 'react'
import { FormCheck, ListGroupItem } from 'react-bootstrap'
import { BsStar, BsStarFill } from 'react-icons/bs';
function Task({task}) {
  return (
    <ListGroupItem key={task._id} className='d-flex flex-row task'>
        <div className="task-check">
        <FormCheck className='task-check-box'/>
        </div>
        <div className="task-details">
        <div className="task-details-name">{task.name}</div>
        <div className="task-details-date">{(new Date(task.createdAt)).toLocaleString('en-AU')}</div>
        </div>
        <div className="task-description">{task.description}</div>
        <div className="task-importance">
            {task.important? <BsStarFill className='task-importance-icon' />:<BsStar className='task-importance-icon' />}
        </div>
    </ListGroupItem>
  )
}

export default Task