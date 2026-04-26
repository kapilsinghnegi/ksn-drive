'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Field, FieldError, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

type FormType = 'sign-in' | 'sign-up';

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    fullName:
      formType === 'sign-in'
        ? z.string().optional()
        : z
            .string()
            .min(1, 'Full name is required')
            .min(3, 'Full name must be at least 3 characters')
            .max(50, 'Full name must not exceed 50 characters')
            .trim(),
  });
};

export default function AuthForm({ type }: { type: FormType }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const schema = authFormSchema(type);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      console.log(data);
    } catch (error) {
      console.error('Error submitting the form:', error);
      setErrorMessage('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
      <h1 className="form-title">{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
      {type === 'sign-up' && (
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}> Full Name </FieldLabel>{' '}
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Enter your full name"
                className="shad-input"
                autoComplete="name"
              />{' '}
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}{' '}
            </Field>
          )}
        />
      )}
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}> Email </FieldLabel>
            <Input
              {...field}
              id={field.name}
              type="email"
              aria-invalid={fieldState.invalid}
              placeholder="Enter your email"
              className="shad-input"
              autoComplete="email"
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Button type="submit" className="form-submit-button" disabled={isLoading}>
        {type === 'sign-in' ? 'Sign In' : 'Sign Up'}{' '}
        {isLoading && (
          <Image
            src="/assets/icons/loader.svg"
            alt="loader"
            width={24}
            height={24}
            className="ml-2 animate-spin"
          />
        )}
      </Button>
      {errorMessage && <p className="error-message">*{errorMessage}</p>}{' '}
      <div className="body-2 flex justify-center">
        <p className="text-light-100">
          {type === 'sign-in' ? "Don't have an account?" : 'Already have an account?'}{' '}
        </p>
        <Link
          href={type === 'sign-in' ? '/sign-up' : '/sign-in'}
          className="ml-1 font-medium text-brand"
        >
          {type === 'sign-in' ? 'Sign Up' : 'Sign In'}{' '}
        </Link>
      </div>
    </form>
  );
}
