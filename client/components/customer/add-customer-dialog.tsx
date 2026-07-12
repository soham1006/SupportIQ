'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import {
  Eye,
  EyeOff,
  Plus,
} from 'lucide-react';

import {
  createCustomerSchema,
  CreateCustomerForm,
} from '@/features/customer/create-customer.schema';

import { useCreateCustomer } from '@/features/customer/use-create-customer';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function AddCustomerDialog() {
  const [open, setOpen] =
    useState(false);

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);

  const createCustomer =
    useCreateCustomer();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
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
        'Customer created successfully',
      );

      reset();

      setOpen(false);
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ??
          'Failed to create customer',
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={18} />

          Add Customer
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
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label>
              Full Name
            </Label>

            <Input
              placeholder="John Doe"
              {...register('name')}
            />

            {errors.name && (
              <p className="text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Email
            </Label>

            <Input
              type="email"
              placeholder="john@example.com"
              {...register('email')}
            />

            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Temporary Password
            </Label>

            <div className="relative">
              <Input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                placeholder="Minimum 8 characters"
                className="pr-12"
                {...register(
                  'password',
                )}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    value => !value,
                  )
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                  />
                ) : (
                  <Eye
                    size={18}
                  />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">
                {
                  errors.password
                    .message
                }
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              createCustomer.isPending
            }
          >
            {createCustomer.isPending
              ? 'Creating Customer...'
              : 'Create Customer'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}