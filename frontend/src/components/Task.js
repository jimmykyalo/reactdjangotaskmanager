import React from 'react'
import { FormCheck, ListGroupItem } from 'react-bootstrap'
import { BsStar, BsStarFill } from 'react-icons/bs';
function Task({task, setSelectAll, selectAll, editMode, completed}) {
  return (
    <ListGroupItem key={task._id} className='d-flex flex-row task'>
        <div className="task-check">
          <FormCheck onClick={(e)=>selectAll ? setSelectAll(e.target.checked):setSelectAll(selectAll)} data-id={task._id} className='task-check-box'/>
        </div>
        <div className="task-details">
          <div contentEditable={editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name">{task.name}</div>
          <div contentEditable={editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-date">{(new Date(task.createdAt)).toLocaleString('en-AU')}</div>
        </div>
        {!completed && <div className="task-details">
          <div contentEditable={task.startTime && editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name fw-normal text-black">{task.startTime ? 'Start:':''} {task.startTime &&(new Date(task.startTime)).toLocaleString('en-AU')}</div>
          <div contentEditable={task.endTime && editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name fw-normal text-black my-0">{task.endTime ? 'End:':''}  {task.endTime && (new Date(task.endTime)).toLocaleString('en-AU')}</div>
        </div>}
        {completed && <div className="task-details completed">
          <div style={{whiteSpace:'initial', lineHeight:1.5, alignSelf:'center'}} contentEditable={task.completedTime && editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true} className="task-details-name my-0">{task.completedTime ? 'Completed On':''} {task.completedTime &&(new Date(task.completedTime)).toLocaleString('en-AU')}</div>
        </div>}
        <div className="task-description" contentEditable={editMode} onBlur={(e)=>console.log(e.target.innerText)} suppressContentEditableWarning={true}>{task.description}</div>
        
        <div className="task-importance">
            {task.important? <BsStarFill className='task-importance-icon' />:<BsStar className='task-importance-icon' />}
        </div>
    </ListGroupItem>
  )
}

export default Task