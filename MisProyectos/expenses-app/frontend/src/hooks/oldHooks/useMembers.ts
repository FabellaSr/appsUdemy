import { useCallback, useEffect, useState } from 'react';
 
import type { Member } from '@/interfaces';
import { membersService } from '@/services/membersService';

interface useUsersRet {
  data: Member[];
  loading: boolean;
  error: string | null;
  setData: React.Dispatch<React.SetStateAction<Member[]>>;
  reload: () => Promise<void>;
}

export function useMembers(): useUsersRet {
  const [data, setData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
    
  const reload = useCallback(async () => {
    try {
      setLoading(true);
      const result = await membersService.list();
      setData(result);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, error, setData,reload };
}
