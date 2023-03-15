import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';

export function JoinPrivateGroupModal() {
    const [code, setCode] = useState("")
    const { username } = useContext(AuthContext)
    const data = {
        code: code,
        username: username
      };
    // TODO : logic for joining group and updating database
    // TODO : errors on invalid/blank code or full group capacity, navigate to group page if successful
    const handleJoinSubmit = () => {
        console.log(code)
        fetch(`http://127.0.0.1:5000/join_private_group`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.json())
          .then(data =>{
            console.log(data)
            if (data.message === 'group joined successfully')
            {
                //done
            }
            else if (data.message === 'group is full')
            {
                //full error 
            }
            else if (data.message === 'code is invalid')
            {
                //invalid code error
            }
            else
            {
                //other error, unsuccessful join
            }
          })
          .catch(error => console.log(error));
          setCode("")
    }

    const handleClose = () => {
        setCode("")
    }



    return (
        <div>
            {/* Modal Button */}
            <button className="btn btn-primary p-3 d-flex align-items-center gap-3 text-uppercase"
                data-bs-toggle="modal" data-bs-target="#joinPrivateGroupModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                    <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z" />
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                </svg>
                <span>Join a Private Group</span>
            </button>

            {/* Modal */}
            <div className="modal fade" id="joinPrivateGroupModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-md modal-dialog-scrollable">
                    <div className="p-4 modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h3 className="modal-title" id="joinPrivateGroupModalLabel"><strong>Join a Private Group</strong></h3>
                            <button onClick={handleClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Modal Body */}
                        <div className="modal-body d-flex flex-column align-items-start gap-4">
                            <div className="form-group d-flex flex-column w-100">
                                <label htmlFor="name"><strong>Code</strong></label>
                                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} className="form-control" id="code" placeholder="Enter code..." />
                            </div>
                            <button onClick={handleJoinSubmit} type="button" className="p-3 btn w-100 btn-primary text-uppercase" data-bs-dismiss="modal">Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
