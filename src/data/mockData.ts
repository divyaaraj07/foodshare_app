import { FoodListing, IncomingRequest, ActiveDispatch, FlaggedReport, NGOVerification, RecentRescue } from '../types';

export const INITIAL_LISTINGS: FoodListing[] = [
  {
    id: 'listing-1',
    title: 'Individually Packed Roasted Veggie & Grain Bowls',
    category: 'Prepared',
    categoryLabel: 'Cooked Meals',
    categoryBg: 'bg-secondary-container',
    categoryText: 'text-on-secondary-fixed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX-j91gIXg04ryv9jHoG9Yn_YiqBhRczuIxVPdlkTFj_biPlVjsoiIr5U2T6OMVE7o6Ry7hWLprHADbLMwFAYoOUpyF-3c4qhIDkF1AHLmEPpRj7I8nsetPf39A6sUFICS7ctxGzAZRCvM-5I8d9092vjmsa_N0D8vdAEfceDAwUG_EPmHUEA0fUB6wxsc0zZiPQhj8xbgOyWtgSYovgxvmxilCpHVXMhRxRIuVFT57_3Xj6uzUdc',
    imageAlt: 'Roasted veggie and quinoa grain bowls in eco-friendly compostable boxes',
    donorName: 'Urban Kitchen & Catering Co.',
    donorRating: 4.95,
    donorRescuesCount: 128,
    donorLocation: 'Tech Plaza Building B (1.8 mi)',
    distance: '1.2 mi',
    verified: true,
    donorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk',
    donorContactName: 'Maria Rodriguez',
    quantityString: '28 boxed meals • Approx. 28 adults',
    portions: 28,
    remainingQuantity: 28,
    weightKg: 14,
    pickupWindow: 'Today, 5:00 PM – 6:30 PM',
    urgentText: 'Urgent: Pick up by 6:30 PM',
    statusBadge: 'Available Now',
    statusType: 'available',
    hoursLeft: 2.25,
    isUrgent: true,
    tags: ['Vegetarian', 'Nut-Free', '100% Refrigerated', 'Prepared Today'],
    description: 'Freshly prepared wholesome grain bowls with quinoa, roasted Mediterranean vegetables, chickpeas, and lemon tahini dressing. Packed in eco-friendly compostable containers. Kept in industrial refrigeration since 2:00 PM.',
    allergenNotice: 'Contains sesame (tahini). Prepared in a certified kitchen with no dairy, no tree nuts, and no peanuts.',
    pickupAddress: '742 Evergreen Terrace, Back Loading Dock #3, Springfield',
    pickupInstructions: 'Ring buzzer for FoodShare pickup. Ask for Maria in the commercial kitchen. Easy curbside van parking available.'
  },
  {
    id: 'listing-2',
    title: 'Assorted Fresh Sourdough & Croissants',
    category: 'Bakery',
    categoryLabel: 'Bakery',
    categoryBg: 'bg-tertiary-fixed',
    categoryText: 'text-on-tertiary-fixed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTbQrg2xxdCqvONZ9QoExiXWdwz2P2CapGh7sUUOjtUh7dW9yqT75Vxt51rqohb7q3ZMF7BoOl8CXXFyhc8fAvNDK17AGENE3auO_3h_ypq3RK8gf8eCSFHpqTr0fwt2dlunItOKYw0hIdAKarPXkpeyrfsLZyj8FbwrJu95FoVuXkrBjHwOE9iW5b2ituT72E-13rXFxPt1Y8x1fncIwd5JDJ2F-RUs74Qf3Ab0S_RjLPyEkhsU',
    imageAlt: 'Golden fresh baked sourdough bread and croissants in wicker baskets',
    donorName: 'Artisan Hearth Bakery',
    donorRating: 4.9,
    donorRescuesCount: 94,
    donorLocation: 'Downtown Market St (0.6 mi)',
    distance: '0.6 mi',
    verified: true,
    donorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnsn5mglERQj9o7jV0eqohAnGMn6JaDqmhG-cppHoUlbVvDfGnWNK2IjwYDWZwXgO5lpskeAXfI4lNF4sIxspf3rMiyihioCi3kdWLSRD82hFmwBs10DJYpwSJH3m6oKwdXku9-qOVcEPHX6cG-H2iiFcpu91Xg8T_KWD5MnhC2wt41bxEkw_3_hEeFWBrjn6MBE4Bh6gqCsy2Qdfia9mKjRazWmmo0hBmTiIEe6uY3Z9qWkjYqVc',
    donorContactName: 'Julian Keller',
    quantityString: '18 kg • approx. 45 portions',
    portions: 45,
    remainingQuantity: 45,
    weightKg: 18,
    pickupWindow: 'Today, 5:00 PM – 7:30 PM',
    urgentText: 'Urgent: 2h left',
    statusBadge: 'Available Now',
    statusType: 'available',
    hoursLeft: 2,
    isUrgent: true,
    tags: ['Bakery', 'Vegetarian', 'Fresh Daily'],
    description: 'Fresh batch of rustic country loaves, seeded rye, and flaky butter croissants baked early this morning. Packed in sanitary food-grade paper bags.',
    allergenNotice: 'Contains wheat gluten and milk (croissants). Prepared in a facility handling sesame.',
    pickupAddress: '142 Market Street, Bakery Alley Entrance, Downtown',
    pickupInstructions: 'Come to the side delivery gate. Mention FoodShare claim.'
  },
  {
    id: 'listing-3',
    title: 'Crisp Salad Greens, Tomatoes & Cucumbers',
    category: 'Produce',
    categoryLabel: 'Produce',
    categoryBg: 'bg-primary-fixed',
    categoryText: 'text-on-primary-fixed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrZRPQPcMARSOtbh60w1kFhrDVpK4ESuSSu94Y7plTAi4vh3T_IZNg-poXf14blRz_Q39mrKkWvaC08Q3ACauJLE7ODUXR1PmrX0pt0u_NxmXuGVO3FDd9Y3Q9n3_v2oMvRDOctKUrgsUD_wvAa4WluvMvwH4A14Bw8SC7flOiKGrXk2Ju8JDFcEByz41DsEWYAVVqD_Ercu13nO_wOFdlqVtf80RTnh1G9_wZxMFZ2pFDoHcg8s',
    imageAlt: 'Fresh romaine lettuce, heirloom tomatoes, and cucumbers in wooden crates',
    donorName: 'Green Valley Farm Stand',
    donorRating: 4.8,
    donorRescuesCount: 156,
    donorLocation: 'Westside Community Hub (1.2 mi)',
    distance: '1.2 mi',
    verified: true,
    donorContactName: 'Sarah Jenkins',
    quantityString: '32 kg • 2 large crates',
    portions: 60,
    remainingQuantity: 60,
    weightKg: 32,
    pickupWindow: 'Today until 9:00 PM',
    urgentText: 'Available: 8h left',
    statusBadge: 'Verified Lot',
    statusType: 'verified',
    hoursLeft: 8,
    isUrgent: false,
    tags: ['Fresh Produce', 'Organic', 'Vegan', 'Gluten-Free'],
    description: 'Unsold organic farmers market surplus. Crisp green leaf lettuce, red heirloom cherry tomatoes, and English cucumbers. Kept cool in shaded storage.',
    allergenNotice: 'None. 100% natural raw produce.',
    pickupAddress: '880 Westside Avenue, Community Stall 4',
    pickupInstructions: 'Drive into the farmers market load-in bay. Crates ready by trailer.'
  },
  {
    id: 'listing-4',
    title: 'Individually Packed Mediterranean Lunch Bowls',
    category: 'Prepared',
    categoryLabel: 'Prepared Meals',
    categoryBg: 'bg-secondary-container',
    categoryText: 'text-on-secondary-fixed',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXVkcOLXSQiGEU6F1YNHxIHB0vpfg3y8zpGY63lWjk8FfIws0Dq--2XxdsancdS5XNFjuEC68dBFdnCk2dcgQOISOQCC5ccOeCKPCNaTLtonH6wvTEGLF2lRldKbmoC2rfJ1KgJBdPDq-yYKXPdTrzeLzWC43HcCxUT-06DR3HRW8BF0lvN-LhxwOGGvMANw6QM4p89DsOoX1E_MUWp1eL4orz6NH1btUVDsiK7kvuw8X7KoApibo',
    imageAlt: 'Gourmet Mediterranean meal prep bowls with quinoa, falafel, roasted veg',
    donorName: 'Olive & Herb Catering',
    donorRating: 4.9,
    donorRescuesCount: 78,
    donorLocation: 'Tech Plaza Building B (1.8 mi)',
    distance: '1.8 mi',
    verified: true,
    donorContactName: 'Omar Farooq',
    quantityString: '24 boxed meals • Veg options',
    portions: 24,
    remainingQuantity: 24,
    weightKg: 12,
    pickupWindow: 'Pickup by 6:00 PM',
    urgentText: 'Safe & Chilled',
    statusBadge: 'Safe & Chilled',
    statusType: 'refrigerated',
    hoursLeft: 3.5,
    isUrgent: true,
    tags: ['Vegetarian', 'Refrigerated', 'Prepared Meals'],
    description: 'Corporate executive luncheon surplus. Herb quinoa, roasted eggplant, crisp falafel, kalamata olives, and tahini drizzle. Maintained under 40°F.',
    allergenNotice: 'Contains sesame and tree nuts (garnish).',
    pickupAddress: '500 Tech Parkway, Suite 100 Dock, Financial District',
    pickupInstructions: 'Security desk will badge driver into service elevator.'
  }
];

