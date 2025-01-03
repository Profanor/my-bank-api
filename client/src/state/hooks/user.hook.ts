import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../reducers/auth.reducer';

export const useAuth = () => {
  const user = useSelector(selectUser);
  console.log('Chosen user:', user);
  return useMemo(
    () => ({ user }),
    [user],
  );
};
