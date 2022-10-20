import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it } from 'vitest';

import { App, RoutedApp } from '../App';

describe('Home', () => {
  it('Check Title', async () => {
    // Arrange
    const title = import.meta.env.VITE_APP_TITLE_NAME;

    render(<RoutedApp />);
    // Assert
    await waitFor(() => expect(document.title).toEqual(title));
  });
  it('Go to Home Route', async () => {
    // Arrange
    render(
      <MemoryRouter initialEntries={['/home']}>
        <App />
      </MemoryRouter>
    );
    // Assert
    await screen.findByText('Home');
  });
});
