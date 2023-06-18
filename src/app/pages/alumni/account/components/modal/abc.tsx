import React, {ChangeEvent, useRef, useState} from 'react'

import CreatableSelect from 'react-select/creatable'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import moment from 'moment'

interface Option {
  qualification: string[]
  areas: string[]
  scoreType: string
  score: string[]
}


interface TargetModalProps {
    closeModal: () => void
    addUser: (newUser: any) => void
    editUser: any
    heading: String
    setEditUser: (user: any) => void
    updateExistingUser: (user: any) => void
  }

const MyForm :React.FC<TargetModalProps> = ({
    closeModal,
    addUser,
    editUser,
    heading,
    setEditUser,
    updateExistingUser,


}) => {

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
        e.preventDefault()
    
        if (editUser.id) {
          // Perform update operation with the formData for the existing user
          const updatedUser = {
            ...editUser,
            level: formData.level,
            area: formData.area,
            institute: formData.institute,
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.endDate,
            duration: duration(),
            score: formData.score,
            status: formData.status,
            image: formData.image,
            imageName: formData.image,
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
            level: formData.level,
            area: formData.area,
            institute: formData.institute,
            location: formData.location,
            startDate: formData.startDate,
            endDate: formData.endDate,
            duration: duration(),
            score: formData.score,
            status: formData.status,
            image: formData.image,
            imageName: formData.imageName,
          }
          addUser(newUser)
        }
    
        // Reset the form data and close the modal
        setFormData({
          id: 88,
          level: '',
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

      const duration = () => {
        const c = moment(formData.endDate).diff(moment(formData.startDate), 'months')
        const d = new Date(formData.endDate).getFullYear()
        const e = new Date(formData.startDate).getFullYear()
        const f = d - e
        console.log(c, d, e, f)
        return c + ('months(' + d + '-' + e + ')')
      }





  const [Qualific, setQualific] = useState('BS')
  const gradeScale = ['A', 'B', 'C']
  const cgpaScale = ['2', '2.3', '2.7', '3', '3.3', '3.7', '4']
  const GradingCriteria: Option[] = [
    {
      qualification: ['BS', 'MS'],

      areas: ['CS', 'DS', 'SE', 'AI', 'PY', 'EN', 'IR'],

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
      qualification: ['BBA', 'MBA'],

      areas: ['BBA', 'MBA'],

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

      areas: ['Biology', 'Maths', 'Pre-Engineering', 'Computer Science'],

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
    console.log('working..')
    if (findQualification) {
      return findQualification[x as keyof Option]
    }
    return []
  }

  return (
    <Modal show={true} >
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Select
              name='Qualification'
              key='Qualification'
              value={formData.level}
              onChange={(e) => {
                setQualific(e.target.value)
                handleChange(e)
              }}
            >
              {GradingCriteria.map((x) =>
                x.qualification.flat().map((x) => <option value={x}>{x}</option>)
              )}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Select name='Area' key='Area' value={formData.area} onChange={handleChange}> 
              {(getAnyOptions('areas') as string[]).map((x) => (
                <option value={x}>{x}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Select name='ScoreMode' key='ScoreMode'>
              <option value={getAnyOptions('scoreType')}>{getAnyOptions('scoreType')}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Select name='Score' key='Score'  value={formData.score} onChange={handleChange}>
              {(getAnyOptions('score') as string[]).map((x) => (
                <option value={x}>{x}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  )
}

export default MyForm;


// interface YourFormValuesType {
//   cat: string
//   field: string | string[]
//   tags: string[]
//   level: number
//   certified: Certification
//   image: File | null
//   imageName: string
//   // Add more fields as needed
// }

// const validationSchema = Yup.object().shape({
//   category: Yup.string().required('Skill category is required'),
//   field: Yup.string().required('Skill name is required'),
//   tags: Yup.array().required('Additional info is required'),
//   level: Yup.number()
//     .typeError('Proficiency level must be a number')
//     .required('Proficiency level is required')
//     .min(0, 'Proficiency level must be at least 0')
//     .max(100, 'Proficiency level cannot exceed 100'),
//   certified: Yup.string().required('Certification is required'),
//   image: Yup.mixed().test('imageRequired', 'Image is required', function (value) {
//     const certified = this.resolve(Yup.ref('certified'))
//     if (certified === Certification.Yes) {
//       return value !== undefined && value !== null
//     }
//     return true
//   }),
// })
// const initialValues: YourFormValuesType = {
//   ...editUser,
//   cat: Category || '',
//   field: formData.field || '',
//   tags: tagsArr || [],
//   level: formData.level || 0,
//   certified: formData.certified || Certification.No,
//   image: formData.image || null,
//   imageName: selectedFile?.name || '',
//   // Initialize additional fields
// }


// const formik = useFormik({
//   initialValues,
//   validationSchema,
//   onSubmit: handleSubmit,
// })
// const {values, handleBlur, errors} = formik










// import {useState, useEffect, ChangeEvent} from 'react'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import Modal from 'react-bootstrap/Modal'
// import Mathdropdown from './Mathdropdown'

// interface TestProps {
//   closeModal: () => void
//   addUser: (newUser: any) => void
//   editUser: any

//   setEditUser: (user: any) => void
//   updateExistingUser: (user: any) => void
// }

// function SkillsModal({closeModal, addUser, editUser, setEditUser, updateExistingUser}: TestProps) {

//   const [formData, setFormData] = useState(editUser);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files
//     if (files && files.length > 0) {
//       const file = files[0]
//       setFormData((prevData: any) => ({
//         ...prevData,
//         image: file,
//       }))
//     }
//   }

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const {name, value} = e.target
//     setFormData((prevFormData: any) => ({
//       ...prevFormData,
//       [name]: value,
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     if (editUser.id) {
//       // Perform update operation with the formData for the existing user
//       const updatedUser = {
//         ...editUser,
//         cat: formData.cat,
//         name: formData.name,
//         level: formData.level,
//         certified: formData.certified,
//       }

//       console.log(updatedUser)
//       setEditUser(updatedUser)
//       updateExistingUser(updatedUser)
//       // Example: updateExistingUser(updatedUser);

//       // Reset the editUser state
//     } else {
//       // Perform add operation with the formData for the new user
//       const newUser = {
//         id: Math.floor(Math.random() * 89) + 1,
//         cat: formData.cat,
//         name: formData.name,
//         level: formData.level,
//         certified: formData.certified,
//       }
//       addUser(newUser)
//     }

//     // Reset the form data and close the modal
//     setFormData({
//       id:4,
//       cat: '',
//       name: '',
//       level: 0,
//       certified:'No',
//     })
//     closeModal()
//   }

//   return (
//     <>
//       <Modal show={true} onHide={closeModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Work Experience</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit}>
//             <Form.Group controlId='cat'>
//               <Form.Label>Skils Category </Form.Label>
//               <Form.Select
//                 className='form-select form-select-solid mb-3'
//                 value={formData.cat}
//                 name='cat'
//                 onChange={handleChange}
//               >
//                 <option value={'Management'}>Management</option>
//                 <option value={'Provincial Government'}>Engineering</option>
//                 <option value={'Math'}>Math</option>
//                 <option value={'Problem Identification & Solving'}>
//                   Problem Identification & Solving
//                 </option>
//                 <option value={'Evaluate & Analyse Data'}>Evaluate & Analyse Data</option>
//                 <option value={'Research Skills'}>Research Skills</option>
//                 <option value={'Ability to link theory to practice'}>
//                   Ability to link theory to practice
//                 </option>
//                 <option value={'Ability to Design a system or process'}>
//                   Ability to Design a system or process
//                 </option>
//                 <option value={'IT Skill'}>IT Skill</option>
//                 <option value={'Oral Communication'}>Oral Communication</option>
//                 <option value={'Report Writing'}>Report Writing</option>
//                 <option value={'Presentation Skills'}>Presentation Skills</option>
//                 <option value={'Team Work'}>Team Work</option>
//                 <option value={'Ability to work in challenging situations'}>
//                   Ability to work in challenging situations
//                 </option>
//                 <option value={'Independant Thinking'}>Independant Thinking</option>
//                 <option value={'Appreciation of Ethical Values'}>
//                   Appreciation of Ethical Values
//                 </option>
//                 <option value={'Resource & Time Management Skills'}>
//                   Resource & Time Management Skills
//                 </option>
//                 <option value={'Judgement'}>Judgement</option>
//                 <option value={'Discipline'}>Discipline</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group controlId='name'>
//               <Form.Label>Skills Name </Form.Label>
//               <Form.Select
//                 className='form-select form-select-solid mb-3'
//                 value={formData.name}
//                 name='name'
//                 onChange={handleChange}
//               >
//                 {formData.cat == 'Math' ? (
//                   <>
//                     <Mathdropdown />
//                   </>
//                 ) : (
//                   <>
//                     <option value={'Federal Government'}>Federal Government</option>
//                     <option value={'Provincial Government'}>Provincial Government</option>
//                     <option value={3}>Armed Forces</option>
//                     <option value={4}>Semi Government</option>
//                     <option value={5}>Private</option>
//                   </>
//                 )}
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
//               <Form.Label>Level</Form.Label>
//               <Form.Control
//                 type='number'
//                 name='level'
//                 value={formData.level}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group>
//               <Form.Label>Certified </Form.Label>
//               <Form.Select
//                 className='form-select form-select-solid mb-3'
//                 value={formData.certified}
//                 name='certified'
//                 onChange={handleChange}
//               >
//                 <option value={'Yes'}>Yes</option>
//                 <option value={'No'}>No</option>
//               </Form.Select>
//             </Form.Group>

//             {formData.certified == 'Yes' ? (
//               <>
//                 <Form.Group controlId='exampleForm.ControlInput1' className='mb-3'>
//                   <Form.Label>Attach Image</Form.Label>
//                   <Form.Control
//                     type='file'
//                     name='image'
//                     onChange={handleFileChange}
//                     className='form-control-file'
//                   />
//                 </Form.Group>
//               </>
//             ) : null}

//             <div className=' text-center'>
//               <Button type='submit' className='btn btn-primary me-2 mt-2'>
//                 {editUser.id ? 'Update User' : 'Add User'}
//                 {/* Save Changes */}
//               </Button>
//               <Button className='btn btn-secondary mt-2 ' onClick={closeModal}>
//                 Close
//               </Button>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer></Modal.Footer>
//       </Modal>
//     </>
//   )
// }

// export default SkillsModal
