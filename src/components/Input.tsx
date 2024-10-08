import React from 'react';

interface Props {
  children: React.ReactNode;
  type: string;
  required?: boolean;
  hig?: boolean;
  style?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ children, type, required, hig, onChange } : Props) {
 return (
  <>
   <label className={`${hig && 'text-green-600'} flex flex-col w-full text-sm font-normal text-zinc-400 mb-1`}>
    {children}
    <input type={type} required={required} onChange={onChange} className="w-full ring-1 p-2 h-10 text-zinc-500 font-semibold rounded-md hover:ring-blue-400" />
   </label>
  </>
 );
}
