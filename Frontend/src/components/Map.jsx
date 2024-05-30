import React from 'react'
import SidePanel from './SidePanel'
import Geolocation from './Geolocation'

const Map = () => {
  return (
    <div className='flex'>
      <div>
         <SidePanel />
      </div>
      <div>
         <Geolocation />
      </div>
    </div>
  )
}

export default Map
