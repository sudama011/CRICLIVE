import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';
import { BrowserRouter } from "react-router-dom";
import MutationObserver from "mutation-observer";
global.MutationObserver = MutationObserver;


test('check year', () => {
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

    const year = screen.findByText('2022');

    let date = new Date();
    let current_year = date.getFullYear();
    expect(year == current_year).toBeTruthy;

})

test('Link check', async () => {
    render(
        <BrowserRouter>
            <Footer />
        </BrowserRouter>
    );

    const facebook = await screen.findByTitle('Facebook')
    expect(facebook).toBeInTheDocument;
})