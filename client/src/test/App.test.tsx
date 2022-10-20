import { render, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';

import { RoutedApp } from '../App';

describe('App', () => {
  it('Check Title', async () => {
    const title = import.meta.env.VITE_APP_TITLE_NAME;
    // Arrange
    render(<RoutedApp />);
    // Assert
    await waitFor(() => expect(document.title).toEqual(title));
  });
});
