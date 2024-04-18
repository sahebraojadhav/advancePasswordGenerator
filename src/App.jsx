import { useCallback, useEffect, useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'



function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed,setNumberAllowed]= useState(false);
  const [charAllowed,setCharAllowed]=useState("");
  const[password,setPassword]=useState('');

  const passwordRef=useRef(null);

  const generatePassword=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNPOQRSTUVWXYZabcdefghijklmnopqrstuvwxtyz";
  
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="!@#$%^&*()~";
  
    for(let i=0;i<length;i++){
      pass+=str.charAt(Math.floor(Math.random()*str.length+1));
    }
    setPassword(pass);
  },[length,numberAllowed,charAllowed])

  useEffect(()=>{
    generatePassword();
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipBoard=()=>{
      window.navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      //passwordRef.current.selectRange(0,233)
    }
 
  return (
    <>
      <div className="w-full max-wl-md mx-auto shadow-md
          roundedl-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
          <h1 className="text-white text-center my-3">Password Generator</h1>
          
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text"
              value={password}
              className='outline-none w-full py-1 px-3'
              placeholder='Password'
              readOnly
              ref={passwordRef}
            />
            <button
            className='outline-none bg-blue-700 text-white px-6 py-0.5 shrink-0'
            onClick={copyPasswordToClipBoard}
            >copy</button>
          </div>

        <div 
        className='flex text-sm gap-x-2'>
          <input type="range" min={6} max={99} 
                 value={length}
                 name='' id=''
                 className='cursor-pointer'
                 onChange={(e)=> setLength(e.target.value)}   
          />
          <label htmlFor="length">Length:{length}</label>
       
      <div 
        className='flex text-sm gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed} 
         onChange={()=>{
          setNumberAllowed((prev)=>!prev)
         }}
          name="" 
          id=""
           />

          <label htmlFor="number">Number</label>
        </div>

        <div 
        className='flex text-sm gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllowed} 
         onChange={()=>{
          setCharAllowed((prev)=>!prev)
         }}
          name="" 
          id=""
           />

          <label htmlFor="char">character</label>
        </div>
       
        </div>
      </div>
    </>
  )
}

export default App
