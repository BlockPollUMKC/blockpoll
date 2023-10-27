import React, {useState} from 'react'
import {MdSecurity} from 'react-icons/md'


const Homepage = () => {


    const [vote,setVote] = useState('')
    const [displayMsg,setDisplayMsg] = useState('')

    const votingArray = [{'name':'organistion A'},{'name':'organistion B'},{'name':'organistion C'},{'name':'organistion D'}]

    const submitVote = (event) => {
        event.preventDefault()
        if (vote !== '') {
            setDisplayMsg(true)
        }
    }

  return (
    <div className='main-container text-white text-center link-style bg-dark d-flex flex-column justify-content-center align-items-center'>
   {displayMsg ? <div>
    <h1>Thanks for Voting</h1>
    <p>Your vote is casted.</p>
   </div> :  <div>
    <h2>Your vote is secure with us!! <MdSecurity className='fs-1 text-white' /></h2>
      <p>please kindly place your valuable vote....</p>
      <form onSubmit={submitVote}>
        {votingArray.map(each =>  <div key={each.name} className='' >
            <input type='radio' id={each.name} name='voting' value={each.name}  onChange={(event) => setVote(event.target.value)} />
            <label htmlFor={each.name} className='ml-2 text-white cursor-pointer'>{each.name}</label>
        </div> )}
        <button type='submit' className='btn btn-primary'>Submit Vote</button>
      </form>
    </div>}
    </div>
  )
}

export default Homepage
