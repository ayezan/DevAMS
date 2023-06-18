import {useState, useEffect} from 'react'
import React from 'react'
import SkillsModal from './SkillsModal'
import YourForm from './SkillsModal'

const SkillsTable = () => {
  const [editUser, setEditUser] = useState<any>({
    tags: [],
  })
  const [users, setUsers] = useState([
    {
      id: 7,
      cat: 'Management',
      field: 'Digital Marketing',
      tags: ['Social media', 'Content marketing'],
      level: 60,
      certified: 'No',
      image: null,
      imageName: '',
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
      updateExistingUser(userToUpdate)
      setShowModal(true)
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
    // console.log('Add User:', newUser);

    // Perform any other actions with the new user data in the parent component
  }

  const [showModal, setShowModal] = useState(false)

  const openModal = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
    // updateExistingUser(editUser)
    setEditUser({})
  }

  return (
    <>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>My SkillSet</span>
          <span className='text-muted mt-1 fw-semibold fs-7'>Add Skills as you progress</span>
        </h3>
        <div
          className='card-toolbar'
          data-bs-toggle='tooltip'
          data-bs-placement='top'
          data-bs-trigger='hover'
          data-bs-original-title='Click to add a user'
          data-kt-initialized={1}
        >
          <a href='#' className='btn btn-sm btn-light btn-active-primary ' onClick={openModal}>
            <i className='ki-duotone ki-plus fs-2' />
            Add new Skill
          </a>
        </div>
        {showModal && (
          <YourForm
            closeModal={handleClose}
            addUser={handleAddUser}
            editUser={editUser}
            setEditUser={setEditUser}
            updateExistingUser={updateExistingUser}
          />
        )}
      </div>

      <div className='card-body py-3'>
        {/*begin::Table container*/}
        <div className='table-responsive'>
          {/*begin::Table*/}
          <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
            {/*begin::Table head*/}
            <thead>
              <tr className='fw-bold text-muted'>
                <th className='min-w-150px'>Skill Category</th>
                <th className='min-w-150px'>Skill Name</th>
                <th className='min-w-160px'>Tags</th>
                <th className='min-w-100px'>Scale</th>
                <th className='min-w-80px '>Certified</th>
                <th className='min-w-150px text-center'>Image</th>
                <th className='min-w-100px text-end'>Actions</th>
              </tr>
            </thead>
            {/*end::Table head*/}
            {/*begin::Table body*/}
            <tbody>
              {users.map((user) => (
                <tr>
                  <td>
                    <div className='d-flex align-items-center'>
                      <div className='symbol symbol-45px me-5'>
                        <i className='fa-solid fa-screwdriver-wrench'></i>
                      </div>
                      <div className='d-flex justify-content-start flex-column'>
                        <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                          {user.cat}
                        </a>
                      </div>
                    </div>
                  </td>
                  <td>
                    {user.field && (
                      <>
                        <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                          {user.field}
                        </a>
                      </>
                    )}
                  </td>

                  <td>
                    {user.tags &&
                      user.tags.map((value) => (
                        <>
                          <span className='badge badge-secondary fw-semibold me-1'>{value}</span>
                        </>
                      ))}
                  </td>

                  <td style={{width: '100px'}}>
                    <div className='d-flex flex-column me-2'>
                      <div className='d-flex flex-stack mb-2'>
                        <span className='text-muted me-2 fs-7 fw-bold'>{user.level}</span>
                      </div>
                      <div className='progress h-6px '>
                        <div
                          className='progress-bar bg-primary'
                          role='progressbar'
                          style={{width: `${user.level}%`}}
                          aria-valuenow={user.level}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </td>

                  <td className='text-center pe-5'>{user.certified}</td>

                  <td className='text-end'>
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
                  <td>
                    <div className='d-flex justify-content-end flex-shrink-0'>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                      >
                        <i
                          className='ki-duotone ki-pencil fs-2'
                          onClick={() => handleEditUser(user.id)}
                        >
                          <span className='path1' />
                          <span className='path2' />
                        </i>
                      </a>
                      <a
                        href='#'
                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                      >
                        <i
                          className='ki-duotone ki-trash fs-2'
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <span className='path1' />
                          <span className='path2' />
                          <span className='path3' />
                          <span className='path4' />
                          <span className='path5' />
                        </i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/*end::Table*/}
        </div>
        {/*end::Table container*/}
      </div>
    </>
  )
}

export default SkillsTable

{
  /* <tr>
            <td>
              <div className='form-check form-check-sm form-check-custom form-check-solid'>
                <input
                  className='form-check-input widget-9-check'
                  type='checkbox'
                  defaultValue={1}
                />
              </div>
            </td>
            <td>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-45px me-5'>
                  <i className='fa-solid fa-pen-ruler'></i>
                </div>
                <div className='d-flex justify-content-start flex-column'>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    Math
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    If Applicable
                  </span>
                </div>
              </div>
            </td>
            <td>
              <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                General
              </a>
              <span className='text-muted fw-semibold text-muted d-block fs-7'>Required</span>
            </td>
            <td className='text-end'>
              <div className='d-flex flex-column w-100 me-2'>
                <div className='d-flex flex-stack mb-2'>
                  <span className='text-muted me-2 fs-7 fw-bold'>70%</span>
                </div>
                <div className='progress h-6px w-100'>
                  <div
                    className='progress-bar bg-danger'
                    role='progressbar'
                    style={{width: '70%'}}
                    aria-valuenow={70}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-end flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-switch fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-pencil fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <i className='ki-duotone ki-trash fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                    <span className='path3' />
                    <span className='path4' />
                    <span className='path5' />
                  </i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='form-check form-check-sm form-check-custom form-check-solid'>
                <input
                  className='form-check-input widget-9-check'
                  type='checkbox'
                  defaultValue={1}
                />
              </div>
            </td>
            <td>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-45px me-5'>
                  <i className='bi bi-microsoft-teams'></i>
                </div>
                <div className='d-flex justify-content-start flex-column'>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    Management
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    If Applicable
                  </span>
                </div>
              </div>
            </td>
            <td>
              <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                General
              </a>
              <span className='text-muted fw-semibold text-muted d-block fs-7'>Required</span>
            </td>
            <td className='text-end'>
              <div className='d-flex flex-column w-100 me-2'>
                <div className='d-flex flex-stack mb-2'>
                  <span className='text-muted me-2 fs-7 fw-bold'>60%</span>
                </div>
                <div className='progress h-6px w-100'>
                  <div
                    className='progress-bar bg-success'
                    role='progressbar'
                    style={{width: '60%'}}
                    aria-valuenow={60}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-end flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-switch fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-pencil fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <i className='ki-duotone ki-trash fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                    <span className='path3' />
                    <span className='path4' />
                    <span className='path5' />
                  </i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='form-check form-check-sm form-check-custom form-check-solid'>
                <input
                  className='form-check-input widget-9-check'
                  type='checkbox'
                  defaultValue={1}
                />
              </div>
            </td>
            <td>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-45px me-5'>
                  <i className='bi bi-speaker'></i>
                </div>
                <div className='d-flex justify-content-start flex-column'>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    Communication Skills
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Oral Communication
                  </span>
                </div>
              </div>
            </td>
            <td>
              <div className='badge badge-light-primary'>English</div>
              <div className='badge badge-light-info'>Urdu</div>
              <div className='badge badge-light-success'>Arabic</div>
            </td>
            <td className='text-end'>
              <div className='d-flex flex-column w-100 me-2'>
                <div className='d-flex flex-stack mb-2'>
                  <span className='text-muted me-2 fs-7 fw-bold'>50%</span>
                </div>
                <div className='progress h-6px w-100'>
                  <div
                    className='progress-bar bg-warning'
                    role='progressbar'
                    style={{width: '50%'}}
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-end flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-switch fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-pencil fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <i className='ki-duotone ki-trash fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                    <span className='path3' />
                    <span className='path4' />
                    <span className='path5' />
                  </i>
                </a>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className='form-check form-check-sm form-check-custom form-check-solid'>
                <input
                  className='form-check-input widget-9-check'
                  type='checkbox'
                  defaultValue={1}
                />
              </div>
            </td>
            <td>
              <div className='d-flex align-items-center'>
                <div className='symbol symbol-45px me-5'>
                  <i className='fa-solid fa-lightbulb'></i>
                </div>
                <div className='d-flex justify-content-start flex-column'>
                  <a href='#' className='text-dark fw-bold text-hover-primary fs-6'>
                    Problem Solving
                  </a>
                  <span className='text-muted fw-semibold text-muted d-block fs-7'>
                    Problem identification and solving skills
                  </span>
                </div>
              </div>
            </td>
            <td>
              <a href='#' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                General
              </a>
              <span className='text-muted fw-semibold text-muted d-block fs-7'>Required</span>
            </td>
            <td className='text-end'>
              <div className='d-flex flex-column w-100 me-2'>
                <div className='d-flex flex-stack mb-2'>
                  <span className='text-muted me-2 fs-7 fw-bold'>90%</span>
                </div>
                <div className='progress h-6px w-100'>
                  <div
                    className='progress-bar bg-info'
                    role='progressbar'
                    style={{width: '90%'}}
                    aria-valuenow={90}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            </td>
            <td>
              <div className='d-flex justify-content-end flex-shrink-0'>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-switch fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                >
                  <i className='ki-duotone ki-pencil fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                  </i>
                </a>
                <a
                  href='#'
                  className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                >
                  <i className='ki-duotone ki-trash fs-2'>
                    <span className='path1' />
                    <span className='path2' />
                    <span className='path3' />
                    <span className='path4' />
                    <span className='path5' />
                  </i>
                </a>
              </div>
            </td>
          </tr> */
}
