// i have to inser a dummy leads in my db

import lead from "../models/leads.js";



export const insertLeads = async()=>{

  const dummyData = [
{
    "first_name": "Olivia",
    "last_name": "Hernandez",
    "email": "olivia.hernandez26@example.com",
    "phone": "+918765432101",
    "company": "Hernandez Group",
    "city": "North Brian",
    "state": "Texas",
    "source": "referral",
    "status": "qualified",
    "score": 85,
    "lead_value": 7543.22,
    "last_activity_at": "2025-08-18 19:12:11",
    "is_qualified": true,
    "created_at": "2025-06-28 15:21:12",
    "updated_at": "2025-08-20 08:41:19"
  },
  {
    "first_name": "James",
    "last_name": "Wilson",
    "email": "james.wilson27@example.com",
    "phone": "+919998123456",
    "company": "Wilson Ltd",
    "city": "Lake Andrew",
    "state": "California",
    "source": "google_ads",
    "status": "contacted",
    "score": 52,
    "lead_value": 3345.77,
    "last_activity_at": "2025-08-15 10:45:30",
    "is_qualified": false,
    "created_at": "2025-07-01 09:13:44",
    "updated_at": "2025-08-19 16:27:51"
  },
  {
    "first_name": "Isabella",
    "last_name": "Moore",
    "email": "isabella.moore28@example.com",
    "phone": "+918345671290",
    "company": "Moore PLC",
    "city": "West Patricia",
    "state": "Florida",
    "source": "facebook_ads",
    "status": "new",
    "score": 66,
    "lead_value": 4890.31,
    "last_activity_at": null,
    "is_qualified": false,
    "created_at": "2025-06-18 18:25:00",
    "updated_at": "2025-08-12 14:30:12"
  },
  {
    "first_name": "William",
    "last_name": "Taylor",
    "email": "william.taylor29@example.com",
    "phone": "+918812345678",
    "company": "Taylor & Sons",
    "city": "East Jennifer",
    "state": "Illinois",
    "source": "events",
    "status": "lost",
    "score": 39,
    "lead_value": 2099.99,
    "last_activity_at": "2025-08-11 12:05:43",
    "is_qualified": false,
    "created_at": "2025-07-09 11:27:13",
    "updated_at": "2025-08-14 19:40:23"
  },
  {
    "first_name": "Ava",
    "last_name": "Anderson",
    "email": "ava.anderson30@example.com",
    "phone": "+917700112233",
    "company": "Anderson Inc",
    "city": "North Joshua",
    "state": "New York",
    "source": "website",
    "status": "won",
    "score": 94,
    "lead_value": 11045.80,
    "last_activity_at": "2025-08-21 17:32:55",
    "is_qualified": true,
    "created_at": "2025-06-30 14:18:47",
    "updated_at": "2025-08-22 09:25:37"
  },
  {
    "first_name": "Benjamin",
    "last_name": "Thomas",
    "email": "benjamin.thomas31@example.com",
    "phone": "+918900334455",
    "company": "Thomas LLC",
    "city": "Lake Mary",
    "state": "Georgia",
    "source": "referral",
    "status": "contacted",
    "score": 48,
    "lead_value": 3750.64,
    "last_activity_at": "2025-08-17 08:50:10",
    "is_qualified": false,
    "created_at": "2025-07-06 16:20:15",
    "updated_at": "2025-08-18 13:32:19"
  },
  {
    "first_name": "Mia",
    "last_name": "White",
    "email": "mia.white32@example.com",
    "phone": "+918234567111",
    "company": "White Group",
    "city": "Port Christopher",
    "state": "Ohio",
    "source": "facebook_ads",
    "status": "qualified",
    "score": 77,
    "lead_value": 8122.48,
    "last_activity_at": "2025-08-14 19:21:37",
    "is_qualified": true,
    "created_at": "2025-06-27 11:09:22",
    "updated_at": "2025-08-19 07:12:55"
  },
  {
    "first_name": "Ethan",
    "last_name": "Martin",
    "email": "ethan.martin33@example.com",
    "phone": "+919112233444",
    "company": "Martin PLC",
    "city": "West Timothy",
    "state": "Texas",
    "source": "google_ads",
    "status": "new",
    "score": 59,
    "lead_value": 4233.55,
    "last_activity_at": null,
    "is_qualified": false,
    "created_at": "2025-07-05 08:22:45",
    "updated_at": "2025-08-15 20:42:30"
  },
  {
    "first_name": "Charlotte",
    "last_name": "Lee",
    "email": "charlotte.lee34@example.com",
    "phone": "+917333221144",
    "company": "Lee Ltd",
    "city": "Lake Heather",
    "state": "Nevada",
    "source": "events",
    "status": "won",
    "score": 90,
    "lead_value": 10321.09,
    "last_activity_at": "2025-08-20 10:17:43",
    "is_qualified": true,
    "created_at": "2025-07-11 12:14:09",
    "updated_at": "2025-08-21 18:02:22"
  },
  {
    "first_name": "Alexander",
    "last_name": "Clark",
    "email": "alexander.clark35@example.com",
    "phone": "+919443322110",
    "company": "Clark Group",
    "city": "South Laura",
    "state": "Montana",
    "source": "website",
    "status": "lost",
    "score": 28,
    "lead_value": 2098.42,
    "last_activity_at": "2025-08-10 09:14:23",
    "is_qualified": false,
    "created_at": "2025-07-02 19:15:32",
    "updated_at": "2025-08-13 22:27:40"
  }
]

    await lead.insertMany(dummyData).then(res=>{
        console.log("inserted data");
    }).catch(e=>{
        console.log(e);
    })
}

