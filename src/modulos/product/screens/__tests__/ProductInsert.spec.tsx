import { render } from '@testing-library/react';
import { InputHTMLAttributes } from 'react';
import { SelectHTMLAttributes } from 'react';

import { mockProductInsert } from '../../__mocks__/productInsert.mock';
import { ProductInsertTestIdEnum } from '../../enum/ProductInsertTestIdEnum';
import ProductInsert from '../ProductInsert';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

type InputMoneyProps = InputHTMLAttributes<HTMLInputElement>;

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string; label: string }[];
};

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../../../category/hooks/useCategory', () => ({
  useCategory: () => ({
    categories: [],
  }),
}));

jest.mock('../../hooks/useInsertProduct', () => ({
  useInsertProduct: () => ({
    product: mockProductInsert,
    loading: false,
    disableButton: false,
    onChangeInput: jest.fn(),
    handleInsertProduct: jest.fn(),
    handleChangeSelect: jest.fn(),
  }),
}));

jest.mock('../../../../shared/components/screen/Screen', () => {
  const MockScreen = ({ children }: { children: React.ReactNode }) => <div>{children}</div>;
  MockScreen.displayName = 'Screen';
  return MockScreen;
});

jest.mock('../../../../shared/components/buttons/button/Button', () => {
  const MockButton = ({
    danger,
    loading,
    ...rest
  }: { danger?: boolean; loading?: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...rest}>{loading ? 'Loading...' : danger ? 'Danger' : 'Button'}</button>
  );
  MockButton.displayName = 'Button';
  return MockButton;
});

jest.mock('../../../../shared/components/inputs/input/Input', () => {
  const MockInput = (props: InputProps) => <input {...props} />;
  MockInput.displayName = 'Input';
  return MockInput;
});

jest.mock('../../../../shared/components/inputs/inputMoney/inputMoney', () => {
  const MockInputMoney = (props: InputMoneyProps) => <input {...props} />;
  MockInputMoney.displayName = 'InputMoney';
  return MockInputMoney;
});

jest.mock('../../../../shared/components/inputs/select/Select', () => {
  const MockSelect = (props: SelectProps) => <select {...props} />;
  MockSelect.displayName = 'Select';
  return MockSelect;
});

describe('Test Button', () => {
  it('should render', () => {
    const { getByTestId } = render(<ProductInsert />);

    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_CANCEL)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_BUTTON_INSERT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_IMAGE)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_NAME)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_PRICE)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INPUT_SELECT)).toBeDefined();
    expect(getByTestId(ProductInsertTestIdEnum.PRODUCT_INSERT_CONTAINER)).toBeDefined();
  });
});
