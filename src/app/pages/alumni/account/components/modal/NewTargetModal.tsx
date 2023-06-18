import { useState, useEffect, ChangeEvent } from 'react'
import CreatableSelect from 'react-select/creatable'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Option from '../Option'
import moment from 'moment'

interface TargetModalProps {
  closeModal: () => void
  addUser: (newUser: any) => void
  editUser: any
  heading: String
  setEditUser: (user: any) => void
  updateExistingUser: (user: any) => void
}

interface Option {
  qualification: string[]
  areas: string[]
  scoreType: string
  score: string[]
}

const TargetModal: React.FC<TargetModalProps> = ({
  closeModal,
  addUser,
  editUser,
  heading,
  setEditUser,
  updateExistingUser,
}) => {
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    setFormData(editUser)
  }, [editUser])

  const [Qualific, setQualific] = useState('BS')
  const gradeScale = ['A', 'B', 'C']
  const cgpaScale = ['2', '2.3', '2.7', '3', '3.3', '3.7', '4']

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const GradingCriteria: Option[] = [
    {
      qualification: ['BS', 'MS'],

      areas: ['CS', 'DS', 'SE', 'AI', 'PY', 'EN', 'IR', 'Other'],

      scoreType: 'CGPA',

      score: cgpaScale,
    },

    {
      qualification: ['BE'],

      areas: ['EE', 'ME', 'CE'],

      scoreType: 'CGPA',

      score: cgpaScale,
    },

    {
      qualification: ['BBA'],

      areas: ['BBA'],

      scoreType: 'CGPA',

      score: cgpaScale,
    },

    {
      qualification: ['MBA'],

      areas: [
        'Finance',
        'Accounting',
        'HR',
        'Management',
        'Marketing',
        'Entrepreneurship',
        'Other',
      ],

      scoreType: 'CGPA',

      score: cgpaScale,
    },

    {
      qualification: ['O-level'],

      areas: ['Biology', 'Maths'],

      scoreType: 'Division',

      score: ['1st', '2nd', '3rd', '4th'],
    },

    {
      qualification: ['A-level'],

      areas: ['Pre-Engineering', 'Computer Science'],

      scoreType: 'Division',

      score: ['1st', '2nd', '3rd', '4th'],
    },

    {
      qualification: ['Matriculation'],

      areas: ['Biology', 'Maths'],

      scoreType: 'Grades',

      score: gradeScale,
    },

    {
      qualification: ['College'],

      areas: ['Pre-Engineering', 'Computer Science'],

      scoreType: 'Grades',

      score: gradeScale,
    },
  ]

  function getAnyOptions(x: string): string | string[] {
    // Get options based on academic selecion
    const findQualification = GradingCriteria.find((item) =>
      item.qualification.some((it) => {
        return it == Qualific
      })
    )

    if (findQualification) {
      return findQualification[x as keyof Option]
    }
    return []
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    console.log(name, value)
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        level: Qualific,
        title: formData.title,
        area: formData.area,
        institute: formData.institute,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: duration(),
        score: formData.score,
        status: formData.status,
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
        level: Qualific,
        title: formData.title,
        area: formData.area,
        institute: formData.institute,
        location: formData.location,
        startDate: formData.startDate,
        endDate: formData.endDate,
        duration: duration(),
        score: formData.score,
        status: formData.status || 'In-Progress',
        image: formData.image,
        imageName: selectedFile?.name,
      }
      console.log(newUser)
      addUser(newUser)
    }

    // Reset the form data and close the modal
    setFormData({
      id: 88,
      level: '',
      title: '',
      area: '',
      institute: '',
      startDate: '',
      endDate: '',
      location: '',
      duration: '',
      score: '',
      status: '',
      image: null,
      imageName: '',
    })
    closeModal()
  }

  useEffect(() => {
    const defaultQualific = editUser.level || ''
    const defaultArea = editUser.area || getAnyOptions('areas')[0] || ''
    const defaultScoreType = getAnyOptions('scoreType')[0] || ''
    const defaultScore = editUser.score || getAnyOptions('score')[0] || ''
    const defaultImage = editUser.image || null

    setQualific(defaultQualific)
    setSelectedFile(defaultImage)
    console.log(editUser)
    console.log(editUser.image)
    console.log(defaultQualific, defaultArea, defaultScoreType, defaultScore)

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      image: selectedFile,
      level: defaultQualific,
      area: defaultArea,
      score: defaultScore,
    }))
  }, [editUser])

  const duration = () => {
    const c = moment(formData.endDate).diff(moment(formData.startDate), 'months')
    const d = new Date(formData.endDate).getFullYear()
    const e = new Date(formData.startDate).getFullYear()
    const f = d - e
    console.log(c, d, e, f)
    return c + ('months(' + d + '-' + e + ')')
  }

  return (
    <>
      <Modal show={true} onHide={closeModal}>
        <Modal.Header closeButton>
          {heading == 'Academic' ? (
            <Modal.Title>Add Academic Experience</Modal.Title>
          ) : (
            <Modal.Title>Add Certification Experience</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {heading == 'Academic' ? (
              <>
                <Form.Group>
                  <Form.Label>Qualification</Form.Label>
                  <Form.Select
                    className='mb-2'
                    name='Qualification'
                    key='Qualification'
                    value={Qualific}
                    onChange={(e) => {
                      setQualific(e.target.value)
                    }}
                  >
                    {GradingCriteria.map((x) =>
                      x.qualification.flat().map((x) => <option value={x}>{x}</option>)
                    )}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Area</Form.Label>
                  <Form.Select name='area' key='area' value={formData.area} onChange={handleChange}>
                    {(getAnyOptions('areas') as string[]).map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            ) : (
              <>
                <Form.Group controlId='title'>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId='image' className='mb-3'>
                  <Form.Label>Attach Image</Form.Label>
                  <Form.Control
                    type='file'
                    name='image'
                    onChange={handleFileChange}
                    className='form-control-file'
                  />
                  {selectedFile && <p>Selected File: {selectedFile.name}</p>}
                </Form.Group>
              </>
            )}

            <Form.Group controlId='institute'>
              <Form.Label>Institute</Form.Label>
              <Form.Control
                type='text'
                name='institute'
                value={formData.institute}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='startDate' className='mb-3'>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type='date'
                name='startDate'
                value={formData.startDate}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId='endDate' className='mb-3'>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type='date'
                name='endDate'
                value={formData.endDate}
                onChange={handleChange}
              />
            </Form.Group>

            {heading == 'Academic' ? (
              <>
                <Form.Group>
                  <Form.Label>Score</Form.Label>
                  <Form.Select name='ScoreMode' key='ScoreMode'>
                    <option value={getAnyOptions('scoreType')}>{getAnyOptions('scoreType')}</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Select
                    name='score'
                    key='score'
                    value={formData.score}
                    onChange={handleChange}
                  >
                    {(getAnyOptions('score') as string[]).map((x) => (
                      <option value={x}>{x}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </>
            ) : null}

            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Select
                className='form-select form-select-solid mb-2'
                name='status'
                value={formData.status}
                onChange={handleChange}
              >
                <option value={'In-Process'}>In-Process</option>
                <option value={'Completed'}>Completed</option>
                <option value={'Planned'}>Planned</option>
              </Form.Select>
            </Form.Group>



            <div className=' text-center'>
              <Button type='submit' className='btn btn-primary me-2 mt-2'>
                {editUser.id ? 'Update User' : 'Add User'}
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

export { TargetModal }
