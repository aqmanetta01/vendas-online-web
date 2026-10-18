
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { URL_CATEGORY } from '../../../shared/constants/urls';
import { MethodsEnum } from '../../../shared/enums/methods.enums';
import { useRequests } from '../../../shared/hooks/useRequests';
import { useCategoryReducer } from '../../../store/reducers/categoryReducer/useCategoryReducer';
import { CategoryRoutesEnum } from '../routes';

export const useInsertCategory = () => {
  const navigate = useNavigate();
  const { request } = useRequests();

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabledButton, setDisabledButton] = useState(true);

  const { setCategories } = useCategoryReducer();

  useEffect(() => {
    setDisabledButton(!name);
  }, [name]);

  const insertCategory = async () => {
    setLoading(true);

    try {
      await request(
        URL_CATEGORY,
        MethodsEnum.POST,
        undefined,
        { name }
      );

      await request(
        URL_CATEGORY,
        MethodsEnum.GET,
        setCategories
      );

      navigate(CategoryRoutesEnum.CATEGORY);
    } finally {
      setLoading(false);
    }
  };

  const handleOnChangeName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(event.target.value);
  };

  return {
    disabledButton,
    name,
    handleOnChangeName,
    insertCategory,
    loading,
  };
};
