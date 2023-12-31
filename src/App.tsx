import { useEffect, useRef, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showRowColors, setShowRowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const [filterCountry, setFilterCountry] = useState('')
  const originalUsers = useRef<User[]>([])

  const toggleColors = () => {
    setShowRowColors(prevState => !prevState)
  }

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  const handleDelete = (uuid: string) => {
    const filteredUsers = users.filter(user => user.login.uuid !== uuid)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setSortByCountry(false)
    setUsers(originalUsers.current)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=100')
      .then(response => response.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const filteredUsers = filterCountry.length !== 0
    ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    })
    : users

  const sortedUSers = sortByCountry
    ? filteredUsers.toSorted((a, b) => a.location.country.localeCompare(b.location.country))
    : filteredUsers

  return (
    <>
      <header>
        <h1>User&apos;s List</h1>
        <div className="menu-container">
          <button onClick={toggleColors}>Color rows</button>
          <button onClick={toggleSortByCountry}>Order by country</button>
          <button onClick={handleReset}>Reset list</button>
          <input
            placeholder="Filter by country"
            type="text"
            onChange={(e) => {
              setFilterCountry(e.target.value)
            }} />
        </div>
      </header>
      <main>
        <UsersList
          users={sortedUSers}
          showRowColors={showRowColors}
          deleteUser={handleDelete}
        />
      </main>
    </>
  )
}

export default App
