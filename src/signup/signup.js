import React , {useState} from 'react'

const Signup = (props) => {

	  const [info, setInfo] = useState({
			'name':'',
			'mobile':'',
			'email':'',
			'password':'',
			'isname':false,
			'ismobile':false,
			'isemail':false,
			'ispassword':false
		})

		const sigup_Array = [
			{'label':'name','type':'text'},
			{'label':'mobile','type':'Number'},
			{'label':'email','type':'text'},
			{'label':'password','type':'password'}
		
		]

    const SignUpForm = async (event) => {
        event.preventDefault()
        if (info.email !== '' && info.password !== '' && info.mobile !== '' && info.name !== '') {
            props.history.push('/login')
            window.location.reload()
        } else if (info.email === '' && info.password === '' && info.mobile === '' && info.name === '' ) {
          setInfo({...info,'isname':true,
						'ismobile':true,
						'isemail':true,
						'ispassword':true}) 
        }
        else if (info.email === '') {
					setInfo({...info,'isname':false,
					'ismobile':false,
					'isemail':true,
					'ispassword':false})
        }
        else if ( info.password === '') {
						setInfo({...info,'isname':false,
					'ismobile':false,
					'isemail':false,
					'ispassword':true}) 
        }
        else if ( info.name === '') {
						setInfo({...info,'isname':true,
					'ismobile':false,
					'isemail':false,
					'ispassword':false}) 
        }
        else if ( info.mobile === '') {
						setInfo({...info,'isname':false,
					'ismobile':true,
					'isemail':false,
					'ispassword':false}) 
        }
     
    }

  return (
    <div to='/signup'>
    <div className='main-container link-style bg-dark d-flex flex-column justify-content-center align-items-center'>
			<form onSubmit={SignUpForm}>
				{sigup_Array.map(each => {
					const setInfoValues = (event,item) => {
						const nameVal = item.label
						console.log(nameVal)
						setInfo({...info, [nameVal]:event.target.value})
					}

					return (
						<div className='mb-2 d-flex flex-column'>
            <label htmlFor={each.label} className='text-white text-capitalize'>{each.label}</label>
             <input value={info[each.label]} type={each.type} id={each.label} onChange={(e) => setInfoValues(e,each)}/>
             {info[`is${each.label}`] && <p className='fs-6 text-danger text-capitalize'>{each.label} is Required</p>}
        </div>
					)
				})}
				 <button className='btn btn-primary' type='submit'>Submit</button>
			</form>
    </div>
    </div>
  )
}

export default Signup
