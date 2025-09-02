'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Check, X } from 'lucide-react';

export function AdminActions({ permitId }) {
  const { toast } = useToast();

  const handleApprove = () => {
    toast({
      title: 'Permit Approved',
      description: `Permit #${permitId.toUpperCase()} has been approved.`,
    });
  };

  const handleReject = () => {
    toast({
      variant: 'destructive',
      title: 'Permit Rejected',
      description: `Permit #${permitId.toUpperCase()} has been rejected.`,
    });
  };

  return (
    <div className="flex gap-2">
      <Button onClick={handleApprove} className="bg-accent text-accent-foreground hover:bg-accent/90">
        <Check className="mr-2 h-4 w-4" /> Approve
      </Button>
      <Button variant="destructive" onClick={handleReject}>
        <X className="mr-2 h-4 w-4" /> Reject
      </Button>
    </div>
  );
}
