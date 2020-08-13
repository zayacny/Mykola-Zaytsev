import axios from 'axios'

const fetchUsers = async () => {
  const { data } = await axios.get('http://localhost:3000/api/users')
  return data
}

const fetchCompanies = async () => {
  const { data } = await axios.get('http://localhost:3000/api/companies')
  return data
}

const getUser = async (id) => {
  const user = await axios.get(`http://localhost:3000/api/users/${id}`)
  console.log('USER DATA FROM GETUSER in user js : ', user.data)
  return user.data
}

const saveUser = async (user, photoFile) => {
  const { data } = await axios.post('http://localhost:3000/api/users', { name: user.name, company: user.company, photo: photoFile.name, userID: user._id })
  console.log('saveUser data User.js : ', data)
  return data
}

const edit = async (user, photoFile) => {
  const { data } = await axios.put(`http://localhost:3000/api/users/${user._id}/`, { name: user.name, company: user.company, photoName: photoFile.name })
  return data
}
const del = async (userID) => {
  const { data } = await axios.delete(`http://localhost:3000/api/users/${userID}/`)
  return data
}

const serverUpload = (photoFile, user) => {
  const formData = new FormData() // eslint-disable-line
  formData.append('photoFile', photoFile)
  if (user._id) {
    formData.append('userID', user._id)
  }
  return axios.post('http://localhost:3000/uploads',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => { console.log(' Photo upload Success') })
    .catch(() => { console.log('We have a problem with upload') })
}
export {
  edit,
  del,
  saveUser,
  fetchUsers,
  fetchCompanies,
  getUser,
  serverUpload
}
