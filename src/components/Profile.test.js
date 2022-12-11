import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('welcome message', () => {
    render(<Profile />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
});