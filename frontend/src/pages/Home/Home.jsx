import React from "react";

const user = {
  name: "Whitney Francis",
  email: "whitney.francis@example.com",
  mobile: "123-456-7890",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  totalBooksBorrowed: 8,
  totalOverdue: 2,
  totalReturned: 6,
};


const borrowedBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    dateBorrowed: "2024-01-01",
    dueDate: "2024-01-15",
    borrowerName: "Whitney Francis",
    status: "borrowed"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    dateBorrowed: "2024-02-01",
    dueDate: "2024-02-15",
    borrowerName: "Whitney Francis",
    status: "overdue"
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    dateBorrowed: "2024-02-01",
    dueDate: "2024-02-15",
    borrowerName: "Whitney Francis",
    status: "overdue"
  },
  // Add more books here
];

const newBooks = [
  {
    id: 1,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg/728px-To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg?20190729060537",
    description: "A novel about the serious issues of rape and racial inequality."
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/5/51/1984_first_edition_cover.jpg",
    description: "A dystopian social science fiction novel and cautionary tale."
  },
  {
    id: 3,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/PrideAndPrejudiceTitlePage.jpg/330px-PrideAndPrejudiceTitlePage.jpg",
    description: "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet."
  },
  {
    id: 4,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/330px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
    description: "A novel about the American dream and the roaring twenties."
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Moby-Dick_FE_title_page.jpg/330px-Moby-Dick_FE_title_page.jpg",
    description: "A novel about the voyage of the whaling ship Pequod."
  },
  {
    id: 6,
    title: "War and Peace",
    author: "Leo Tolstoy",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg/330px-Tolstoy_-_War_and_Peace_-_first_edition%2C_1869.jpg",
    description: "A historical novel that chronicles the history of the French invasion of Russia."
  },
  {
    id: 7,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/330px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
    description: "A novel about the events and circumstances that occur around Holden Caulfield."
  },
  {
    id: 8,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
    description: "A fantasy novel about the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon."
  },
  {
    id: 9,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Jane_Eyre_title_page.jpg/330px-Jane_Eyre_title_page.jpg",
    description: "A novel about the experiences of its eponymous heroine, including her growth to adulthood and her love for Mr. Rochester."
  },
  {
    id: 10,
    title: "Brave New World",
    author: "Aldous Huxley",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/6/62/BraveNewWorld_FirstEdition.jpg",
    description: "A dystopian novel set in a futuristic World State."
  }
];


