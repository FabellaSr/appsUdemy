import type { Member } from "@/interfaces";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMemberById } from "@/pages/members/actions/get-member-by-id";
import { createUpdateMember } from "@/pages/members/actions/create-update-member";
import { getMembers } from "@/pages/members/actions/get-members";

export const useMembers = (id: string) => {
  const queryClient = useQueryClient();

    // LIST
  const membersQuery = useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: getMembers,
  });

  // DETAIL 
  const memberQuery = useQuery<Member>({
    queryKey: ["members", { id }],
    queryFn: () => getMemberById(id!),
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createUpdateMember,
    onSuccess: (member: Member) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({
        queryKey: ["members", { id: member.id }],
      });
      queryClient.setQueryData(["members", { id: member.id }], member);
    },
  });

  return {
    memberQuery,
    membersQuery,
    mutation,
  };
};




// interface useUsersRet {
//   data: Member[];
//   loading: boolean;
//   error: string | null;
//   setData: React.Dispatch<React.SetStateAction<Member[]>>;
//   reload: () => Promise<void>;
// }

// export function useMembers(): useUsersRet {
//   const [data, setData] = useState<Member[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
    
//   const reload = useCallback(async () => {
//     try {
//       setLoading(true);
//       const result = await membersService.list();
//       setData(result);
//       setError(null);
//     } catch (e: any) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     reload();
//   }, [reload]);

//   return { data, loading, error, setData,reload };
// }
