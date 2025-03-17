import { useState } from 'react';

let globalId = 0;

export function useId(prefix: string = 'id'): string {
  const [id] = useState(() => `${prefix}-${globalId++}`);
  return id;
} 