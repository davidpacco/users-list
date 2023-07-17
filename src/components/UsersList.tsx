import { type User } from '../types'

interface Props {
  users: User[]
  showRowColors: boolean
  deleteUser: (uuid: string) => void
}

export function UsersList ({ users, showRowColors, deleteUser }: Props) {
  return (
    <table width="100%">
      <thead>
        <tr>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Country</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {
          users.map((user, index) => {
            const bgColor = index % 2 === 0 ? '#333' : '#444'
            const color = showRowColors ? bgColor : ''
            return (
              <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt="" />
                </td>
                <td>{ user.name.first }</td>
                <td>{ user.name.last }</td>
                <td>{ user.location.country }</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user.login.uuid)
                    }}
                    type="button">Delete</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}
