import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MarriageCertificateForm } from '@/components/marriage-certificate-form';

export default function MarriageCertificatePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marriage Certificate Application</CardTitle>
        <CardDescription>
          Fill out the form to request a copy of a marriage certificate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MarriageCertificateForm />
      </CardContent>
    </Card>
  );
}
