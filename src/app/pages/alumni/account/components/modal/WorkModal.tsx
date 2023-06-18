import React, {ChangeEvent, useEffect, useRef, useState} from 'react'

import CreatableSelect from 'react-select/creatable'
import {ActionMeta} from 'react-select'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'

enum Certification {
  Yes = 'Yes',
  No = 'No',
}

type OptionType = {
  label: string
  value: string
}

interface Option {
  category: string[]
  field: string[]
}

interface TargetModalProps {
  closeModal: () => void
  addUser: (newUser: any) => void
  editUser: any
  setEditUser: (user: any) => void
  updateExistingUser: (user: any) => void
}

const MyForm: React.FC<TargetModalProps> = ({
  closeModal,
  addUser,
  editUser,
  setEditUser,
  updateExistingUser,
}) => {
  const [formData, setFormData] = useState({...editUser})

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const [Category, setCategory] = useState('Managment')

  const [tagsArr, setTagsArr] = useState<string[]>([])

  const handleTagsChange = (selectedOptions: any) => {
    const lastValue = selectedOptions[selectedOptions.length - 1].value
    setTagsArr((prevTagsArr) => [...prevTagsArr, lastValue])

   
  }

  useEffect(() => console.log(tagsArr), [tagsArr])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target
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

  const GradingCriteria: Option[] = [
    {
      category: ['Management'],

      field: [
        'Operations management',
        'Business',
        'Marketing',
        'HR',
        'Accounting',
        'Finance',
        'Business Analyst',
        'Project Manager',
        'Logistics',
        'Other',
      ],
    },

    {
      category: ['Electrical'],

      field: [
        'Electronic engineering',
        'Computer Engineering',
        'Power engineering',
        'Control engineering',
        'Systems engineering',
        'Telecommunications engineering',
        'Microelectronics',
        'Design Engineer',
        'Test engineer',
        'Other',
      ],
    },

    {
      category: ['Mechanical'],

      field: [
        'Aerospace engineering',
        'Automobile Engineering',
        'Biomedical engineering',
        'Electrical engineer',
        'Manufacturing engineering',
        'Robotics',
        'Mechatronics',
        'Chemical Engineering',
        'Process engineering',
      ],
    },

    {
      category: ['Software'],

      field: [
        'Software Developer',
        'Data science',
        'Quality Assurance',
        'Web Developer',
        'Data Engineer',
        'Information security',
        'Software Architect',
        'Cloud engineering',
        'Systems analyst',
        'Machine learning',
        'Full stack developer',
        'Other',
      ],
    },

    {
      category: ['SoftSkills'],

      field: [
        'Communication',
        'Teamwork',
        'Problem-solving',
        'Time management',
        'Critical thinking',
        'Decision-making',
        'Organizational',
        'Stress management',
        'Research',
        'Evaluate & Analyse',
        'Other',
      ],
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editUser.id) {
      // Perform update operation with the formData for the existing user
      const updatedUser = {
        ...editUser,
        cat: Category,
        field: formData.field,
        tags: tagsArr,
        level: formData.level,
        certified: formData.certified,
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
        cat: Category,
        field: formData.field,
        tags: tagsArr,
        level: formData.level,
        certified: formData.certified,
        image: formData.image || '',
        imageName: selectedFile?.name,
      }
      addUser(newUser)
    }

    // Reset the form data and close the modal
    setFormData({
      id: 0,
      cat: '',
      field: '',
      tags: [],
      level: 0,
      certified: 'No',
      image: null,
      imageName: '',
    })
    closeModal()
  }

  function getAnyOptions(x: string): string | string[] {
    // Get options based on academic selecion
    const findcategory = GradingCriteria.find((item) =>
      item.category.some((it) => {
        return it == Category
      })
    )
    if (findcategory) {
      return findcategory[x as keyof Option]
    }
    return []
  }

  useEffect(() => {
    const defaultQualific = editUser.cat || 'Management'
    const tags = editUser.tags
    // const defaultScore = score || editUser.score || '';
    const defaultImage = editUser.image || null
    setTagsArr(tags)
    console.log(tags)

    setCategory(defaultQualific)
    setSelectedFile(defaultImage)

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      image: selectedFile,
      cat: defaultQualific,
      tags: tagsArr,
    }))
  }, [editUser])

  useEffect(() => {
    const defaultArea = editUser.field || getAnyOptions('field')[0] || ''

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      field: defaultArea,
    }))
  }, [editUser, Category])

  return (
    <Modal show={true}>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-2'>
          <Form.Label>Skill Category</Form.Label>
            <Form.Select
              name='category'
              key='category'
              value={Category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
            >
              {GradingCriteria.map((x) =>
                x.category.flat().map((x) => <option value={x}>{x}</option>)
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-2'>
          <Form.Label>Skill Name</Form.Label>
            <Form.Select name='field' key='field' value={formData.field} onChange={handleChange}>
              {(getAnyOptions('field') as string[]).map((x) => (
                <option value={x}>{x}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className='mb-2'>
          <Form.Label>Additional Info</Form.Label>
            <CreatableSelect
              name='tags'
              value={tagsArr}
              isMulti
              onChange={handleTagsChange}
              placeholder='Input additional info if required'
            />

          </Form.Group>

          <Form.Group className='mb-3' controlId='level'>
            <Form.Label>Proficiency Level(out of 100)</Form.Label>
            <Form.Control
              type='number'
              name='level'
              value={formData.level}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Certified</Form.Label>
            <Form.Select
              className='form-select form-select-solid mb-3'
              value={formData.certified}
              name='certified'
              onChange={handleChange}
            >
              <option value={Certification.No}>{Certification.No}</option>
              <option value={Certification.Yes}>{Certification.Yes}</option>
            </Form.Select>
          </Form.Group>

          {formData.certified === Certification.Yes ? (
            <>
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
            </>
          ) : null}

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
  )
}

export default MyForm
