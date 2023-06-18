import React, { useEffect, useState } from 'react'
import Table from './tables/table'


export function Academics() {

  return (
    <>
      <div className='card mb-5 mb-xl-8'>
        <Table title='Degrees' head1='Level' head2='Area' head3='Academic'  />
        <Table title='Certifications' head1='Title' head2='Reference' head3='Certification'  />
      </div>
    </>
  )
}
