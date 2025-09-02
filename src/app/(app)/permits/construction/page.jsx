import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ConstructionPermitForm } from '@/components/construction-permit-form';

export default function ConstructionPermitPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Construction Permit Application</CardTitle>
        <CardDescription>
          Fill out the form below to apply for a construction permit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ConstructionPermitForm />
      </CardContent>
    </Card>
  );
}
