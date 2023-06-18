import {useState, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Option from '../Option'

interface TestProps {
  closeModal: () => void
  addUser: (newUser: any) => void
  editUser: any

  setEditUser: (user: any) => void
  updateExistingUser: (user: any) => void
}

function ModalWork({closeModal, addUser, editUser, setEditUser, updateExistingUser}: TestProps) {
 

  const [formData, setFormData] = useState(editUser)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        role: formData.role,
        company: formData.company,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
      }

      console.log(updatedUser)
      setEditUser(updatedUser)
      updateExistingUser(updatedUser)
      // Example: updateExistingUser(updatedUser);

      // Reset the editUser state
    } else {
      // Perform add operation with the formData for the new user
      const newUser = {
        id: Math.floor(Math.random() * 89) + 1,
        role: formData.role,
        company: formData.company,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
      }
      addUser(newUser)
    }

    // Reset the form data and close the modal
    setFormData({
      role: '',
      company: '',
      status: '',
      startDate: '',
      endDate: '',
    })
    closeModal()
  }

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Role</Form.Label>
              <Form.Control type='text' name='role' value={formData.role} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label> Company</Form.Label>
              <Form.Control
                type='text'
                value={formData.company}
                name='company'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='natureOfJob'>
              <Form.Label>Nature of Job </Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-3'
                name='natureOfJob'
                onChange={handleChange}
              >
                <option value={'Federal Government'}>Federal Government</option>
                <option value={'Provincial Government'}>Provincial Government</option>
                <option value={'Armed Forces'}>Armed Forces</option>
                <option value={'Semi Government'}>Semi Government</option>
                <option value={'Private'}>Private</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='status'>
              <Form.Label>Job Status</Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-2'
                name='status'
                value={formData.status}
                onChange={handleChange}
              >
                <Option val={'Temporary'} />
                <Option val={'Officiating'} />
                <Option val={'Contract'} />
                <Option val={'Ad-Hoc'} />
                <Option val={'Daily Wages'} />
                <Option val={'Honorary'} />
                <Option val={'Part Time'} />
                <Option val={'Apprentice'} />
                <Option val={'Permanent'} />

               
              </Form.Select>
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Post Starting Date</Form.Label>
              <Form.Control
                type='date'
                value={formData.startDate}
                name='startDate'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className='mb-2' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Post Ending Date</Form.Label>
              <Form.Control
                type='date'
                value={formData.endDate}
                name='endDate'
                onChange={handleChange}
              />
            </Form.Group>

            <div className=' text-center'>
              <Button type='submit' className='btn btn-primary me-2 mt-2'>
                {editUser.id ? 'Update User' : 'Add User'}
                {/* Save Changes */}
              </Button>
              <Button className='btn btn-secondary mt-2 ' onClick={closeModal}>
                Close
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalWork
