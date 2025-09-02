export const permits = [
  {
    id: 'p001',
    type: 'Building',
    applicantName: 'Alice Johnson',
    dateSubmitted: '2023-10-26',
    status: 'Approved',
    details: 'Application for a new residential deck construction. The proposed structure is a 12x16 feet wooden deck attached to the rear of the property. All materials and plans are compliant with local building codes.',
    policyText: 'Policy B-1: Residential structures must be set back at least 10 feet from property lines. Policy B-2: Decks higher than 30 inches require railings.',
  },
  {
    id: 'p002',
    type: 'Event',
    applicantName: 'Bob Williams',
    dateSubmitted: '2023-11-05',
    status: 'Pending',
    details: 'Permit for a community block party on November 25th. The event will involve street closure from 10 AM to 6 PM, a small stage for local bands, and food vendors. Expected attendance is 200 people.',
    policyText: 'Policy E-1: Events with over 100 attendees require a security plan. Policy E-3: Street closures must be approved by the traffic department at least 2 weeks in advance.',
  },
  {
    id: 'p003',
    type: 'Business',
    applicantName: 'Charlie Brown',
    dateSubmitted: '2023-11-10',
    status: 'Rejected',
    details: 'Application to open a new coffee shop in the downtown historic district. The proposed business will operate from 6 AM to 8 PM daily. Renovation plans include a new sign that does not match historical guidelines.',
    policyText: 'Policy H-5: Signage in the historic district must use pre-approved fonts and materials. Policy C-2: New businesses must provide a parking availability study.',
  },
  {
    id: 'p004',
    type: 'Building',
    applicantName: 'Diana Prince',
    dateSubmitted: '2023-11-12',
    status: 'In Review',
    details: 'Application for solar panel installation on a residential rooftop. The system consists of 24 panels and is expected to generate 8kW of power. All necessary electrical diagrams are attached.',
    policyText: 'Policy B-7: Solar installations must be inspected by a certified electrician. Policy G-1: Renewable energy installations are eligible for a tax credit.',
  },
];

export const certificates = [
  {
    id: 'c01',
    title: 'Certificate of Occupancy',
    description: 'Issued for new constructions after passing all required inspections.',
    fileUrl: '#',
  },
  {
    id: 'c02',
    title: 'Business License',
    description: 'Official license to operate a commercial business within the community.',
    fileUrl: '#',
  },
  {
    id: 'c03',
    title: 'Food Handler Certificate',
    description: 'Required for individuals working in the food service industry.',
    fileUrl: '#',
  },
  {
    id: 'c04',
    title: 'Marriage Certificate',
    description: 'Official record of a marriage ceremony performed in the jurisdiction.',
    fileUrl: '#',
  },
];

export const wasteForms = [
  {
    id: 'w01',
    title: 'Bulk Waste Pickup Request',
    description: 'Schedule a pickup for large items like furniture and appliances.',
    fileUrl: '#',
  },
  {
    id: 'w02',
    title: 'New Resident Recycling Bin',
    description: 'Request a new recycling bin for your household.',
    fileUrl: '#',
  },
  {
    id: 'w03',
    title: 'Hazardous Waste Disposal Guide',
    description: 'Information and guidelines on how to dispose of hazardous materials safely.',
    fileUrl: '#',
  },
  {
    id: 'w04',
    title: 'Commercial Waste Service Agreement',
    description: 'Form to set up or modify waste collection services for businesses.',
    fileUrl: '#',
  },
];

export const getPermitById = (id) => {
  return permits.find(p => p.id === id);
}
