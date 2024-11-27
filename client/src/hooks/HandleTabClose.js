import { useEffect } from 'react';
import Cookies from 'js-cookie';

function useHandleTabClose() {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const rememberMe = Cookies.get('rememberMe') === 'true';

      if (!rememberMe) {
        Cookies.remove('rememberMe');
        Cookies.remove('token');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
}

export default useHandleTabClose;
