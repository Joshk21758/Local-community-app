import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BirthCertificateForm } from '@/components/birth-certificate-form';

export default function BirthCertificatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Birth Certificate Application</CardTitle>
        <CardDescription>
          Fill out the form to request a copy of a birth certificate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BirthCertificateForm />
      </CardContent>
    </Card>
  );
}
