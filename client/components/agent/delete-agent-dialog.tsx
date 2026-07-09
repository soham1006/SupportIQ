'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { toast } from 'sonner';

import { useDeleteAgent } from '@/features/agent/use-delete-agent';

interface Props {
  id: string | null;
  open: boolean;
  onOpenChange: (
    open: boolean,
  ) => void;
}

export function DeleteAgentDialog({
  id,
  open,
  onOpenChange,
}: Props) {
  const deleteAgent =
    useDeleteAgent();

  async function handleDelete() {
    if (!id) return;

    try {
      await deleteAgent.mutateAsync(
        id,
      );

      toast.success(
        'Agent deleted successfully',
      );

      onOpenChange(false);

    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ??
          'Delete failed',
      );
    }
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Delete Agent?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This will deactivate the
            agent. They can no longer
            access SupportIQ.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={
              handleDelete
            }
          >
            Delete
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}