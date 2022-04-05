import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddInputs } from '.';

describe('AddInputs', () => {
  it('render Items List', (): void => {
    const { getByRole } = render(<AddInputs />);
    expect(getByRole('button')).toBeInTheDocument();
    userEvent.click(getByRole('button'));
    expect(getByRole('listitem')).toBeInTheDocument();
    expect(getByRole('textbox', { name: 'input №1' }));
    userEvent.type(getByRole('textbox', { name: 'input №1' }), 'Spaghetti');
    expect(getByRole('textbox', { name: 'input №1' })).toHaveValue('Spaghetti');
  });
});
