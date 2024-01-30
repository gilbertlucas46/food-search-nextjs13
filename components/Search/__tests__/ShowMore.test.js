import { render, screen, fireEvent } from '@testing-library/react';
import { ShowMore } from '../ShowMore';
import { queryFood } from '../../../app/actions/fetchFood';
import { mockedFood } from '../../../__mocks__/foods';
import { categories } from '../../../__mocks__/categories';

jest.mock('../../../app/actions/fetchFood', () => ({
  __esModule: true,
  queryFood: jest.fn(() => Promise.resolve(mockedFood)),
}));

beforeEach(() => {
  queryFood.mockResolvedValue(mockedFood);
});

describe('<ShowMore/>', () => {
  test('ShowMore should render initial foods in Foods component', async () => {
    render(
      <ShowMore
        search="Niquent"
        initialFoods={mockedFood}
        totalPages={2}
        categoryId="6288a89fac9e970731bfaa7b"
        categories={categories}
      />
    );

    // Check if the component renders without errors
    const cardsWrapper = screen.getByTestId('showmore-component');
    expect(cardsWrapper).toBeInTheDocument();

    // Check if the initial foods are displayed in the Foods component
    const foodsComponent = screen.getByTestId('foods-component');
    expect(foodsComponent).toBeInTheDocument();

    mockedFood.data.forEach(({ name }) => {
      const initialFoodItem = screen.getByText(name);
      expect(initialFoodItem).toBeInTheDocument();
    });

    // Check if the "Show More" button is present
    const showMoreButton = screen.getByText('Show More');
    expect(showMoreButton).toBeInTheDocument();

    // Click the "Show More" button
    fireEvent.click(showMoreButton);

    // Check if additional foods are loaded after clicking the button
  await screen.findByText((content, element) => {
    // Use a custom function to match the content you expect
    return content.includes('Niquent');
  }, { timeout: 5000 });
  });
});
