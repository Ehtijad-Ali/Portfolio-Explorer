import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../hooks/useAuth';
import ExplorePage from '../pages/ExplorePage';

const freeUser = { id: '1', email: 'test@test.com', name: 'Test', tier: 'free' };

function renderExplore(user = freeUser) {
  return render(
    <AuthContext.Provider value={{ user }}>
      <MemoryRouter>
        <ExplorePage />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('ExplorePage', () => {
  it('renders the heading', () => {
    renderExplore();
    expect(screen.getByText('Explore Portfolios')).toBeInTheDocument();
  });

  it('renders a search input', () => {
    renderExplore();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders role filter pills', () => {
    renderExplore();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
  });

  it('filters projects by search query', () => {
    renderExplore();
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'Nova' } });
    expect(screen.getAllByText(/Nova/).length).toBeGreaterThan(0);
  });

  it('shows empty state when no results', () => {
    renderExplore();
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'xyzthisdoesnotexist12345' } });
    expect(screen.getByText('No projects match your filters.')).toBeInTheDocument();
  });

  it('clears search via clear button', () => {
    renderExplore();
    const search = screen.getByRole('searchbox');
    fireEvent.change(search, { target: { value: 'Nova' } });
    const clearBtn = screen.getByLabelText('Clear search');
    fireEvent.click(clearBtn);
    expect(search.value).toBe('');
  });
});
