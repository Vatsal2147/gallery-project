import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import {useEffect} from 'react'
import Pictures from './components/Pictures'

function App() {
  const [error, setError] = useState(false)
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)
  const getData = async () => {
  try {
    const response = await axios.get(
      `https://picsum.photos/v2/list?page=${index}&limit=18`
    )

    setUserData(response.data)
    setError(false)
  } catch (err) {
    setError(true)
  }
}

      useEffect(function(){
        getData();
      },[index])

      let printUserData = (
  <h3 className='text-gray-400 text-xl absolute top-1/2 left-1/2'>
    Loading....
  </h3>
)

if (error) {
  printUserData = (
    <h3 className='text-red-400 text-xl'>
      Failed to load photos
    </h3>
  )
} else if (userData.length > 0) {
  printUserData = userData.map(function(elem, idx) {
    return (
      <div key={idx}>
        <Pictures elem={elem} />
      </div>
    )
  })
}

  return (
    <div className="bg-black h-screen w-full overflow-auto p-4 text-white flex flex-col">
       <h1 className='fixed'>{index}</h1>
       <div className='flex flex-wrap gap-4 h-full justify-center'>
        {printUserData}
        </div> 
        <div className='flex justify-center items-center gap-5 p-4'>
          <button 
          style={{opacity: index==1?0.5:1}}
          onClick={()=>{
            if(index==1){
              setIndex(1);
            }
            else{
              setIndex(index-1)
              setUserData([]);
            }
          } }className='bg-amber-300 text-black rounded px-4 py-2 font-semibold active:scale-90 cursor-pointer'>Prev</button>
          <h4>Page {index}</h4>
          <button onClick={()=>{
            setIndex(index+1)
            setUserData([]);
          }} className='bg-amber-300 text-black rounded px-4 py-2 font-semibold active:scale-90 cursor-pointer'>Next</button>
        </div>
    </div>
  )
}

export default App
