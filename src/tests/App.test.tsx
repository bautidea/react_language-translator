import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('App works as expected', async () => {
  // Initializing user so i can simulate that a user is typing.
  const user = userEvent.setup(); // -> setup() must be initialized before rendering app.
  const app = render(<App />);
  // First im going to try to detect TextArea.
  const textAreaFrom = app.getByPlaceholderText('Enter Text ...');

  // Simulating that the user is writing in the selected TextArea.
  // This is an asynchronous, so it will return a promise.
  await user.type(textAreaFrom, 'Hola mundo');

  // Finding result in output TextArea, by finding translation value.
  const result = await app.findByDisplayValue(/Hello world/i);

  expect(result).toBeTruthy();
});
