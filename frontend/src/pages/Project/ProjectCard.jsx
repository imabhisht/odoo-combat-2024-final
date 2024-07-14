import React from 'react';
import { TrashIcon, CommandLineIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...

        // {
        //     "_id": "66935c251ac311c3107e932d",
        //     "kind": "books#volume",
        //     "id": "53c8c5dc-6328-4e27-8f53-bc49a091ba62",
        //     "etag": null,
        //     "selfLink": null,
        //     "volumeInfo": {
        //         "title": "Sample Book",
        //         "authors": [
        //             "Mantavy Gajjar"
        //         ],
        //         "publishedDate": "2017-10-06",
        //         "description": "Sample Desc",
        //         "industryIdentifiers": [
        //             {
        //                 "type": "ISBN_10",
        //                 "identifier": "1787123421"
        //             },
        //             {
        //                 "type": "ISBN_13",
        //                 "identifier": "9781787123427"
        //             }
        //         ],
        //         "readingModes": {
        //             "text": false,
        //             "image": false
        //         },
        //         "pageCount": 806,
        //         "printType": "BOOK",
        //         "maturityRating": "NOT_MATURE",
        //         "allowAnonLogging": false,
        //         "contentVersion": null,
        //         "panelizationSummary": {
        //             "containsEpubBubbles": false,
        //             "containsImageBubbles": false
        //         },
        //         "imageLinks": {
        //             "smallThumbnail": null,
        //             "thumbnail": null
        //         },
        //         "language": "en",
        //         "previewLink": null,
        //         "infoLink": null,
        //         "canonicalVolumeLink": null
        //     },
        //     "saleInfo": {
        //         "country": "IN",
        //         "saleability": "NOT_FOR_SALE",
        //         "isEbook": false
        //     },
        //     "accessInfo": {
        //         "country": "IN",
        //         "viewability": "NO_PAGES",
        //         "embeddable": false,
        //         "publicDomain": false,
        //         "textToSpeechPermission": "ALLOWED",
        //         "epub": {
        //             "isAvailable": false
        //         },
        //         "pdf": {
        //             "isAvailable": false
        //         },
        //         "webReaderLink": null,
        //         "accessViewStatus": "NONE",
        //         "quoteSharingAllowed": false
        //     },
        //     "searchInfo": {
        //         "textSnippet": null
        //     },
        //     "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
        //     "created_at": "2024-07-14T05:03:33.112Z",
        //     "workspace_id": "1",
        //     "read_count": 2
        // },
 


  ]


export default function ProjectCard({ project }) {
  const navigate = useNavigate();

  return (
    // <div className="group relative bg-white rounded-lg shadow">
    //   <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
    //     <img
    //       src={project.imageLinks.thumbnail || 'https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg'}
    //       alt={project.title}
    //       className="h-full w-full object-cover object-center group-hover:opacity-75"
    //     />
    //   </div>
    //   <div className="p-4">
    //     <h3 className="mt-4 text-sm text-gray-700">{project.title}</h3>
    //     <p className="mt-1 text-sm text-gray-500">{project.description}</p>
    //     <div className="mt-6 flex justify-between">
    //       <button
    //         type="button"
    //         className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    //         onClick={() =>
    //           navigate(`/project/create?project_id=${project.id}`)
    //         }
    //       >
    //         <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
    //         Delete Project
    //       </button>

    //       <button
    //         type="button"
    //         className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    //         onClick={() =>
    //           navigate(`/project/output?projectId=${project.id}`)
    //         }
    //       >
    //         <CommandLineIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
    //         Launch Studio
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="px-4 sm:px-6 lg:px-8">
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
                Name
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Title
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Role
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
                  {person.name}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {person.title}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.email}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit<span className="sr-only">, {person.name}</span>
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
