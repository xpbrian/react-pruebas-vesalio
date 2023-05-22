import { useContext } from 'react';
import LayoutContext from 'src/contexts/LayoutContext';

const useLayoutContext = () => useContext(LayoutContext);

export default useLayoutContext;
