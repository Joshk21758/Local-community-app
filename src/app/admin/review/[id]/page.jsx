import { notFound } from 'next/navigation';
import { getPermitById } from '@/lib/data';
import { adminPermitReviewSummary } from '@/ai/flows/admin-permit-review-summary';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Bot } from 'lucide-react';
import { AdminActions } from '@/components/admin-actions';
import { Badge } from '@/components/ui/badge';

export default async function AdminReviewPage({
  params,
}) {
  const permit = getPermitById(params.id);

  if (!permit) {
    notFound();
  }
  
  // In a real app, user info would be fetched from a database.
  const userInfo = `User: ${permit.applicantName}`;

  const summaryResult = await adminPermitReviewSummary({
    applicationDetails: permit.details,
    userInformation: userInfo,
  });

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Review Permit: {permit.id.toUpperCase()}</CardTitle>
              <CardDescription>
                Submitted by {permit.applicantName} on {permit.dateSubmitted}
              </CardDescription>
            </div>
             <Badge variant="secondary">{permit.type} Permit</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Application Details</h3>
              <p className="text-muted-foreground">{permit.details}</p>
            </div>
            <Separator />
            <div>
              <h3 className="font-semibold">Relevant Policies Mentioned</h3>
              <p className="text-muted-foreground">{permit.policyText}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <AdminActions permitId={permit.id} />
        </CardFooter>
      </Card>

      <Alert>
        <Bot className="h-4 w-4" />
        <AlertTitle>AI-Generated Summary</AlertTitle>
        <AlertDescription>{summaryResult.summary}</AlertDescription>
      </Alert>
    </div>
  );
}
