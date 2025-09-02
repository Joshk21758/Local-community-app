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
import type { PermitStatus } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const statusStyles: Record<PermitStatus, string> = {
  Approved: 'bg-accent text-accent-foreground',
  Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  'In Review': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Rejected: 'bg-destructive/20 text-destructive',
};

export default function DashboardPage() {
  const recentPermits = permits.slice(0, 5);

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Permits</CardDescription>
            <CardTitle className="text-4xl">{permits.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +1 from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved</CardDescription>
            <CardTitle className="text-4xl">
              {permits.filter((p) => p.status === 'Approved').length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Your approval rate is 50%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-4xl">
              {permits.filter((p) => p.status === 'Pending').length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +2 from last week
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rejected</CardDescription>
            <CardTitle className="text-4xl">
              {permits.filter((p) => p.status === 'Rejected').length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              -1 from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className='flex-row items-center'>
          <div className="grid gap-2">
          <CardTitle>Recent Permits</CardTitle>
          <CardDescription>
            An overview of your most recent permit applications.
          </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/permits">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Applicant</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentPermits.map((permit) => (
                <TableRow key={permit.id}>
                  <TableCell>
                    <div className="font-medium">{permit.applicantName}</div>
                  </TableCell>
                  <TableCell>{permit.type}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn('text-xs', statusStyles[permit.status])}
                      variant="outline"
                    >
                      {permit.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{permit.dateSubmitted}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