const trendingBooks = [
  {
    id: 1,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/2/23/Where_the_Crawdads_Sing_%28film%29.jpg",
    description: "A mystery and coming-of-age novel set in the marshes of North Carolina."
  },
  {
    id: 2,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/d/df/The_Silent_Patient_early_2019_UK_edition.png",
    description: "A psychological thriller about a woman who stops speaking after committing a violent crime."
  },
  {
    id: 3,
    title: "Educated",
    author: "Tara Westover",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/d/df/The_Silent_Patient_early_2019_UK_edition.png",
    description: "A memoir recounting the author's journey from a survivalist family to earning a PhD from Cambridge University."
  },
  {
    id: 4,
    title: "The Nightingale",
    author: "Kristin Hannah",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/8/8d/TheNightingale2019.jpg",
    description: "A novel about two sisters in France during World War II."
  },
  {
    id: 5,
    title: "The Institute",
    author: "Stephen King",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/0/00/The_Institute_%28King_novel%29.png",
    description: "A suspenseful novel about a sinister institute that abducts children with special abilities."
  },
  {
    id: 6,
    title: "The Testaments",
    author: "Margaret Atwood",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/5/54/The_Testaments_%28Atwood_novel%29.png",
    description: "A sequel to 'The Handmaid's Tale' set 15 years after the original story."
  },
  {
    id: 7,
    title: "Becoming",
    author: "Michelle Obama",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/0/09/Becoming_%28Michelle_Obama_book%29.jpg",
    description: "A memoir by the former First Lady of the United States."
  },
  {
    id: 8,
    title: "Little Fires Everywhere",
    author: "Celeste Ng",
    imageURL: "https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Little_Fires_Everywhere_Title_Card.png/330px-Little_Fires_Everywhere_Title_Card.png",
    description: "A novel about family dynamics and societal expectations in a suburban Ohio town."
  },
  {
    id: 9,
    title: "The Tattooist of Auschwitz",
    author: "Heather Morris",
    imageURL: "https://images.squarespace-cdn.com/content/v1/62a92f0ac1a26c2a711f871d/0faf5d90-2a8d-45d7-88ea-6b2e0f4f5d57/COVER+-+Tattooist+-+high-res.jpg",
    description: "A historical novel based on the true story of a Jewish man who survived the Holocaust by working as a tattooist in Auschwitz."
  },
  {
    id: 10,
    title: "Normal People",
    author: "Sally Rooney",
    imageURL: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Daisy_Edgar-Jones_by_Patrick_Lovell%2C_July_2021_%28cropped%29.jpg/261px-Daisy_Edgar-Jones_by_Patrick_Lovell%2C_July_2021_%28cropped%29.jpg",
    description: "A novel exploring the complex relationship between two Irish teenagers over several years."
  }
];



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  React.useEffect(() => {
    document.title = "Dashboard";
  });

  return (
    <>
      <div className="flex h-full flex-col">
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
            <section aria-labelledby="primary-heading" className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last p-4">
              <h1 id="primary-heading" className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              <div className="mt-6 flex flex-row space-x-4">
                {/* Left Section */}
                <div className="w-1/2">
                  <div className="flex justify-center bg-white p-6 rounded-lg shadow-md">
                    {/* Profile Photo Section (Leftmost) */}
                    <div className="flex-none mr-8">
                      <img className="h-32 w-32 rounded-full" src={user.imageUrl} alt="" />
                    </div>

                    {/* Library Stats Section (Middle) */}
                    <div className="flex-1 text-sm text-gray-600">
                      <div className="mb-4">
                        <h3 className="text-lg font-medium text-gray-900">Library Stats</h3>
                        <p>Total Books Borrowed: {user.totalBooksBorrowed}</p>
                        <p>Total Overdue: {user.totalOverdue}</p>
                        <p>Total Returned: {user.totalReturned}</p>
                      </div>
                    </div>

                    {/* User Info Section (Right) */}
                    <div className="flex-none">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{user.name}</h2>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-gray-600">{user.mobile}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section */}
                <div className="w-1/2">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-900">Real-time Stats of Books Borrowed</h3>
                    <ul className="mt-4 space-y-2 overflow-auto max-h-96 custom-scrollbar">
                      {borrowedBooks.map((book) => (
                        <li key={book.id} className="flex justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{book.title}</p>
                            <p className="text-sm text-gray-600">{book.author}</p>
                            <p className="text-sm text-gray-600 mt-2">Borrowed by: {book.borrowerName}</p>
                            <p className="text-sm text-gray-600">Due Date: {book.dueDate}</p>
                          </div>
                          <div className="flex flex-col items-end">
                            <p className={`text-sm font-medium ${book.status === 'overdue' ? 'text-red-600' : 'text-gray-600'}`}>
                              {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                            </p>
                            <p className="text-sm text-gray-600">{book.dateBorrowed}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              {/* New Arrivals and Trending Books Section */}
              <div className="mt-6 flex flex-row space-x-4">
                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-900">New Arrivals</h3>
                  <ul className="mt-4 space-y-2 overflow-auto max-h-96 custom-scrollbar">
                    {newBooks.map((book) => (
                      <li key={book.id} className="flex bg-gray-100 p-4 rounded-lg shadow-sm">
                        <img className="w-20 h-20 object-contain mr-4" src={book.imageURL} alt={book.title} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{book.title}</p>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <p className="text-xs text-gray-500 mt-2">{book.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="w-1/2 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-medium text-gray-900">Trending Books</h3>
                  <ul className="mt-4 space-y-2 overflow-auto max-h-96 custom-scrollbar">
                    {trendingBooks.map((book) => (
                      <li key={book.id} className="flex bg-gray-100 p-4 rounded-lg shadow-sm">
                        <img className="w-20 h-20 object-contain mr-4" src={book.imageURL} alt={book.title} />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{book.title}</p>
                          <p className="text-sm text-gray-600">{book.author}</p>
                          <p className="text-xs text-gray-500 mt-2">{book.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}