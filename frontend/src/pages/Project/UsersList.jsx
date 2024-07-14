import React from 'react';
import { TrashIcon, CommandLineIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';
import AuthSerice from "../../api/auth"
import { useEffect } from 'react';

const people = [
  {
      "_id": "66938e63a294e51e8253f404",
      "user": {
          "uid": "LKfnpanu1UZrc07eu7aJHCtdDfc2",
          "email": "abhishtchouhan@gmail.com",
          "emailVerified": false,
          "displayName": "Unknown",
          "photoURL": null,
          "phoneNumber": null,
          "disabled": false,
          "metadata": {
              "creationTime": "Sun, 14 Jul 2024 08:37:53 GMT",
              "lastSignInTime": null,
              "lastRefreshTime": null
          },
          "providerData": [
              {
                  "uid": "abhishtchouhan@gmail.com",
                  "displayName": "Unknown",
                  "email": "abhishtchouhan@gmail.com",
                  "photoURL": null,
                  "providerId": "password",
                  "phoneNumber": null
              }
          ],
          "passwordHash": null,
          "passwordSalt": null,
          "tokensValidAfterTime": "Sun, 14 Jul 2024 08:37:53 GMT",
          "tenantId": null
      },
      "workspace_id": 1,
      "role": "admin"
  },
  {
      "_id": "6693933022909e1158fcd296",
      "user": {
          "uid": "pu5hwEI4y5cSdQO3bQStXvjDJxJ2",
          "email": "prayag@gmail.com",
          "emailVerified": false,
          "displayName": "Unknown",
          "photoURL": null,
          "phoneNumber": null,
          "disabled": false,
          "metadata": {
              "creationTime": "Sun, 14 Jul 2024 08:58:22 GMT",
              "lastSignInTime": null,
              "lastRefreshTime": null
          },
          "providerData": [],
          "passwordHash": null,
          "passwordSalt": null,
          "tokensValidAfterTime": "Sun, 14 Jul 2024 08:58:22 GMT",
          "tenantId": null
      },
      "workspace_id": 1,
      "role": "librarian"
  }
]


export default function UsersList({ project }) {
  const navigate = useNavigate();

  const [ email, setEmail ] = React.useState('')
  const [ role, setRole ] = React.useState('admin')

  const [people, setPeople] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await AuthSerice.fetchUsers()
      setPeople(users)
    }
    fetchUsers()
  }, [])



  const handleAddUserSumit = async() => {
    const user = await AuthSerice.addUser({email, role})
    console.log(user)
    window.location.reload()
  }



  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
      {open && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Add User</h2>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setOpen(false)}
              >
                <span className="sr-only">Close</span>
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-4">
              <form>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <div className="mt-1">
                    <select
                      id="role"
                      name="role"
                      onChange={(e) => setRole(e.target.value)}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="admin">admin</option>
                      <option value="librarian" >librarian</option>
                      <option value="user">user</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault()
                      handleAddUserSumit()
                    }}
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Add user
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title, email and role.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Title
              </th>
              {/* <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Authors
              </th> */}
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Role
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Created At
              </th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {people.map((person) => (
              <tr key={person.email}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {person.user.email}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.role}
                </td>
                {/* <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.volumeInfo.publishedDate}
                </td> */}
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell ">
                  {person.user.metadata.creationTime}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {person.read_count}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Describe<span className="sr-only">, {person.name}</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
