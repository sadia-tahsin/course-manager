# course-era(Fullstack App)

A fullstack Next.js application for managing and enrolling in courses. Features role-based dashboards for general users and admins.

---

## 🔧 Tech Stack

- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Backend**: API Routes (RESTful)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (token stored in `localStorage`)

  
##  Features

### User Role:
- View all courses
- Enroll in available courses
- View enrolled courses (`/my-courses`)

###  Admin Role:
- Create, update, delete courses
- Admin dashboard available after login if `role` is `admin`

> To manually make a user admin, change their `role` field to `admin` in MongoDB Atlas.

