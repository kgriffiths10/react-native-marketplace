import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AddListing from '../components/BottomSheets/AddListing';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ClerkProvider, useUser } from '@clerk/clerk-expo';

// Mock the useUser hook
jest.mock('@clerk/clerk-expo', () => ({
  useUser: jest.fn(),
}));

const mockUseUser = useUser as jest.Mock;

describe('AddListing Component', () => {
  beforeEach(() => {
    mockUseUser.mockReturnValue({
      user: { id: 'test-user-id' },
    });
  });

  it('renders correctly', () => {
    const { getByText } = render(
      <ClerkProvider>
        <AddListing ref={React.createRef<BottomSheetModal>()} />
      </ClerkProvider>
    );
    expect(getByText('Add a Product')).toBeTruthy();
  });
  
  it('updates form state on input change', () => {
    const { getByPlaceholderText } = render(
      <ClerkProvider>
        <AddListing ref={React.createRef<BottomSheetModal>()} />
      </ClerkProvider>
    );
    const titleInput = getByPlaceholderText('A descriptive listing title');
    fireEvent.changeText(titleInput, 'New Title');
    expect(titleInput.props.value).toBe('New Title');
  });

  it('toggles trade switch', () => {
    const { getByText, getByRole } = render(
      <ClerkProvider>
        <AddListing ref={React.createRef<BottomSheetModal>()} />
      </ClerkProvider>
    );
    const tradeSwitch = getByRole('switch');
    fireEvent(tradeSwitch, 'onValueChange', true);
    expect(tradeSwitch.props.value).toBe(true);
  });

  // Add more test cases as needed
});
