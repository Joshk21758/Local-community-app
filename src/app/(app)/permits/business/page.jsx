import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BusinessPermitForm } from '@/components/business-permit-form';

export default function BusinessPermitPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Business Permit Application</CardTitle>
        <CardDescription>
          Fill out the form below to apply for a business permit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BusinessPermitForm />
      </CardContent>
    </Card>
  );
}
