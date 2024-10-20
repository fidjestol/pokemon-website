
# Pokémon Information Application

This is a simple web application that allows users to view basic and detailed information about Pokémon. The data is retrieved from the [PokeAPI](https://pokeapi.co/). The application is built using **React**, **Redux**, **TypeScript**, and **Material UI** for the front-end.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Integration](#api-integration)
- [Testing](#testing)
- [License](#license)

---

## Features

- **Pokémon List:** Displays a dynamic table with the following Pokémon information:
  - Name
  - ID
  - Picture
  - Weight
  - Height
  - Types

- **Customizable Columns:** Users can toggle the visibility of columns in the Pokémon table. The visibility preferences persist across page reloads.
  
- **Detailed Pokémon Information:** Clicking on a Pokémon row or using arrow keys to navigate shows detailed stats about the selected Pokémon (HP, Attack, Defense, etc.).
  
- **Responsive Layout:** The application adjusts to various screen sizes, with a sidebar for Pokémon details.

---

## Technologies Used

- **React**: For building the UI.
- **Redux Toolkit**: For state management.
- **RTK Query**: For data fetching and caching.
- **Material UI (MUI)**: For UI components and styling.
- **TypeScript**: For static type checking.
- **Axios**: For API requests.
- **Jest & React Testing Library**: For unit testing and integration testing.

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:
- **Node.js** (version 14.x or higher)
- **npm** (Node package manager)

### Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/your-username/pokemon-info-app.git
   cd pokemon-info-app
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

### Running the App

To run the application in development mode:

\`\`\`bash
npm start
\`\`\`

This will start the app on \`http://localhost:3000/\`. Open this URL in your browser to view the application.

---

## Project Structure

The project follows a standard React-Redux folder structure:

\`\`\`
src/
│
├── components/          # React components
│   ├── PokemonTable.tsx  # Component for displaying the Pokémon table
│   ├── PokemonDetails.tsx # Component for displaying selected Pokémon details
│   └── ColumnToggler.tsx # Component for toggling table columns
│
├── redux/               # Redux store setup
│   ├── pokemonApi.ts    # RTK Query API slice
│   ├── pokemonSlice.ts  # Redux slice for selected Pokémon and table columns
│   └── store.ts         # Redux store configuration
│
├── tests/               # Unit and integration tests
│   └── PokemonTable.test.tsx
│
├── App.tsx              # Main application component
├── index.tsx            # Application entry point
└── setupTests.ts        # Jest and Testing Library setup
\`\`\`

---

## API Integration

The application uses **RTK Query** to fetch Pokémon data from the [PokeAPI](https://pokeapi.co/):

- **Endpoint:** \`/pokemon?limit=150\` – Retrieves the list of the first 150 Pokémon.
- **Endpoint:** \`/pokemon/{id}\` – Fetches detailed information for a specific Pokémon by its ID.

### Example API Call:
\`\`\`ts
import { useGetPokemonListQuery, useGetPokemonDetailsQuery } from './redux/pokemonApi';

// Fetch list of Pokémon
const { data, error, isLoading } = useGetPokemonListQuery();
\`\`\`

---

## Testing

This project uses **Jest** and **React Testing Library** for unit and integration testing.

### Running Tests

To run the test suite:

\`\`\`bash
npm test
\`\`\`

### Example Test

An example of how a test looks for the \`PokemonTable\` component:

\`\`\`ts
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import PokemonTable from './PokemonTable';

test('renders the Pokémon table correctly', () => {
  render(
    <Provider store={store}>
      <PokemonTable />
    </Provider>
  );
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
\`\`\`

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Additional Information

If you encounter any issues or have questions, feel free to create an issue on the [GitHub repository](https://github.com/your-username/pokemon-info-app/issues) or reach out to the project maintainer.
