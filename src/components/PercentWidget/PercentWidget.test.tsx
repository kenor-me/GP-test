import { render } from '@testing-library/react';
import { PercentWidget } from './PercentWidget';

describe('Percent Widget', (): void => {
  it('render Percent Widget', (): void => {
    const { getAllByRole } = render(<PercentWidget value={40} />);
    const progressbar = getAllByRole('progressbar');

    expect(progressbar[0]).toHaveAttribute('aria-valuenow', '100');
    expect(progressbar[1]).toHaveAttribute('aria-valuenow', '40');
    expect(progressbar[1]).toHaveStyle({ color: 'rgb(211, 47, 47)' });
  });
  it('render Percent Widget with different colors', (): void => {
    const { getAllByRole } = render(<PercentWidget value={55} />);
    const progressbar = getAllByRole('progressbar');

    expect(progressbar[1]).toHaveStyle({ color: 'rgb(156, 39, 176)' });
  });
  it('render Percent Widget with different colors', (): void => {
    const { getAllByRole } = render(<PercentWidget value={65} />);
    const progressbar = getAllByRole('progressbar');

    expect(progressbar[1]).toHaveStyle({ color: 'rgb(46, 125, 50)' });
  });
});
