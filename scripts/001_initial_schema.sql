-- Create schools table
create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  admin_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text,
  last_name text,
  role text not null check (role in ('student', 'teacher', 'principal', 'admin')),
  school_id uuid references public.schools(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create classes table
create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  teacher_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  grade_level text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create class_students junction table
create table if not exists public.class_students (
  id uuid primary key default gen_random_uuid(),
  class_id uuid not null references public.classes(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  enrolled_at timestamp with time zone default timezone('utc'::text, now()),
  unique(class_id, student_id)
);

-- Create questions table (customizable)
create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  school_id uuid not null references public.schools(id) on delete cascade,
  question_text text not null,
  question_type text not null check (question_type in ('likert', 'multiple_choice', 'yes_no')),
  category text,
  "order" integer,
  weight numeric default 1.0,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create assessments table (student responses)
create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  school_id uuid not null references public.schools(id) on delete cascade,
  responses jsonb,
  score numeric,
  risk_level text check (risk_level in ('low', 'moderate', 'high', 'critical')),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Create alerts table
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  teacher_id uuid references auth.users(id) on delete set null,
  school_id uuid not null references public.schools(id) on delete cascade,
  alert_type text check (alert_type in ('high_risk', 'moderate_risk', 'improvement', 'manual')),
  message text,
  is_resolved boolean default false,
  resolved_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- Enable RLS on all tables
alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.classes enable row level security;
alter table public.class_students enable row level security;
alter table public.questions enable row level security;
alter table public.assessments enable row level security;
alter table public.alerts enable row level security;

-- RLS Policies for profiles
create policy "users_can_read_own_profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "users_can_update_own_profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "school_admins_can_read_school_profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.schools
      where schools.id = profiles.school_id
      and schools.admin_id = auth.uid()
    )
  );

-- RLS Policies for schools
create policy "admins_can_read_own_school"
  on public.schools for select
  using (admin_id = auth.uid());

-- RLS Policies for questions
create policy "users_in_school_can_read_questions"
  on public.questions for select
  using (
    exists (
      select 1 from public.profiles
      where profiles.school_id = questions.school_id
      and profiles.id = auth.uid()
    )
  );

create policy "school_admins_can_manage_questions"
  on public.questions for all
  using (
    exists (
      select 1 from public.schools
      where schools.id = questions.school_id
      and schools.admin_id = auth.uid()
    )
  );

-- RLS Policies for assessments
create policy "students_can_read_own_assessments"
  on public.assessments for select
  using (student_id = auth.uid());

create policy "students_can_insert_own_assessments"
  on public.assessments for insert
  with check (student_id = auth.uid());

create policy "teachers_can_read_class_assessments"
  on public.assessments for select
  using (
    exists (
      select 1 from public.class_students
      join public.classes on classes.id = class_students.class_id
      where class_students.student_id = assessments.student_id
      and classes.teacher_id = auth.uid()
    )
  );

create policy "school_admins_can_read_all_assessments"
  on public.assessments for select
  using (
    exists (
      select 1 from public.schools
      where schools.id = assessments.school_id
      and schools.admin_id = auth.uid()
    )
  );

-- RLS Policies for alerts
create policy "teachers_can_read_class_alerts"
  on public.alerts for select
  using (
    exists (
      select 1 from public.class_students
      join public.classes on classes.id = class_students.class_id
      where class_students.student_id = alerts.student_id
      and classes.teacher_id = auth.uid()
    )
  );

create policy "school_admins_can_read_all_alerts"
  on public.alerts for select
  using (
    exists (
      select 1 from public.schools
      where schools.id = alerts.school_id
      and schools.admin_id = auth.uid()
    )
  );

-- RLS Policies for classes and class_students
create policy "teachers_can_read_own_classes"
  on public.classes for select
  using (teacher_id = auth.uid());

create policy "teachers_can_manage_own_classes"
  on public.classes for all
  using (teacher_id = auth.uid());

create policy "students_can_read_enrolled_classes"
  on public.class_students for select
  using (student_id = auth.uid());

create policy "teachers_can_read_class_enrollments"
  on public.class_students for select
  using (
    exists (
      select 1 from public.classes
      where classes.id = class_students.class_id
      and classes.teacher_id = auth.uid()
    )
  );
