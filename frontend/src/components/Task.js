import React, {useState} from 'react'
import { FormCheck, ListGroupItem, Spinner } from 'react-bootstrap'
import { BsCheckLg, BsStar, BsStarFill, BsTrash, BsX } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
function Task({task, setSelectAll, selectAll, editMode, changedImportance, updatingImportance, clickfunction}) {

  return (
    <ListGroupItem key={task._id} className='d-flex flex-row task'>
        <div className="task-check">
          <FormCheck onClick={(e)=>selectAll ? setSelectAll(e.target.checked):setSelectAll(selectAll)} data-id={task._id} className='task-check-box'/>
        </div>
        <div className="task-details">
          <div contentEditable={editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name">{task.name}</div>
          <div contentEditable={editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-date">{(new Date(task.createdAt)).toLocaleString('en-AU')}</div>
        </div>
        {!task.completed && <div className="task-details">
          <div contentEditable={task.startTime && editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name fw-normal text-black">{task.startTime ? 'Start:':''} {task.startTime &&(new Date(task.startTime)).toLocaleString('en-AU')}</div>
          <div contentEditable={task.endTime && editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name fw-normal text-black my-0">{task.endTime ? 'End:':''}  {task.endTime && (new Date(task.endTime)).toLocaleString('en-AU')}</div>
        </div>}
        {task.completed && <div className="task-details">
          <div style={{lineHeight:1.5}} contentEditable={task.completedTime && editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name my-0">{task.completedTime ? 'Completed on':''} <br></br>{task.completedTime &&(new Date(task.completedTime)).toLocaleString('en-AU')}</div>
        </div>}
        <div className="task-description" contentEditable={editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true}>{task.description}</div>
        <div className='task-actions'>
          <div className={`task-actions-icon ${updatingImportance}`}>
            {task.completed ? <FaTimes className='task-actions-icon-complete' />:<BsCheckLg className='task-actions-icon-complete' />}
          </div>

          <div className="task-actions-icon">
              <BsTrash className='task-actions-icon-delete' />
          </div>

          <div className="task-actions-icon opacity-100">
              {updatingImportance? <Spinner className='task-actions-icon-loading' animation="border" variant="primary" />:((task.important && !changedImportance) || (!task.important && changedImportance))? <BsStarFill onClick={clickfunction} className='task-actions-icon-importance' />:<BsStar onClick={clickfunction} className='task-actions-icon-importance' />}
          </div>
          
          
        </div>
    </ListGroupItem>
  )
}

export default Task