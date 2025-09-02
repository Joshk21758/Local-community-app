'use server';
/**
 * @fileOverview An AI agent to check permit applications against existing policies.
 *
 * - automatedPermitPolicyCheck - A function that handles the permit policy check process.
 * - AutomatedPermitPolicyCheckInput - The input type for the automatedPermitPolicyCheck function.
 * - AutomatedPermitPolicyCheckOutput - The return type for the automatedPermitPolicyCheck function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomatedPermitPolicyCheckInputSchema = z.object({
  applicationText: z
    .string()
    .describe('The complete text of the permit application.'),
  relevantPolicies: z
    .string()
    .describe('The relevant policies that apply to this permit.'),
});


const AutomatedPermitPolicyCheckOutputSchema = z.object({
  likelihoodOfSuccess: z
    .string()
    .describe(
      'The likelihood of the permit application being successful, as a percentage.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the likelihood of success, based on the application and policies.'
    ),
});


export async function automatedPermitPolicyCheck(
  input
) {
  return automatedPermitPolicyCheckFlow(input);
}

const prompt = ai.definePrompt({
  name: 'automatedPermitPolicyCheckPrompt',
  input: {schema: AutomatedPermitPolicyCheckInputSchema},
  output: {schema: AutomatedPermitPolicyCheckOutputSchema},
  prompt: `You are an AI assistant that analyzes permit applications against existing policies to determine the likelihood of success.

  Analyze the following permit application text:
  {{{applicationText}}}

  Against the following relevant policies:
  {{{relevantPolicies}}}

  Determine the likelihood of the application being successful, and provide reasoning for your determination.
  Include the likelihood of success as a percentage.
  `,
});

const automatedPermitPolicyCheckFlow = ai.defineFlow(
  {
    name: 'automatedPermitPolicyCheckFlow',
    inputSchema: AutomatedPermitPolicyCheckInputSchema,
    outputSchema: AutomatedPermitPolicyCheckOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output;
  }
);
