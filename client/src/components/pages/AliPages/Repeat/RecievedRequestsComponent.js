import React , {useEffect, useState} from 'react'
import useToken from 'client/src/components/pages/general/useToken'
import axios from 'axios'
import {Button, Table} from 'react-bootstrap'
import ViewchangeDayOffDetailsModal from "./ViewchangeDayOffDetailsModal"
import ViewSlotLinkingDetails from "./ViewslotLinkingDetailsModal"
import ViewLeaveDetailsModal from "./ViewLeaveDetailsModal"
import ViewReplacementDetailsModal from "./ViewReplacementDetailsModal"

function RecievedRequestsTable()
{
    const token = useToken().token

    var[arr, setArr] = useState([]);
    var[arr2, setArr2] = useState([]);
    var[arr3, setArr3] = useState([]);

    useEffect(async ()=>{
        //loading replacement requests upon loading the page
        async function Replacement()
        {
            await axios.get('http://localhost:5000/api/academicMember/replacementRequest',{headers:{'auth-token':token}}).then((res)=>{
            let items=res.data;
            setArr( [...arr, ...items]);
        }).catch(err=>alert(err))}
        await Replacement();
        //loading slot linking requests upon loading the page
        async function SlotLinking()
        {
            await axios.get('http://localhost:5000/api/coordinator/slotLinkingRequest',{headers:{'auth-token':token}}).then((res)=>{
            let items=res.data;
            setArr2( [...arr2, ...items]);
        }).catch(err=>alert(err))}
        await SlotLinking();
        //loading changing day off/ leaves requests upon loading the page
        async function changingDayOff()
        {
            await axios.get('http://localhost:5000/api/hod/leave-do-reqs',{headers:{'auth-token':token}}).then((res)=>{
            let items=res.data;
            setArr3( [...arr3, ...items]);
        }).catch(err=>alert(err))}
        await changingDayOff();
        }, []  )
        
        //button handlers
        const acceptClick=(e)=>{
            var index = e.target.id
            async function accept()
            {
                await axios.post('http://localhost:5000/api/academicMember/acceptReplacementRequest',{"requestID":index},{headers:{'auth-token':token}}).then((res)=>{
            }).catch(err=>alert(err))}
            accept();
            window.location.reload();
        }
        const rejectClick=(e)=>{
            var index = e.target.id
            async function reject()
            {
                await axios.post('http://localhost:5000/api/academicMember/rejectReplacementRequest',{"requestID":index},{headers:{'auth-token':token}}).then((res)=>{
            }).catch(err=>alert(err))}
            reject();
            window.location.reload();
        }

    return (
        <div>
        <h5>Requests Recieved from Other Academic Members</h5>
        <Table style={{textAlign:"center"}} striped bordered hover> 
        <thead>
        <tr>
        <th>Sender</th>
        <th>Request Type</th>
        <th>Status</th>
        <th>Request Content</th>
        <th>Accept/Reject</th>
        </tr>
        </thead>
        <tbody>
        {
            //inserting replacement request rows
            arr.map
            (
                (request)=>
                {
                    var buttons=null;
                    if(request.Status=="pending")
                    {
                        buttons=(
                        <div>
                        <Button id={request.id} onClick={acceptClick} variant="success">Accept</Button>{' '}
                        <Button id={request.id} onClick={rejectClick} variant="danger">Reject</Button>{' '}
                        </div>)
                    }
                    return <tr>
                    <td>{request.Sender}</td>
                    <td>{request.RequestType}</td>
                    <td>{request.Status}</td>
                    <td><ViewReplacementDetailsModal Status= {request.Status} Sender= {request.Sender} Reciever={request.Reciever} RequestType={request.RequestType} ReplacementSlot={request.ReplacementSlot}/></td>
                    <td>{buttons}</td>
                    </tr>
                } 
            )
        }
        {
            //inserting replacement request rows
            arr2.map
            (
                (request)=>
                {
                    var buttons=null;
                    if(request.Status=="pending")
                    {
                        buttons=(
                        <div>
                        <Button id={request.id} onClick={acceptClick} variant="success">Accept</Button>{' '}
                        <Button id={request.id} onClick={rejectClick} variant="danger">Reject</Button>{' '}
                        </div>)
                    }
                    return <tr>
                    <td>{request.Sender}</td>
                    <td>{request.RequestType}</td>
                    <td>{request.Status}</td>
                    <td><ViewSlotLinkingDetails Status= {request.Status} Sender= {request.Sender} Reciever={request.Reciever} RequestType={request.RequestType} DesiredSlot={request.DesiredSlot}/></td>
                    <td>{buttons}</td>
                    </tr>
                } 
            )
        }  
        {
            //inserting Diab request rows
            arr3.map
            (
                (request)=>
                {
                    var buttons=null;
                    if(request.Status=="pending")
                    {
                        buttons=(
                        <div>
                        <Button id={request.id} onClick={acceptClick} variant="success">Accept</Button>{' '}
                        <Button id={request.id} onClick={rejectClick} variant="danger">Reject</Button>{' '}
                        </div>)
                    }
                    var details = null;
                    if(request.RequestType=="Change Day Off")
                    {
                        details=<ViewchangeDayOffDetailsModal Status= {request.Status} Sender= {request.Sender} Reciever={request.Reciever} RequestType={request.RequestType} DesiredDayOff={request.DesiredDayOff} Reason={request.Reason}/>
                    }
                    else
                    {
                        details=<ViewLeaveDetailsModal Status= {request.Status} Sender= {request.Sender} Reciever={request.Reciever} RequestType={request.RequestType} ReplacementStaffName={request.ReplacementStaffName} RelaventLeaveDocuments= {request.RelaventLeaveDocuments} Reason= {request.Reason} StartOfLeave= {request.StartOfLeave} EndOfLeave= {request.EndOfLeave}/>
                    }
                    return <tr>
                    <td>{request.Sender}</td>
                    <td>{request.RequestType}</td>
                    <td>{request.Status}</td>
                    <td>{details}</td>
                    <td>{buttons}</td>
                    </tr>
                } 
            )
        }  
        </tbody>
        </Table>  
        </div>
    )
}

export default RecievedRequestsTable;