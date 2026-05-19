import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../redux/store'; 
import Timer from './timer';
import '@testing-library/jest-dom';
const renderWithRedux = (component: React.ReactElement) => {
  return render(<Provider store={store}>{component}</Provider>);
};
describe('Timer Basic Tests', () => {
  test('UI check: heading aur buttons nazar aa rahe hain', () => {
    renderWithRedux(<Timer />);
    expect(screen.getByText(/SMART TIMER/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /START/i })).toBeInTheDocument();
  });
  test('Input check: number likhne se state update ho rahi hai', () => {
    renderWithRedux(<Timer />);
    const input = screen.getByPlaceholderText(/Enter seconds.../i);
    fireEvent.change(input, { target: { value: '30' } });
    expect(store.getState().Timer.value).toBe(30);
  });
  test('Button check: START dabane se timer active ho raha hai', () => {
    renderWithRedux(<Timer />);
    const startBtn = screen.getByRole('button', { name: /START/i });
    fireEvent.click(startBtn);
    expect(store.getState().Timer.isRunning).toBe(true);
  });
  test('Reset check: RESET dabane se value 0 ho rahi hai', () => {
    renderWithRedux(<Timer />);
    const resetBtn = screen.getByRole('button', { name: /RESET/i });
    fireEvent.click(resetBtn);
    expect(store.getState().Timer.value).toBe(0);
  });
});
