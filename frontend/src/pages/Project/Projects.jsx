import React from 'react';
import { TrashIcon, CommandLineIcon } from '@heroicons/react/20/solid';
import { useNavigate } from 'react-router-dom';

const people = [
  {
    "_id": "66935c251ac311c3107e932d",
    "kind": "books#volume",
    "id": "53c8c5dc-6328-4e27-8f53-bc49a091ba62",
    "etag": null,
    "selfLink": null,
    "availableCount": 0,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/2/23/Where_the_Crawdads_Sing_%28film%29.jpg"
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:03:33.112Z",
    "workspace_id": "1",
    "read_count": 2
  },
  {
    "_id": "6693682a77af9900dd7b2430",
    "kind": "books#volume",
    "id": "2ba2cfc5-92a9-4e52-a0fb-db205133e22a",
    "etag": null,
    "selfLink": null,
    "availableCount": 3,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": "https://upload.wikimedia.org/wikipedia/en/2/23/Where_the_Crawdads_Sing_%28film%29.jpg"
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:54:50.977Z",
    "workspace_id": "1"
  },
  {
    "_id": "6693687fe903f9d973c51d8d",
    "kind": "books#volume",
    "id": "1a990b95-73a8-430f-951f-e3fb0966aff5",
    "etag": null,
    "selfLink": null,
    "availableCount": 2,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": null
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:56:15.852Z",
    "workspace_id": "1"
  },
  {
    "_id": "66936895b0510785b7c61b37",
    "kind": "books#volume",
    "id": "fc70efe3-30d4-4f6e-9c5d-1e434b537336",
    "etag": null,
    "selfLink": null,
    "availableCount": 0,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": null
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:56:37.159Z",
    "workspace_id": "1"
  },
  {
    "_id": "669368b649e6cb492d680dd2",
    "kind": "books#volume",
    "id": "eb645f65-0f94-4f3d-86a1-131bf47a93db",
    "etag": null,
    "selfLink": null,
    "availableCount": 1,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": null
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:57:10.949Z",
    "workspace_id": "1"
  },
  {
    "_id": "669368d8a8d0eb5ba6fb4340",
    "kind": "books#volume",
    "id": "a5ee8681-fda1-4948-8f48-f79aab063982",
    "etag": null,
    "selfLink": null,
    "availableCount": 0,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": null
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:57:44.345Z",
    "workspace_id": "1"
  },
  {
    "_id": "66936912bd29834dff442670",
    "kind": "books#volume",
    "id": "79f381e1-274e-4803-9d38-5984ac8da291",
    "etag": null,
    "selfLink": null,
    "availableCount": 10,
    "volumeInfo": {
      "title": "Sample Book",
      "authors": [
        "Mantavy Gajjar"
      ],
      "publishedDate": "2017-10-06",
      "description": "Sample Desc",
      "industryIdentifiers": [
        {
          "type": "ISBN_10",
          "identifier": "1787123421"
        },
        {
          "type": "ISBN_13",
          "identifier": "9781787123427"
        }
      ],
      "readingModes": {
        "text": false,
        "image": false
      },
      "pageCount": 806,
      "printType": "BOOK",
      "maturityRating": "NOT_MATURE",
      "allowAnonLogging": false,
      "contentVersion": null,
      "panelizationSummary": {
        "containsEpubBubbles": false,
        "containsImageBubbles": false
      },
      "imageLinks": {
        "smallThumbnail": null,
        "thumbnail": null
      },
      "language": "en",
      "previewLink": null,
      "infoLink": null,
      "canonicalVolumeLink": null
    },
    "saleInfo": {
      "country": "IN",
      "saleability": "NOT_FOR_SALE",
      "isEbook": false
    },
    "accessInfo": {
      "country": "IN",
      "viewability": "NO_PAGES",
      "embeddable": false,
      "publicDomain": false,
      "textToSpeechPermission": "ALLOWED",
      "epub": {
        "isAvailable": false
      },
      "pdf": {
        "isAvailable": false
      },
      "webReaderLink": null,
      "accessViewStatus": "NONE",
      "quoteSharingAllowed": false
    },
    "searchInfo": {
      "textSnippet": null
    },
    "created_by": "QnpfkTpko6fO5qjlkcVLZMQUn0x1",
    "created_at": "2024-07-14T05:58:42.196Z",
    "workspace_id": "1"
  }
]


export default function Projects({ project }) {
  const navigate = useNavigate();
  
  const handleDescribeClick = (person) => {
    navigate('/details', { state: { book: person } });
  };
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-10">
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
                Title
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Authors
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Description
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Date of Publication
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Availabilty
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Counter
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
                  {person.volumeInfo.title}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  {/* {person.volumeInfo.authors} */}
                  {person.volumeInfo.authors.map((author) => (
                    <p className="text-sm text-gray-500">{author}</p>
                  ))}

                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.volumeInfo.description}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                  {person.volumeInfo.publishedDate}
                </td>
                <td className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell ">
                  {person.availableCount === 0 ? (
                    <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                      <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                      Unavailable
                    </span>
                  ) : (
                    person.availableCount
                  )}
                </td>

                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {person.read_count}
                </td>
                <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="" className="text-indigo-600 hover:text-indigo-900" onClick={() => handleDescribeClick(person)} >
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
