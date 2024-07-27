import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ViewMode, { ViewEnum } from '../../src/components/ViewMode';

describe('ViewMode', () => {
  test('renders view mode icons', () => {
    render(<ViewMode setView={() => {}} />);

    const mapIcon = screen.getByRole('button', { name: 'Map View' });
    const listIcon = screen.getByRole('button', { name: 'List View' });
    const tabbedIcon = screen.getByRole('button', { name: 'Tabbed View' });

    expect(mapIcon).toBeInTheDocument();
    expect(listIcon).toBeInTheDocument();
    expect(tabbedIcon).toBeInTheDocument();
  });

  test('calls setView with correct view when icon is clicked', () => {
    const setViewMock = jest.fn();
    render(<ViewMode setView={setViewMock} />);

    const mapIcon = screen.getByRole('button', { name: 'Map View' });
    const listIcon = screen.getByRole('button', { name: 'List View' });
    const tabbedIcon = screen.getByRole('button', { name: 'Tabbed View' });

    userEvent.click(mapIcon);
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.Map);

    userEvent.click(listIcon);
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.List);

    userEvent.click(tabbedIcon);
    expect(setViewMock).toHaveBeenCalledWith(ViewEnum.Tabbed);
  });
});