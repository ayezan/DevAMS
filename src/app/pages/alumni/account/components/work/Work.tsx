import React, {useState, useEffect} from 'react'
import ModalWork from './ModalWork'


const Work = () => {
  const [editUser, setEditUser] = useState<any>({})
  const [users, setUsers] = useState([
    {
      id: 1,
      role: 'Java Developer',
      company: 'Systems',
      // status:<div className='badge badge-light-success fw-bolder'>Active</div>,
      status: 'Active',
      startDate: '10 Nov 2022',
      endDate: '10 Nov 2023',
    },
  ])

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
      // updateExistingUser(userToUpdate);
      setEditUser(userToUpdate)
      updateExistingUser(userToUpdate);
      setShowModal(true)
    }
  }

  const handleDeleteUser = (userId: number) => {
    // Filter out the user with the matching id
    const updatedUsers = users.filter((user) => user.id !== userId)
    setUsers(updatedUsers)
    console.log('Delete User:', userId)
  }

  // const handleAddUser = () => {
  //   // Generate a new user object with a unique id
  //   const newUser = {
  //     id: Math.floor((Math.random()*89)+1),
  //     role: 'Business Analyst',
  //     company:"XORD",
  //     status:<div className='badge badge-light-success fw-bolder'>Completed</div>,
  //     startDate: '8 Nov 2012',
  //     endDate: '10 Oct 2014',
  //   };
  //   setUsers([...users, newUser]);
  //   console.log('Add User:', newUser);
  // };

  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser])
    // console.log('Add User:', newUser);

    // Perform any other actions with the new user data in the parent component
  }

  const [showModal, setShowModal] = useState(false)

  
  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    // updateExistingUser(editUser)
    setEditUser({})
  }
  return (
    <div className='card'>
      <div className='card-header border-0 pt-6'>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <button type='button' className='btn btn-primary' onClick={openModal}>
              <i className='ki-duotone ki-plus fs-2' />
              Add Work Experience
            </button>
          </div>
        </div>
      </div>
      <div className='card-body py-4'>
        <div className='table-responsive'>
          <table
            id='kt_table_users'
            className='table align-middle table-row-dashed fs-6 gy-5 dataTable no-footer'
            role='table'
          >
            <thead>
              <tr className='text-start text-muted fw-bolder fs-7 text-uppercase gs-0'>
               
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  S.NO
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{cursor: 'pointer'}}
                >
                  Role
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{cursor: 'pointer'}}
                >
                  Company
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{cursor: 'pointer'}}
                >
                  Status
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-125px'
                  style={{cursor: 'pointer'}}
                >
                  Start Date
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  End Date
                </th>
                <th
                  colSpan={1}
                  role='columnheader'
                  className='text-end min-w-100px'
                  style={{cursor: 'pointer'}}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className='text-gray-600 fw-bold' role='rowgroup'>
              {users.map((user) => (
                <tr key={user.id} role='row'>
                
                  <td role='cell' className=''>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'></div>
                      <div className='d-flex flex-column'>
                        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
                          {user.id}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td role='cell' className=''>
                    {user.role}
                  </td>
                  <td role='cell' className=''>
                    {user.company}
                  </td>
                  <td role='cell' className=''>
                    {user.status}
                  </td>
                  <td role='cell' className=''>
                    {user.startDate}
                  </td>

                  <td role='cell' className=''>
                    {user.endDate}
                  </td>
                  <td role='cell' className='text-end min-w-100px'>
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
        </div>
      </div>
      {showModal && (
        <ModalWork
          closeModal={closeModal}
          addUser={handleAddUser}
          editUser={editUser}
          setEditUser={setEditUser}
          updateExistingUser={updateExistingUser}
        />
      )}
    </div>
  )
}

export default Work
