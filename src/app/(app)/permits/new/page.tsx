import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EventPermitForm } from '@/components/event-permit-form';

export default function EventPermitPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Permit Application</CardTitle>
        <CardDescription>
          Fill out the form below to apply for an event permit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EventPermitForm />
      </CardContent>
    </Card>
  );
}