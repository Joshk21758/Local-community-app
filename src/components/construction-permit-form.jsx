'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { automatedPermitPolicyCheck } from '@/ai/flows/automated-permit-policy-check';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Bot, CheckCircle, XCircle } from 'lucide-react';
import { Progress } from './ui/progress';

const formSchema = z.object({
  constructionType: z.string({ required_error: 'Please select a construction type.' }),
  address: z.string().min(5, 'Address is required'),
  ownerName: z.string().min(2, "Owner's name is required"),
  contractorName: z.string().min(2, "Contractor's name is required"),
  projectDescription: z.string().min(20, 'Please provide a detailed project description.'),
  estimatedCost: z.coerce.number().positive('Please enter a valid cost.'),
  hasBlueprints: z.boolean().default(false),
  relevantPolicies: z.string().min(10, {
    message: 'Please provide some relevant policies.',
  }),
});

export function ConstructionPermitForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      ownerName: '',
      contractorName: '',
      projectDescription: '',
      hasBlueprints: false,
      relevantPolicies: ''
    },
  });

  async function onSubmit(values) {
    setLoading(true);
    setAiResult(null);
    try {
      const result = await automatedPermitPolicyCheck({
        applicationText: values.projectDescription,
        relevantPolicies: values.relevantPolicies,
      });
      setAiResult(result);
      toast({
        title: 'Application Submitted!',
        description: 'Your construction permit application has been sent for review.',
      });
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to submit application. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  }
  
  const likelihood = aiResult ? parseInt(aiResult.likelihoodOfSuccess, 10) : 0;
  const likelihoodColor = likelihood > 75 ? 'bg-accent' : likelihood > 40 ? 'bg-yellow-400' : 'bg-destructive';


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="constructionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Construction</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a construction type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="new-build">New Building</SelectItem>
                  <SelectItem value="renovation">Renovation</SelectItem>
                  <SelectItem value="demolition">Demolition</SelectItem>
                  <SelectItem value="addition">Addition</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Property Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Construction Ave, Buildsville" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="ownerName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Property Owner's Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="contractorName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Contractor's Name</FormLabel>
                <FormControl>
                    <Input placeholder="Bob's Builders Inc." {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
         <FormField
            control={form.control}
            name="projectDescription"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                    <Textarea placeholder="Detailed description of the work to be done..." className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="estimatedCost"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Estimated Project Cost ($)</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="50000" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="hasBlueprints"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                         Are blueprints/plans attached?
                        </FormLabel>
                        <FormDescription>
                            Confirm that architectural plans are included.
                        </FormDescription>
                    </div>
                    </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="relevantPolicies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Relevant Policies</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List policies that might apply (e.g., 'Policy B-1: Setback requirements')."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This will help the AI to check your application.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" disabled={loading}>
          {loading ? 'Analyzing...' : 'Submit Application & Check Policies'}
        </Button>
      </form>
       {(loading || aiResult) && (
        <Alert className="mt-8">
          <Bot className="h-4 w-4" />
          <AlertTitle>Automated Policy Check</AlertTitle>
          <AlertDescription>
            {loading && <p>The AI is analyzing your application...</p>}
            {aiResult && (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <p className="font-semibold">Likelihood of Success</p>
                    <p className={`font-bold text-lg ${
                      likelihood > 75 ? 'text-accent-foreground' : likelihood > 40 ? 'text-yellow-600' : 'text-destructive'
                    }`}>
                      {aiResult.likelihoodOfSuccess}
                    </p>
                  </div>
                  <Progress value={likelihood} className={`h-2 [&>div]:${likelihoodColor}`} />
                </div>
                <div>
                  <p className="font-semibold mb-1">AI Reasoning:</p>
                  <p className="text-sm text-muted-foreground">{aiResult.reasoning}</p>
                </div>
                <div className="flex items-center gap-2 pt-2">
                  {likelihood > 50 ? <CheckCircle className="h-4 w-4 text-accent-foreground"/> : <XCircle className="h-4 w-4 text-destructive"/>}
                  <p className="text-xs">
                    This is an automated check. A human administrator will make the final decision.
                  </p>
                </div>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </Form>
  );
}
