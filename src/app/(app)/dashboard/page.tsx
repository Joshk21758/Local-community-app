import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { PoliceClearanceForm } from '@/components/police-clearance-form';

export default function PoliceClearancePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Police Clearance Application</CardTitle>
        <CardDescription>
          Fill out the form to apply for a police clearance certificate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PoliceClearanceForm />
      </CardContent>
    </Card>
  );
}