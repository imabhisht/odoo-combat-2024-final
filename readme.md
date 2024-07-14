![alt text](<Screenshot from 2024-07-14 15-53-35.png>)

![alt text](<Screenshot from 2024-07-14 15-52-00.png>)

![alt text](<Screenshot from 2024-07-14 15-51-51.png>)

![alt text](<Screenshot from 2024-07-14 15-52-14.png>)


# Library Management System

This is a Library Management System built with a React frontend and an Express backend. The system uses MongoDB for the database, Kafka for message streaming, Nodemailer for email notifications, Firebase for authentication, Resend for managing transactional emails, Tailwind CSS for styling, and Twilio for SMS notifications.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization
- Book catalog management
- Borrowing and returning books
- Email notifications for overdue books
- SMS notifications for reserved books
- Real-time updates using Kafka
- Responsive design with Tailwind CSS

## Tech Stack

*Frontend:*

- React
- Tailwind CSS

*Backend:*

- Express
- MongoDB
- Kafka
- Nodemailer
- Firebase
- Resend
- Twilio

## Installation

### Prerequisites

- Node.js
- MongoDB
- Kafka
- Firebase account
- Twilio account

### Frontend Setup

1. Clone the repository:

    bash
    git clone https://github.com/yourusername/library-management-system.git
    cd library-management-system/frontend
    

2. Install dependencies:

    bash
    npm install
    

3. Start the development server:

    bash
    npm start
    

### Backend Setup

1. Navigate to the backend directory:

    bash
    cd ../backend
    

2. Install dependencies:

    bash
    npm install
    

3. Create a .env file in the backend directory and add your configuration:

    env
    MONGO_URI=your_mongo_db_uri
    KAFKA_BROKER=your_kafka_broker
    EMAIL_SERVICE=your_email_service
    EMAIL_USER=your_email_user
    EMAIL_PASS=your_email_password
    FIREBASE_API_KEY=your_firebase_api_key
    FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    FIREBASE_PROJECT_ID=your_firebase_project_id
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    

4. Start the server:

    bash
    npm start
    

## Usage

### User Authentication

Users can sign up and log in using their email addresses. Firebase is used for authentication.

### Book Management

Admins can add, edit, and delete books from the catalog. Users can view the catalog, borrow books, and return books.

### Notifications

Users receive email notifications for overdue books via Nodemailer and SMS notifications for reserved books via Twilio.

### Real-time Updates

Kafka is used for real-time updates, such as notifying users when a book they reserved is available.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.