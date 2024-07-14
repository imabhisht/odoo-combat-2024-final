import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/20/solid';
import { Tab } from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function BookDetails() {
  const location = useLocation();
  const { book } = location.state || {};

  if (!book) {
    return <div className="px-4 sm:px-6 lg:px-8 mt-10">No book data available.</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Book image */}
          <div className="lg:col-span-4 lg:row-end-1">
            <div className="aspect-w-4 aspect-h-3 overflow-hidden rounded-lg bg-gray-100">
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} className="object-cover object-center" />
            </div>
          </div>

          {/* Book details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{book.volumeInfo.title}</h1>
                <p className="mt-2 text-sm text-gray-500">By {book.volumeInfo.authors?.join(', ')}</p>
              </div>
              <div>
                <h3 className="sr-only">Book Details</h3>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        (book.averageRating || 0) > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{book.averageRating} out of 5 stars</p>
              </div>
            </div>

            <p className="mt-6 text-gray-500">{book.volumeInfo.description}</p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Available Count: {book.availableCount}
              </button>
              <button
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-50 py-3 px-8 text-base font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Read Count: {book.read_count}
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-medium text-gray-900">Published Date</h3>
              <p className="prose prose-sm mt-4 text-gray-500">{book.volumeInfo.publishedDate}</p>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <Tab.Group as="div">
              <div className="border-b border-gray-200">
                <Tab.List className="-mb-px flex space-x-8">
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                      )
                    }
                  >
                    Customer Reviews
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                      )
                    }
                  >
                    FAQ
                  </Tab>
                  <Tab
                    className={({ selected }) =>
                      classNames(
                        selected
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300',
                        'whitespace-nowrap border-b-2 py-6 text-sm font-medium'
                      )
                    }
                  >
                    License
                  </Tab>
                </Tab.List>
              </div>
              <Tab.Panels as={Fragment}>
                <Tab.Panel className="-mb-10">
                  <h3 className="sr-only">Customer Reviews</h3>

                  {book.reviews?.map((review, reviewIdx) => (
                    <div key={review.id} className="flex space-x-4 text-sm text-gray-500">
                      <div className="flex-none py-10">
                        <img src={review.avatarSrc} alt="" className="h-10 w-10 rounded-full bg-gray-100" />
                      </div>
                      <div className={classNames(reviewIdx === 0 ? '' : 'border-t border-gray-200', 'py-10')}>
                        <h3 className="font-medium text-gray-900">{review.author}</h3>
                        <p>
                          <time dateTime={review.datetime}>{review.date}</time>
                        </p>

                        <div className="mt-4 flex items-center">
                          {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              className={classNames(
                                review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                              )}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                        <p className="sr-only">{review.rating} out of 5 stars</p>

                        <div
                          className="prose prose-sm mt-4 max-w-none text-gray-500"
                          dangerouslySetInnerHTML={{ __html: review.content }}
                        />
                      </div>
                    </div>
                  ))}
                </Tab.Panel>

                <Tab.Panel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>

                  <dl>
                    {book.faqs?.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">{faq.question}</dt>
                        <dd className="prose prose-sm mt-2 max-w-none text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </Tab.Panel>

                <Tab.Panel className="pt-10">
                  <h3 className="sr-only">License</h3>

                  <div
                    className="prose prose-sm max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{ __html: book.license?.content }}
                  />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
