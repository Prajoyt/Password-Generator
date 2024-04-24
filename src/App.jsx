import { useState, useCallback, useEffect,useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  //ref hooks

  const passwordRef=useRef(null);

  const passwordGen = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numAllowed) {
      str += '0123456789'
    }
    if (charAllowed) {
      str += '!@#$%^&*'
    }

    for (let index = 1; index <=length; index++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass)


  }, [length, numAllowed, charAllowed, setPassword])

const copyPasswordClip=useCallback(()=>{
  passwordRef.current?.select()// for highlighting
window.navigator.clipboard.writeText(password)
},[password])


  useEffect(()=>passwordGen,[length,numAllowed,charAllowed,passwordGen])

  
  return (
    <>

      <h1 className='bg-red-600 text-4xl text-center text-white' >Password Generator !!!!</h1>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
             />
          <button className='outline-none  text-white px-3 py-0.5 shrink-0 bg-sky-500 hover:bg-sky-700 ...'
          onClick={copyPasswordClip}
          >Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-counter gap-x-1'>
            <input type='range'
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-counter gap-x-1'>
            <input type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label>Number</label>
          </div>
          <div className='flex items-counter gap-x-1'>
            <input type='checkbox'
              defaultChecked={charAllowed}
              id='charAllowed'
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label>Character</label>
          </div>
        </div>
      </div>

    </>
  )
}

export default App


//