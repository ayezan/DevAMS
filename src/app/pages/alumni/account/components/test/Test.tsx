import {useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'


interface TestProps {
  closeModal: () => void;
  addUser: (newUser: any) => void;
  editUser: any;

  setEditUser: (user: any) => void;
  updateExistingUser:(user: any) => void;
}

function Test({ closeModal, addUser,editUser,setEditUser, updateExistingUser }: TestProps) {
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [formData, setFormData] = useState(editUser);



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
    e.preventDefault();

    if (editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        role: formData.role,
        company: formData.company,
        status: formData.status,
        startDate: formData.startDate,
        endDate: formData.endDate,
      };

      console.log(updatedUser);
      setEditUser(updatedUser);
      updateExistingUser(updatedUser);
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
      };
      addUser(newUser);
    }

    // Reset the form data and close the modal
    setFormData({
      role: '',
      company: '',
      status: '',
      startDate: '',
      endDate: '',
    });
    closeModal();
  };

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Work Experience</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Post Held</Form.Label>
              <Form.Control type='text' name='role' value={formData.role} onChange={handleChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label> Department Office</Form.Label>
              <Form.Control
                type='text'
                value={formData.company}
                name='company'
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='status'>
              <Form.Label>Nature of Job </Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-3'
                value={formData.status}
                name='status'
                onChange={handleChange}
              >
                <option value={'Federal Government'}>Federal Government</option>
                <option value={"Provincial Government"}>Provincial Government</option>
                <option value={3}>Armed Forces</option>
                <option value={4}>Semi Government</option>
                <option value={5}>Private</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId='natureOfJob'>
              <Form.Label>Job Status</Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-2'
                name='natureOfJob'
                onChange={handleChange}
              >
                <option value={1}>Temporary</option>
                <option value={2}>Officiating</option>
                <option value={3}>Contract</option>
                <option value={4}>Ad-Hoc</option>
                <option value={5}>Daily Wages</option>
                <option value={6}>Honorary</option>
                <option value={7}>Part Time</option>
                <option value={8}>Apprentice</option>
                <option value={9}>Permanent</option>
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

export default Test
