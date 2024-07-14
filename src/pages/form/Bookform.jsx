import React, { useState } from 'react';

const BookForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        workspace_id: '1',
        title: '',
        authors: [''],
        publishedDate: '',
        description: '',
        industryIdentifiers: [
            { type: 'ISBN_10', identifier: '' },
            { type: 'ISBN_13', identifier: '' }
        ],
        pageCount: 0,
        printType: 'BOOK',
        maturityRating: 'NOT_MATURE',
        dueDate: '',
        email: ''
    });

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // Add any other headers you need
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Reset form or perform other actions after successful submission
            console.log('Form data sent successfully:', formData);
            // Resetting form data if needed
            setFormData({
                workspace_id: '1',
                title: '',
                authors: [''],
                publishedDate: '',
                description: '',
                industryIdentifiers: [
                    { type: 'ISBN_10', identifier: '' },
                    { type: 'ISBN_13', identifier: '' }
                ],
                pageCount: 0,
                printType: 'BOOK',
                maturityRating: 'NOT_MATURE',
                dueDate: '',
                email: ''
            });

        } catch (error) {
            console.error('Error sending form data:', error);
            // Handle errors, show user feedback, etc.
        }
    };


    return (
        <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Book Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="authors" className="block text-sm font-medium text-gray-700">Authors (Comma-separated)</label>
                    <input
                        type="text"
                        id="authors"
                        name="authors"
                        value={formData.authors.join(', ')}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">Published Date</label>
                    <input
                        type="date"
                        id="publishedDate"
                        name="publishedDate"
                        value={formData.publishedDate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isbn10" className="block text-sm font-medium text-gray-700">ISBN 10</label>
                    <input
                        type="text"
                        id="isbn10"
                        name="industryIdentifiers[0].identifier"
                        value={formData.industryIdentifiers[0].identifier}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="isbn13" className="block text-sm font-medium text-gray-700">ISBN 13</label>
                    <input
                        type="text"
                        id="isbn13"
                        name="industryIdentifiers[1].identifier"
                        value={formData.industryIdentifiers[1].identifier}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="pageCount" className="block text-sm font-medium text-gray-700">Page Count</label>
                    <input
                        type="number"
                        id="pageCount"
                        name="pageCount"
                        value={formData.pageCount}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="printType" className="block text-sm font-medium text-gray-700">Print Type</label>
                    <select
                        id="printType"
                        name="printType"
                        value={formData.printType}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="BOOK">Book</option>
                        <option value="MAGAZINE">Magazine</option>
                        <option value="JOURNAL">Journal</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="maturityRating" className="block text-sm font-medium text-gray-700">Maturity Rating</label>
                    <select
                        id="maturityRating"
                        name="maturityRating"
                        value={formData.maturityRating}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="NOT_MATURE">Not Mature</option>
                        <option value="MATURE">Mature</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BookForm;