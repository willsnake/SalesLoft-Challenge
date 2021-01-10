import { GetPeopleOptionsSortBy, GetPeopleOptionsSortDirection } from '../enums'

export interface Person {
  account: Account
  bouncing: false
  city: string
  contact_restrictions: any[]
  country: string
  counts: Counts
  created_at: Date
  crm_id?: any
  crm_object_type?: any
  crm_url?: any
  custom_fields: any
  display_name: string
  do_not_contact: false
  email_address: string
  first_name: string
  full_email_address: string
  home_phone?: any
  id: number
  import?: any
  job_seniority?: any
  last_contacted_at?: any
  last_contacted_by?: any
  last_contacted_type?: any
  last_name: string
  last_replied_at?: any
  linkedin_url?: any
  locale?: any
  mobile_phone?: any
  most_recent_cadence?: any
  owner: [Object]
  owner_crm_id?: any
  person_company_industry?: any
  person_company_name?: any
  person_company_website: string
  person_stage?: any
  personal_email_address?: any
  personal_website?: any
  phone: string
  phone_extension?: any
  secondary_email_address?: any
  state: string
  tags: any[]
  title: string
  twitter_handle?: any
  updated_at: Date
  work_city?: any
  work_country?: any
  work_state?: any
}

export interface GetPeopleOptions {
  ids?: Number[]
  include_paging_counts: Boolean
  per_page: Number
  sort_by?: GetPeopleOptionsSortBy
  sort_direction?: GetPeopleOptionsSortDirection
}

interface Counts {
  calls: Number
  emails_bounced: Number
  emails_clicked: Number
  emails_replied_to: Number
  emails_sent: Number
  emails_viewed: Number
}

interface Account {
  _href: string
  id: Number
}

interface Owner {
  _href: string
  id: Number
}

interface MetaData {
  filtering: any
  paging: Paging
  sorting: Sorting
}

interface Paging {
  current_page: Number
  next_page: Number
  per_page: Number
  prev_page?: Number
  total_count: Number
  total_pages: Number
}

interface Sorting {
  sort_by: GetPeopleOptionsSortBy
  sort_direction: string
}

export interface ApiResponse {
  metadata?: MetaData
  data?: Person[] | any[] | null
}
