# Email Signature Engine

This project is an Email Signature Engine that generates customized email signatures based on predefined templates and user input.

## Features

- Web interface for generating email signatures
- Multiple predefined signature templates
- Customizable personal information input
- HTML-based email signature output

## Technologies Used

- Backend: Node.js with TypeScript, Express.js
- Frontend: Vue.js with TypeScript
- Templating: Handlebars
- Testing: Vitest
- Containerization: Docker

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation and Running

1. Clone the repository:

2. Build and run the Docker containers:

   `docker-compose up --build`

3. Access the application at `http://localhost:8080`

## Development

### Backend

The backend is a Node.js application using Express.js. To run it locally:

1. Navigate to the `backend` directory
2. Run `npm install`
3. Run `npm run dev`

### Frontend

The frontend is a Vue.js application. To run it locally:

1. Navigate to the `frontend` directory
2. Run `npm install`
3. Run `npm run dev`

### Testing

To run the frontend tests:

1. Navigate to the `frontend` directory
2. Run `npm run test:unit`
