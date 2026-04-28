'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Spinner } from '../ui/spinner';
import { X } from 'lucide-react';
import { verifySecret, sendEmailOTP } from '@/lib/actions/user.actions';

export default function OTPModal({ accountId, email }: { accountId: string; email: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const sessionId = await verifySecret({ userId: accountId, secret: value });
      if (sessionId) router.push('/');
    } catch (error) {
      console.log('Failed to verify OTP', error);
    }
    setIsLoading(false);
  };

  const handleResendOtp = async () => {
    await sendEmailOTP({ email });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger render={<Button variant="outline">Show Dialog</Button>} />
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogHeader className="relative grid place-content-center">
          <AlertDialogTitle className="h2 text-center font-bold">
            Enter Your OTP
            <X className="otp-close-button size-6" onClick={() => setIsOpen(false)} />
          </AlertDialogTitle>
          <AlertDialogDescription className="subtitle-2 text-center text-light-100 font-semibold">
            We&apos;ve sent a code to <span className="pl-1 text-brand">{email}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <InputOTP maxLength={6} value={value} onChange={setValue}>
          <InputOTPGroup className="shad-otp">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <AlertDialogFooter>
          <div className="flex w-full flex-col gap-4">
            <AlertDialogAction
              onClick={handleSubmit}
              className="shad-submit-btn h-12"
              type="button"
            >
              Submit
              {isLoading && <Spinner />}
            </AlertDialogAction>

            <div className="subtitle-2 mt-2 text-center text-light-100">
              Didn&apos;t get a code?
              <Button
                type="button"
                variant="link"
                className="pl-1 text-brand"
                onClick={handleResendOtp}
              >
                Click to resend
              </Button>
            </div>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
