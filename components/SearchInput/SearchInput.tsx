import { useState } from 'react';
import Input from '../Input';
import { useRouter } from 'next/navigation';
import * as zora from '@zoralabs/protocol-sdk';

const SearchInput = () => {
  const [value, setValue] = useState('');
  const { push } = useRouter();

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const onEnterPress = () => {
    push(`/collector/${value}`);
  };

  return <Input onChange={onChange} onEnterPress={onEnterPress} />;
};

export default SearchInput;
