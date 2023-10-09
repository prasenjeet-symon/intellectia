import { assignTopic, assignTopics, deleteTopic, getAssignedTopics, getTopics } from "@/api/api";
import { dispatchAPIError, dispatchAPIViewError, dispatchAPIViewSuccess } from "@/lib/appUtils";
import { APIHookType, IAxiosError, IHookContext, ITopicResult, ReactQueryKey } from "@/types/types";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

/**
 * Hook - Topics
 * Get all the topics of the application
 */
export function useGetAllTopics(ctx?: IHookContext) {
  const fetchQuery = useQuery<unknown, AxiosError<IAxiosError>, ITopicResult[], string[]>([ReactQueryKey.GetTopics()], () => getTopics(), {
    onError: (err) => {
      dispatchAPIError({
        hookCtx: APIHookType.GetTopics,
        message: err,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.GetTopics,
          message: err.response?.data.error,
        });
      }
    },
    onSuccess: () => {
      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.GetTopics,
          message: "Topics fetched successfully",
        });
      }
    },
  });

  const fetch = async () => {
    try {
      await fetchQuery.refetch();
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.GetTopics,
        message: error,
      });
    }
  };

  return { fetch, isLoading: fetchQuery.isLoading, isError: fetchQuery.isError, data: fetchQuery.data ? fetchQuery.data : [] };
}
/**
 *
 * Hook - Topics
 * Get all the assigned topics of the user ( logged in )
 */
export function useGetAssignedTopics(ctx?: IHookContext) {
  const fetchQuery = useQuery<unknown, AxiosError<IAxiosError>, ITopicResult[], string[]>([ReactQueryKey.GetTopicsByUser()], () => getAssignedTopics(), {
    onError: (err) => {
      dispatchAPIError({
        hookCtx: APIHookType.GetTopicsByUser,
        message: err,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.GetTopicsByUser,
          message: err.response?.data.error,
        });
      }
    },

    onSuccess: () => {
      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.GetTopicsByUser,
          message: "Topics of user fetched successfully",
        });
      }
    },
  });

  const fetch = async () => {
    try {
      await fetchQuery.refetch();
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.GetTopicsByUser,
        message: error,
      });
    }
  };

  return { fetch, isLoading: fetchQuery.isLoading, isError: fetchQuery.isError, data: fetchQuery.data ? fetchQuery.data : [] };
}

/**
 * Hook - Topics
 * Assign multiple topics to the user
 */
export function useAssignTopics(ctx?: IHookContext) {
  // mutation
  const assignTopicsMutation = useMutation<string, AxiosError<IAxiosError>, { topics: ITopicResult[] }, unknown>((inputData) => assignTopics(inputData.topics.map((p) => p.id)), {
    onError: (error) => {
      dispatchAPIError({
        hookCtx: APIHookType.AssignTopics,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.AssignTopics,
          message: error.response?.data.error,
        });
      }
    },
    onSuccess: () => {
      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.AssignTopics,
          message: "Topics assigned successfully",
        });
      }
    },
    onMutate: () => {},
  });

  const assign = async (topics: ITopicResult[]) => {
    try {
      await assignTopicsMutation.mutateAsync({ topics });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.AssignTopics,
        message: error,
      });
    }
  };

  return { assign, isLoading: assignTopicsMutation.isLoading };
}

/**
 * Hook - Topics
 * Assign single topic to the user
 */
export function useAssignTopic(ctx?: IHookContext) {
  const queryClient = useQueryClient();
  // mutation
  const assignTopicMutation = useMutation<string, AxiosError<IAxiosError>, { topic: ITopicResult }, any>((inputData) => assignTopic(inputData.topic.id), {
    onError: (error, arg, context) => {
      queryClient.setQueriesData([ReactQueryKey.GetTopicsByUser()], context?.prevData);

      dispatchAPIError({
        hookCtx: APIHookType.AssignTopic,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.AssignTopic,
          message: error.response?.data.error,
        });
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries([ReactQueryKey.GetTopicsByUser()]);
    },

    onSuccess: () => {
      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.AssignTopic,
          message: "Topic assigned successfully",
        });
      }
    },
    onMutate: async (arg) => {
      await queryClient.cancelQueries([ReactQueryKey.GetTopicsByUser()]);
      const prevData = queryClient.getQueriesData([ReactQueryKey.GetTopicsByUser()]);

      queryClient.setQueryData<ITopicResult[]>([ReactQueryKey.GetTopicsByUser()], (oldData) => {
        return [...(oldData ? oldData : []), arg.topic];
      });

      return {
        prevData,
      };
    },
  });

  const assign = async (topic: ITopicResult) => {
    try {
      await assignTopicMutation.mutateAsync({ topic });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.AssignTopic,
        message: error,
      });
    }
  };

  return { assign, isLoading: assignTopicMutation.isLoading };
}

/**
 * Hook - Topics
 * Delete a topic from the user
 */
export function useDeleteTopic(ctx?: IHookContext) {
  const queryClient = useQueryClient();
  // mutation
  const deleteTopicMutation = useMutation<string, AxiosError<IAxiosError>, { topic: ITopicResult }, any>((inputData) => deleteTopic(inputData.topic.id), {
    onError: (error, _arg, context) => {
      if (context) {
        queryClient.setQueriesData([ReactQueryKey.GetTopicsByUser()], context?.prevData);
      }

      dispatchAPIError({
        hookCtx: APIHookType.DeleteTopic,
        message: error,
      });

      if (!ctx || (ctx && ctx.showErrors)) {
        dispatchAPIViewError({
          hookCtx: APIHookType.DeleteTopic,
          message: error.response?.data.error,
        });
      }
    },
    onSuccess: () => {
      if (!ctx || (ctx && ctx.showSuccess)) {
        dispatchAPIViewSuccess({
          hookCtx: APIHookType.DeleteTopic,
          message: "Topic deleted successfully",
        });
      }
    },
    onMutate: async (arg) => {
      await queryClient.cancelQueries([ReactQueryKey.GetTopicsByUser()]);
      const prevData = queryClient.getQueriesData([ReactQueryKey.GetTopicsByUser()]);

      queryClient.setQueryData<ITopicResult[]>([ReactQueryKey.GetTopicsByUser()], (oldData) => {
        return (oldData ? oldData : []).filter((topic) => topic.id !== arg.topic.id);
      });

      return {
        prevData,
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries([ReactQueryKey.GetTopicsByUser()]);
    },
  });

  const deleteSingleTopic = async (topic: ITopicResult) => {
    try {
      await deleteTopicMutation.mutateAsync({ topic });
    } catch (error: any) {
      dispatchAPIError({
        hookCtx: APIHookType.DeleteTopic,
        message: error,
      });
    }
  };

  return { delete: deleteSingleTopic, isLoading: deleteTopicMutation.isLoading };
}
