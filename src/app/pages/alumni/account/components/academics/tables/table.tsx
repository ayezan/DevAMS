import React from 'react'
import {useState, useEffect} from 'react'

import {AcademicModal} from '../AcademicModal'
import MyForm from '../../modal/abc'
// import { Buffer } from 'buffer';

interface TableProps {
  title: string
  head1: string
  head2: string
  head3: string
}

const Table: React.FC<TableProps> = (props) => {
  const [showModal, setShowModal] = useState(false)

  const [users, setUsers] = useState([
    {
      id: 7,
      level: 'College',
      title: 'OOP',
      area: 'Science',
      institute: 'Seven Oaks HighSchool',
      location: 'Karachi',
      duration: '2010-2012',
      score: '2nd Division',
      status: 'Completed',
      image: null,
      imageName: '',
    },
  ])

  const [editUser, setEditUser] = useState<any>({})

  const updateExistingUser = (updatedUser: any) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.id === updatedUser.id) {
          return {...user, ...updatedUser}
        }
        return user
      })
    })
  }

  useEffect(() => {
    console.log(users) // Log the users state whenever it changes
  }, [users])

  const handleEditUser = (userId: number) => {
    // Find the user with the matching id
    const userToUpdate = users.find((user) => user.id === userId)

    if (userToUpdate) {
      console.log(userToUpdate)
      // Perform the edit operation on the user (e.g., open a modal for editing)
      updateExistingUser(userToUpdate)

      setEditUser(userToUpdate)

      setShowModal(true)
      console.log(userToUpdate)
    }
  }

  const handleDeleteUser = (userId: number) => {
    // Filter out the user with the matching id
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
    console.log('Delete User:', userId)
  }

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser])
  }

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditUser({})
  }

  return (
    <>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Academics</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Add degrees and certifications</span>
        </h3>

        <div className='card-toolbar'>
          <a href='#' className='btn btn-sm btn-light-primary' onClick={openModal}>
            <i className='ki-duotone ki-plus fs-2' />
            Add New {props.head3} Record
          </a>

          {/* <a href='#' className='btn btn-sm btn-light-primary' onClick={openModal}>
              <i className='ki-duotone ki-plus fs-2' />
               Add New Certification Record
            </a> */}
        </div>
      </div>
      <div className='card-body py-3'>
        <span className='card-label fs-3'>{props.title}</span>

        {/* begin::Table container */}
        <div className='table-responsive'>
          {/* begin::Table */}
          <table className='table align-middle gs-0 gy-4 mt-2'>
            {/* begin::Table head */}
            <thead>
              <tr className='fw-bold text-muted bg-light'>
                <th className='ps-4 min-w-155px rounded-start'>{props.head1}</th>
                <th className='min-w-115px'>{props.head2}</th>
                <th className='min-w-130px'>Institute</th>
                <th className='min-w-120px'>Location</th>
                <th className='min-w-115px'>Duration</th>
                {props.head3 === 'Academic' ? <th className='min-w-115px'>Score</th> : null}
                <th className='min-w-120px'>Status</th>
                <th className='min-w-115px '>Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}
            {/* begin::Table body */}
            <tbody>
              {users.map((user) => (
                <tr>
                  {props.head3 === 'Academic' ? (
                    <>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div
                            className='symbol symbol-35px symbol-circle ms-3 me-2'
                            data-bs-toggle='tooltip'
                          >
                            <span className='symbol-label bg-secondary text-inverse-warning fw-bold'>
                              {user.level && user.level.charAt(0)}
                            </span>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <a
                              href='#'
                              className='text-danger fw-bold text-hover-primary mb-1 fs-6'
                            >
                              {user.level}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        <a
                          href='#'
                          className='text-danger fw-bold text-hover-primary d-block mb-1 fs-6'
                        >
                          {user.area}
                        </a>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div
                            className='symbol symbol-35px symbol-circle ms-3 me-2'
                            data-bs-toggle='tooltip'
                          >
                            <span className='symbol-label bg-secondary text-inverse-warning fw-bold'>
                              {user.title && user.title.charAt(0)}
                            </span>
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                            <a
                              href='#'
                              className='text-danger fw-bold text-hover-primary mb-1 fs-6'
                            >
                              {user.title}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td>
                        {user.image && (
                          <a
                            href={URL.createObjectURL(user.image)}
                            target='_blank'
                            className='text-danger fw-bold text-hover-primary d-block mb-1 fs-6'
                          >
                            <span>{user.imageName || ''}</span>
                          </a>
                        )}
                      </td>
                    </>
                  )}

                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {user.institute}
                    </a>
                  </td>
                  <td>
                    <a href='#' className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'>
                      {user.location}
                    </a>
                  </td>
                  <td>{user.duration}</td>

                  {props.head3 === 'Academic' ? <td>{user.score}</td> : null}

                  <td>
                    <span className='badge badge-success fs-7 fw-bold'>{user.status} </span>
                  </td>

                  <td role='cell' className=' min-w-100px'>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={() => handleEditUser(user.id)}
                    >
                      Edit
                    </a>
                    <a
                      href='#'
                      className='btn btn-light btn-active-light-primary btn-sm'
                      data-kt-menu-trigger='click'
                      data-kt-menu-placement='bottom-end'
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* end::Table */}
        </div>
        {showModal && props.head3 == 'Academic' ? (
          <AcademicModal
            heading='Academic'
            closeModal={closeModal}
            addUser={handleAddUser}
            editUser={editUser}
            setEditUser={setEditUser}
            updateExistingUser={updateExistingUser}
          />
        ) : (
          showModal && (
            <AcademicModal
              heading='Certification'
              closeModal={closeModal}
              addUser={handleAddUser}
              editUser={editUser}
              setEditUser={setEditUser}
              updateExistingUser={updateExistingUser}
            />
          )
        )}
      </div>
    </>
  )
}

export default Table
