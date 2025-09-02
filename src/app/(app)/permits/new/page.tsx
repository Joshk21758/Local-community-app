import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PermitForm } from '@/components/permit-form';

export default function NewPermitPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Permit Application</CardTitle>
        <CardDescription>
          Fill out the form below to submit a new permit application.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PermitForm />
      </CardContent>
    </Card>
  );
}
