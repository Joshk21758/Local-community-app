'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from './ui/popover';
import { Calendar } from './ui/calendar';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';


const formSchema = z.object({
  spouseOneName: z.string().min(2, "Spouse's full name is required."),
  spouseTwoName: z.string().min(2, "Spouse's full name is required."),
  dateOfMarriage: z.date({
    required_error: "Date of marriage is required.",
  }),
  placeOfMarriage: z.string().min(3, 'Place of marriage is required'),
  requesterRelationship: z.enum(["self", "spouse"], {
    required_error: "You must select your relationship.",
  }),
});

export function MarriageCertificateForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spouseOneName: '',
      spouseTwoName: '',
      placeOfMarriage: '',
    },
  });

  function onSubmit(values) {
    console.log(values);
    toast({
      title: 'Request Submitted!',
      description: 'Your marriage certificate request has been received.',
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="spouseOneName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Spouse One Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="John M. Doe" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="spouseTwoName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Spouse Two Full Name</FormLabel>
                <FormControl>
                    <Input placeholder="Jane A. Smith" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
                control={form.control}
                name="dateOfMarriage"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Date of Marriage</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="placeOfMarriage"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>City/Town of Marriage</FormLabel>
                    <FormControl>
                        <Input placeholder="Anytown" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
        </div>
        <FormField
          control={form.control}
          name="requesterRelationship"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Your relationship to this couple...</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="self" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I am one of the people named on the certificate.
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="spouse" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      I am the spouse of one of the people named.
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Request</Button>
      </form>
    </Form>
  );
}
