import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'

interface TestProps {
  closeModal: () => void
  addUser: (newUser: any) => void
  editUser: any

  setEditUser: (user: any) => void
  updateExistingUser: (user: any) => void
}

function UserManagmentModal({ closeModal, addUser, editUser, setEditUser, updateExistingUser }: TestProps) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [formData, setFormData] = useState(editUser)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files && event.target.files[0]



    if (file) {

      setSelectedFile(file)

      console.log(file)

      console.log(file.name)

      setFormData((prevFormData: any) => ({

        ...prevFormData,


        image: file,


        imageName: file.name,

      }))

    } else {

      return

    }

  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  // position: 'Senior',
  //   role: 'Java Developer',
  //     LastLogin: 'Today',
  //       twoStep: 'Enabled',
  //         joinedDate: '10 Nov 2022',
  //           online: 'Enabled'
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        position: formData.position,
        LastLogin: formData.LastLogin,
        twoStep: formData.twoStep,
        joinedDate: formData.joinedDate,
        online: formData.online,
        image: selectedFile,
        imageName: selectedFile?.name,

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
        name: formData.name,
        email: formData.email,
        role: formData.role,
        position: formData.position,
        LastLogin: formData.LastLogin,
        twoStep: formData.twoStep,
        joinedDate: formData.joinedDate,
        online: formData.online,
        image: formData.image || '',

        imageName: selectedFile?.name,

      }
      addUser(newUser)
    }

    // Reset the form data and close the modal
    setFormData({
      name: '',
      email: '',
      role: '',
      position: '',
      LastLogin: '',
      twoStep: '',
      joinedDate: '',
      online: '',
      image: null,
      imageName: '',
    })
    closeModal()
  }

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title >Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' name='name' value={formData.name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={formData.email}
                name='email'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='role'>
              <Form.Label>Role </Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-3'
                value={formData.role}
                name='role'
                onChange={handleChange}
              >
                {/* 
                <option value={'Administrator'}>Administrator</option>
                <option value={2}>Analyst</option>
                <option value={3}>Developer</option>
                <option value={4}>Support</option>
                <option value={5}>Trial</option> */}
                <option value={'Administrator'}>Administrator</option>
                <option value={'Analyst'}>Analyst</option>
                <option value={'Developer'}>Developer</option>
                <option value={'Support'}>Support</option>
                <option value={'Trial'}>Trial</option>
              </Form.Select>
            </Form.Group>



            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
              <Form.Label>Joined Date</Form.Label>
              <Form.Control
                type='date'
                value={formData.joinedDate}
                name='joinedDate'
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId='exampleForm.ControlInput1' className='mb-3'>

              <Form.Label>Attach Image</Form.Label>

              <Form.Control

                type='file'

                name='image'

                onChange={handleFileChange}

                className='form-control-file'

              />

              {selectedFile && <p>Selected File: {selectedFile.name}</p>}

            </Form.Group>



            <div className=' text-center'>
              <Button type='submit' className='btn but_brown me-2 mt-2'>
                {editUser.id ? 'Update User' : 'Add User'}
                {/* Save Changes */}
              </Button>
              <Button className='btn but_yellow mt-2 ' onClick={closeModal}>
                Discard
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default UserManagmentModal
