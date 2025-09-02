import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trash2, Recycle, Download } from 'lucide-react';
import { wasteForms } from '@/lib/data';

const iconMap = {
  w01: Trash2,
  w02: Recycle,
  w03: Trash2,
  w04: Recycle,
};

export default function WasteManagementPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold font-headline">Waste Management</h1>
        <p className="text-muted-foreground">
          Access forms for waste management services.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {wasteForms.map((form) => {
          const Icon = iconMap[form.id] || Trash2;
          return (
            <Card key={form.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  {form.title}
                </CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">{form.description}</CardDescription>
                <Button size="sm" variant="outline" asChild>
                  <a href={form.fileUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download Form
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}