import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { AuthContext } from '../hooks/useAuth';

const FREE_PROJECT = {
  id: 'test-1',
  slug: 'test-project',
  title: 'Test Project',
  client: 'Test Client',
  year: 2024,
  tags: ['Design', 'Branding'],
  tier: 'free',
  featured: false,
  coverImage: 'https://example.com/img.jpg',
  summary: 'A test project summary.',
  stats: [{ label: 'Metric', value: '100' }],
};

const PRO_PROJECT = { ...FREE_PROJECT, id: 'test-2', slug: 'pro-project', tier: 'pro', title: 'Pro Project' };

const freeUser = { id: '1', email: 'test@test.com', name: 'Test', tier: 'free' };
const proUser  = { ...freeUser, tier: 'pro' };

function renderCard(project, user = null) {
  return render(
    <AuthContext.Provider value={{ user }}>
      <MemoryRouter>
        <ProjectCard project={project} />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('ProjectCard', () => {
  it('renders project title and client', () => {
    renderCard(FREE_PROJECT, freeUser);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Client')).toBeInTheDocument();
  });

  it('renders tags', () => {
    renderCard(FREE_PROJECT, freeUser);
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Branding')).toBeInTheDocument();
  });

  it('shows lock overlay for pro project when user is free tier', () => {
    renderCard(PRO_PROJECT, freeUser);
    expect(screen.getByText('Pro only')).toBeInTheDocument();
  });

  it('does NOT show lock overlay for pro project when user is pro tier', () => {
    renderCard(PRO_PROJECT, proUser);
    expect(screen.queryByText('Pro only')).not.toBeInTheDocument();
  });

  it('does NOT show lock overlay for free project', () => {
    renderCard(FREE_PROJECT, null);
    expect(screen.queryByText('Pro only')).not.toBeInTheDocument();
  });

  it('shows featured badge when project.featured is true', () => {
    renderCard({ ...FREE_PROJECT, featured: true }, freeUser);
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('renders stats when visible (free project)', () => {
    renderCard(FREE_PROJECT, freeUser);
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Metric')).toBeInTheDocument();
  });
});