export const INITIAL_INCOMING_REQUESTS: IncomingRequest[] = [
  {
    id: 'req-1',
    listingId: 'listing-1',
    recipientName: 'Hope Community Shelter',
    requestedItem: '28 Roasted Veggie Bowls',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCA1PEM06RIxvNPuWgxSXw7ZiJ1nI7J-hQP-OxprF-_xFvDjqeTw19te95KsJ_X3m7AwXwzVysbbeELVl_n2I3CGb2O1heH7IYOIM8OFe2ZySVhFiNx0-u1Y-Dp-ojdN8nhd6dcPweIqGyESEbX1sLPDNtAFH1ONExeGWkcvyfQK0RnZFlrS9lhRLfxrKqWwMquqYHF11oZb_x1QZVqw42KQ2x5FrqKshEE-tyC3hHnXwfdbg6H6LE',
    timeAgo: '10m ago',
    pickupTime: 'Today, 5:45 PM',
    volunteer: 'David S.',
    transportType: 'Van #2',
    status: 'pending'
  },
  {
    id: 'req-2',
    listingId: 'listing-2',
    recipientName: 'St. Jude Food Pantry',
    requestedItem: '15 kg Bakery Loaves',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTsTol66PoxJUl5JhXxhJXzjjjN3wTVoxB2fFxi5D5HTbubFfKlCb-qoCOUuLN8Nb8QlTLB2hhEdWDvC0P3yHFWR8HfsDCis9d6sIadV3EacH7Cm_lgAN1ajOhh4ILe8HUYh5V2bM7j6OTir1uQtba8eWq8Vj_TT-OjccJJSImvdG8s1VJyKK9wNNlTD_hc9tRo780BILYU_f7K1ppQJfER5L4l6BZhERz7zbAXCBbaewAkhtDzvQ',
    timeAgo: '32m ago',
    pickupTime: 'Today by 7:00 PM',
    volunteer: undefined,
    transportType: 'Self-Transport',
    status: 'pending'
  }
];

