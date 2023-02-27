import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('Team Name', () => {
    render(<Footer />);
    const teamName = screen.getByText('Team Plan B')
    expect(teamName).toBeInTheDocument();
  })

  it('Link to repositories', () => {
    render(<Footer />);
    const repositoriesLinks = screen.getAllByRole('link')
    const KonstantinRep = repositoriesLinks[0]
    const AlexRep = repositoriesLinks[1]
    const GeorgeRep = repositoriesLinks[2]
    expect(KonstantinRep).toHaveAttribute('href', 'https://github.com/L4vrin');
    expect(AlexRep).toHaveAttribute('href', 'https://github.com/aleksryab');
    expect(GeorgeRep).toHaveAttribute('href', 'https://github.com/MaDKnighT404');
  })

  it('Link to RSShool', () => {
    render(<Footer />);
    const rsSchool = screen.getByRole('link', {name: /RSSchool/i})
    expect(rsSchool).toHaveAttribute('href', 'https://rs.school/js/');
  })
})