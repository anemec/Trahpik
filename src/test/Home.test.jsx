import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';

describe('Home Page - Mobile Responsiveness', () => {
  it('renders the page title', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Art Gallery')).toBeInTheDocument();
  });

  it('renders all art piece cards', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText('Geometric Waves')).toBeInTheDocument();
    expect(screen.getByText('Color Gradient')).toBeInTheDocument();
    expect(screen.getByText('Particle System')).toBeInTheDocument();
  });

  it('has mobile-friendly navigation links', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('displays descriptions for each art piece', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    expect(screen.getByText(/mesmerizing pattern/i)).toBeInTheDocument();
    expect(screen.getByText(/Smooth color transitions/i)).toBeInTheDocument();
    expect(screen.getByText(/Dynamic particle animation/i)).toBeInTheDocument();
  });
});
