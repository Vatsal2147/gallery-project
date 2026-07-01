import React from 'react'

function Pictures(props) {
   
  return (
    <div>
      <a href={props.elem.url}>
              <div className='h-40 w-44 bg-white rounded-xl overflow-hidden'>
            <img className = 'h-full w-full object-cover rounded-xl'src={props.elem.download_url}></img>
          </div> 
          <h2 className='font-bold text-lg'>{props.elem.author}</h2>
            </a>
    </div>
  )
}

export default Pictures
