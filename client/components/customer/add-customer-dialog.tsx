'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createCustomerSchema,
  CreateCustomerForm,
} from '@/features/customer/create-customer.schema';

import { useCreateCustomer } from '@/features/customer/use-create-customer';

import { toast } from 'sonner';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AddCustomerDialog() {
  const createCustomer =
    useCreateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerForm>({
    resolver: zodResolver(
      createCustomerSchema,
    ),
  });

  async function onSubmit(
    data: CreateCustomerForm,
  ) {
    try {
      await createCustomer.mutateAsync(
        data,
      );

      toast.success(
        'Customer created',
      );

      reset();

    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ??
          'Failed',
      );
    }
  }

  return (
    <Dialog>

      <DialogTrigger asChild>

        <Button>
          + Add Customer
        </Button>

      </DialogTrigger>

      <DialogContent>

        <DialogHeader>

          <DialogTitle>
            Create Customer
          </DialogTitle>

        </DialogHeader>

        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-4"
        >

          <Input
            placeholder="Name"
            {...register('name')}
          />

          <p className="text-sm text-red-500">
            {errors.name?.message}
          </p>

          <Input
            placeholder="Email"
            {...register('email')}
          />

          <p className="text-sm text-red-500">
            {errors.email?.message}
          </p>

          <Input
            type="password"
            placeholder="Password"
            {...register(
              'password',
            )}
          />

          <p className="text-sm text-red-500">
            {errors.password?.message}
          </p>

          <Button
            type="submit"
            className="w-full"
          >
            Create Customer
          </Button>

        </form>

      </DialogContent>

    </Dialog>
  );
}