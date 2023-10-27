import React , {useState} from 'react'

const Login = (props) => {

    const [email,setEmail] = useState('')
    const [pwd,setPwd] = useState('')
    const [isemail,setIsemail] = useState(false)
    const [ispwd,setIspwd] = useState(false)

    const LoginForm = async (event) => {
        event.preventDefault()
        console.log(email,pwd)
        if (email !== '' && pwd !== '') {
            props.history.push('/home')
            window.location.reload()
        } else if (email === '' && pwd === '') {
            setIsemail(true)
            setIspwd(true)
        }
        else if (email === '') {
            setIsemail(true)
            setIspwd(false)
        }
        else if ( pwd === '') {
            setIspwd(true)
            setIsemail(false)
        }
     
    }

  return (
    <div to='/login'>
    <div className='main-container link-style bg-dark d-flex flex-column justify-content-center align-items-center'>
      <form onSubmit={LoginForm}>
        <div className='mb-2 d-flex flex-column'>
            <label htmlFor='email' className='text-white'>Email</label>
             <input value={email} type='text' id='email' onChange={(e) => setEmail(e.target.value)} />
             {isemail && <p className='fs-6 text-danger'>Email is Required</p>}
        </div>
        <div className='mb-2 d-flex flex-column'>
            <label htmlFor='pwd' className='text-white'>Password</label>
             <input value={pwd} type='password' id='pwd' onChange={(e) => setPwd(e.target.value)} />
             {ispwd && <p className='fs-6 text-danger'>Password is Required</p>}
        </div>
        <button className='btn btn-primary' type='submit'>Submit</button>
       
      </form>
    </div>
    </div>
  )
}

export default Login
