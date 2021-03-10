import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

test('renders Main Component', () => {
  const player = render(<App />);
  const playMainComponent = player.getByTestId("main-container");

  expect(playMainComponent).toBeDefined();
});
