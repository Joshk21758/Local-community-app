import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { permits } from '@/lib/data';

export default function AdminDashboard() {
  const pendingPermits = permits.filter(p => p.status === 'Pending' || p.status === 'In Review');
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Applications</CardTitle>
        <CardDescription>
          Review and take action on new permit applications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Applicant</TableHead>
              <TableHead>Permit Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingPermits.map((permit) => (
              <TableRow key={permit.id}>
                <TableCell className="font-medium">{permit.applicantName}</TableCell>
                <TableCell>{permit.type}</TableCell>
                <TableCell>
                  <Badge variant="outline">{permit.status}</Badge>
                </TableCell>
                <TableCell>{permit.dateSubmitted}</TableCell>
                <TableCell>
                  <Button asChild size="sm" className="gap-1">
                    <Link href={`/admin/review/${permit.id}`}>
                      Review
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}