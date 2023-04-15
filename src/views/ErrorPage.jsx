import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className='not-found'>
    <h3>Ooops something went wrong while fetching the information you requested. Go back <Link to="/"><b>Home</b></Link></h3>
    </div>
  )
}