export const INITIAL_ACTIVE_DISPATCHES: ActiveDispatch[] = [
  {
    id: 'disp-1',
    title: '28 Individually Packed Veggie Bowls',
    category: 'PREPARED',
    categoryBg: 'bg-[#FFEDD5]',
    categoryColor: 'text-[#9A3412]',
    donorName: 'Urban Kitchen Catering',
    donorDistance: '0.8 mi',
    pickupWindow: 'Today 5:30 PM – 6:30 PM',
    driver: 'David S. (Van #2)',
    address: '742 Valencia St • Dock B entrance',
    eta: 'ETA 8m',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdhx-7qenExJBrcyEY4BFBVWZ3qi1stDrffm6yMloVXjVbDSLicsYb8IjnvWobpjqHp2__eBrQJfr6W0I-TPqqzKIBWDfeoGP47RTbCw3YSYds4jYWCDFeDgqgbXpyx3gQqG_Fvdpbvgbb9iwRCmEGB8yNsaxabx_agkUEBNUqxPMnrW7lJWbvIask7FJO7X_gVCJXBEXOfe_E7LeFmQUpPr4uxu05s0ccgQ38uImh_jHxMk2rQto',
    status: 'ready'
  }
];

export const INITIAL_FLAGGED_REPORTS: FlaggedReport[] = [
  {
    id: 'report-1',
    ticketId: 'FL-9021',
    title: 'Unlabeled Prepared Meat Stew',
    riskType: 'SAFETY RISK',
    timeAgo: '4m ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKSsXCzvZ1WtPzSokTalI47WwlLbMtnVcnt_rs3mdwXm78BJOrYBxgYQXwRLXMZp2eHUSESgw5DTnF3sf17gPqGs-ZS_7e254JvaS2YrPAJDqSVEPHNo_umQaCjxZ3qED6ZWxxDKZH0OHDnVvksKRl_YjjAzCacurJjCD0ds9Kxl0ncGKux3eETl4UfDFk1NrE2gZByAsCGtsj0-q-JTnXKFqQA8OJdAQ2kPqnx4VS-32OE1GS4j8',
    batchCode: 'Batch #309',
    reportedBy: 'Hope Community Shelter',
    donorName: 'Anonymous Caterer #49',
    detail: '"Missing mandatory allergen details (nuts/gluten suspected) and arrived warm, significantly past the 2-hour ambient window."',
    status: 'open'
  },
  {
    id: 'report-2',
    ticketId: 'FL-9018',
    title: 'Unclaimed 35x Sourdough Loaves',
    riskType: 'RESERVATION NO-SHOW',
    timeAgo: '38m ago',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxTbQrg2xxdCqvONZ9QoExiXWdwz2P2CapGh7sUUOjtUh7dW9yqT75Vxt51rqohb7q3ZMF7BoOl8CXXFyhc8fAvNDK17AGENE3auO_3h_ypq3RK8gf8eCSFHpqTr0fwt2dlunItOKYw0hIdAKarPXkpeyrfsLZyj8FbwrJu95FoVuXkrBjHwOE9iW5b2ituT72E-13rXFxPt1Y8x1fncIwd5JDJ2F-RUs74Qf3Ab0S_RjLPyEkhsU',
    batchCode: 'Batch #288',
    reportedBy: 'Artisan Crust Bakery',
    donorName: 'Artisan Crust Bakery',
    detail: 'Volunteer driver did not arrive within pickup window; donation risking expiration.',
    status: 'open'
  }
];

