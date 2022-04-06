import { render } from '@testing-library/react';
import { Feedback } from './Feedback';

describe('Feedback', (): void => {
  it('render Feedback items', (): void => {
    const { getAllByRole, getByText } = render(<Feedback comment="my comment" phoneNumb="111" />);

    const title = getAllByRole('heading', { level: 6 });
    expect(title[0]).toBeInTheDocument();
    expect(getByText(/111/i)).toBeInTheDocument();
    expect(getByText(/my comment/i)).toBeInTheDocument();
  });
});
