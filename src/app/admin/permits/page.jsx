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
import { permits } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const statusStyles = {
  Approved: 'bg-accent/20 text-accent-foreground border-accent/20',
  Pending:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900/50',
  'In Review':
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-900/50',
  Rejected: 'bg-destructive/20 text-destructive border-destructive/20',
};

export default function AllPermitsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Permit Applications</CardTitle>
        <CardDescription>
          View and manage all permit applications submitted by users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permit ID</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Submitted</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permits.map((permit) => (
              <TableRow key={permit.id}>
                <TableCell className="font-medium">
                  {permit.id.toUpperCase()}
                </TableCell>
                <TableCell>{permit.applicantName}</TableCell>
                <TableCell>{permit.type}</TableCell>
                <TableCell>
                  <Badge
                    className={cn('font-semibold', statusStyles[permit.status])}
                  >
                    {permit.status}
                  </Badge>
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