export const INITIAL_NGO_VERIFICATIONS: NGOVerification[] = [
  {
    id: 'ngo-1',
    name: 'West End Youth Pantry',
    location: 'Seattle, WA',
    registeredAgo: 'Registered 2 hours ago',
    taxStatus: '501(c)(3) Public Charity',
    ein: '#84-291039',
    storageCapacity: '3 Commercial Freezers',
    documentName: 'IRS_Determination_Letter.pdf',
    documentSize: '1.4 MB',
    status: 'awaiting'
  },
  {
    id: 'ngo-2',
    name: 'Harbor Street Soup Kitchen',
    location: 'Portland, OR',
    registeredAgo: '1 day ago',
    taxStatus: '501(c)(3) Nonprofit',
    ein: '#91-882012',
    storageCapacity: 'Walk-in Chiller + Dry Storage',
    documentName: 'Food_Safety_Inspection.pdf',
    documentSize: '2.1 MB',
    status: 'awaiting'
  }
];

export const RECENT_RESCUES: RecentRescue[] = [
  {
    id: 'res-1',
    title: '40 kg Apples & Pears',
    donor: 'Orchard Direct',
    date: '18 Nov',
    type: 'produce',
    completed: true
  },
  {
    id: 'res-2',
    title: '50 Boxed Sandwiches',
    donor: 'Downtown Deli Hub',
    date: '16 Nov',
    type: 'prepared',
    completed: true
  },
  {
    id: 'res-3',
    title: '20 Gallons Milk',
    donor: 'Clover Valley Dairy',
    date: '14 Nov',
    type: 'dairy',
    completed: true
  }
];
