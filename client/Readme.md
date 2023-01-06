## Table of Contents

- [installation](#installation)
- [process](#process)
- [Color Reference](#color-reference)
- [Tools and Frameworks](#tools-and-frameworks)
- [Development Tools and Libraries](#development-tools-and-libraries)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Screenshots](#screenshots)
- [Code_Samples](#code_samples)
- [Help](#help)

## installation

- clone the project `git clone https://github.com/Advanced-Computer-Lab-2022/Hungry-for-Grades`

- to install packages : `yarn install`

- to run the frontend : `yarn dev`

## process

- Roles :

  - Admin
  - Trainee
  - Corporate Trainee
  - Instructor
  - stakeholder interviews : to understand the business goals and user needs,who are customers, product uniqueness, success metrics
  - user research : to understand the user needs and behavior

- competitive analysis : to understand the competitors and their products like marketing strategy, pricing, features, user experience and business failure and core features of the product
- user research :

  - user segmentation : age,gender,needs,behavior,location,device,platform,etc.
  - user journey mapping : to understand the user journey from the user segmentation
  - user interviews : to understand the user needs and behavior by surveys
  - user personna : to understand the user needs and behavior by surveys
  - End-to-End Testing : to understand the user needs and behavior by testing the prototypes

- existing product audit : to understand the existing product and its features

## Color Reference

| Color                              | Hex                                                              |
| ---------------------------------- | ---------------------------------------------------------------- |
| --primary-color                    | ![#a00407](https://via.placeholder.com/10/a00407?text=+) #a00407 |
| --secondary-color                  | ![#fc3535](https://via.placeholder.com/10/fc3535?text=+) #fc3535 |
| --primary-background-light-color   | ![#fff](https://via.placeholder.com/10/fff?text=+) #fff          |
| --secondary-background-light-color | ![#fc3535](https://via.placeholder.com/10/fc3535?text=+) #fc3535 |

## Tools and Frameworks

- React.js Front End with Typescript

  - The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

  - React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

- Cypress Front End Testing
  - Cypress is the new standard in front-end testing that every developer and QA engineer needs. programmer. Developer-friendly.

## Development Tools and Libraries

- React Query : Fetch, cache and update data in your React and React Native applications all without touching any "global state".
- Zustand : A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy api based on hooks,
- click to component


## Folder Structure

```
├── docs
│   ├── assets
│   ├── functions
│   ├── modules
│   ├── types
│   └── variables
├── public
├── src
│   ├── assets
│   ├── components
│   │   ├── buttons
│   │   │   ├── button
│   │   │   ├── copy
│   │   │   ├── screenMode
│   │   │   └── shareButton
│   │   ├── carousel
│   │   ├── courseCard
│   │   │   └── cardButtons
│   │   ├── dashboard
│   │   ├── dictaphone
│   │   ├── error
│   │   │   ├── message
│   │   │   └── page
│   │   ├── footer
│   │   ├── form
│   │   ├── graphs
│   │   │   ├── areaGraph
│   │   │   ├── barGraph
│   │   │   └── lineGraph
│   │   ├── header
│   │   ├── HomeSection
│   │   ├── inputs
│   │   │   ├── checkbox
│   │   │   ├── input
│   │   │   ├── range
│   │   │   └── select
│   │   ├── instructorBillboard
│   │   ├── loader
│   │   │   ├── loaderCard
│   │   │   ├── loaderComponent
│   │   │   └── loaderpage
│   │   ├── mediaPlayer
│   │   ├── modal
│   │   ├── navbar
│   │   │   ├── searchBar
│   │   │   └── userDropDown
│   │   ├── newsletter
│   │   ├── pagination
│   │   ├── progress
│   │   │   └── progressStepper
│   │   ├── reader
│   │   ├── reviewHolder
│   │   ├── slider
│   │   ├── starsRating
│   │   ├── toast
│   │   ├── toogle
│   │   └── trophy
│   ├── context
│   ├── enums
│   ├── hooks
│   ├── interfaces
│   ├── pages
│   │   ├── admin
│   │   │   ├── addDiscounts
│   │   │   ├── adminTable
│   │   │   ├── adminTable2
│   │   │   ├── corporateRequests
│   │   │   ├── createUser
│   │   │   ├── dashboard
│   │   │   ├── home
│   │   │   │   ├── instructors
│   │   │   │   │   └── analytics
│   │   │   │   └── trainees
│   │   │   │       └── analytics
│   │   │   ├── newsletter
│   │   │   ├── refunds
│   │   │   ├── reportRequests
│   │   │   └── sendEmail
│   │   ├── authentication
│   │   │   ├── changePassword
│   │   │   ├── forgotPassword
│   │   │   ├── login
│   │   │   └── signup
│   │   │       ├── accountForm
│   │   │       └── userForm
│   │   ├── comment
│   │   ├── course-view
│   │   │   └── notes
│   │   ├── guest
│   │   │   ├── course
│   │   │   ├── landing
│   │   │   │   ├── basedOnYourChoices
│   │   │   │   ├── featureSection
│   │   │   │   ├── mainSection
│   │   │   │   ├── sponsers
│   │   │   │   ├── testmonialSection
│   │   │   │   └── topInstructorsSection
│   │   │   └── searchCourses
│   │   │       ├── coursesSection
│   │   │       └── searchSection
│   │   │           └── filtersInput
│   │   ├── instructor
│   │   │   ├── course-form
│   │   │   ├── coursesData
│   │   │   │   └── analytics
│   │   │   ├── dashboard
│   │   │   ├── earnings
│   │   │   │   └── analytics
│   │   │   ├── edit-profile
│   │   │   │   └── pages
│   │   │   ├── exam-form
│   │   │   ├── myReports
│   │   │   ├── reviewAndRating
│   │   │   └── setDiscount
│   │   │       └── courseDiscounts
│   │   ├── InstructorProfile
│   │   ├── payment
│   │   ├── task
│   │   ├── trainee
│   │   │   ├── board
│   │   │   ├── cart
│   │   │   ├── cart2
│   │   │   ├── certificate
│   │   │   ├── courses
│   │   │   ├── course-view
│   │   │   ├── dashboard
│   │   │   ├── editProfile
│   │   │   │   └── pages
│   │   │   ├── followUps
│   │   │   ├── lastStudiedCourse
│   │   │   ├── myReports
│   │   │   ├── note
│   │   │   │   └── modals
│   │   │   ├── profile
│   │   │   ├── progressBar
│   │   │   └── wishlist
│   │   └── user
│   │       └── profile
│   ├── routes
│   ├── services
│   │   ├── axios
│   │   │   └── dataServices
│   │   ├── cookie
│   │   ├── localStorage
│   │   ├── savedInfo
│   │   ├── sessionStorage
│   │   └── socket
│   ├── store
│   ├── stories
│   │   └── assets
│   ├── test
│   └── utils
└── storybook-static

```

## Environment Variables

```
#=================== Enviroment ================= #

# env
NODE_ENV=development


#======================= Client ================= #

# Client URL
VITE_APP_CLIENT_URL=http://localhost:8000/

# App Code Name
VITE_APP_TITLE_NAME

# App Description
VITE_APP_DESCRIPTION=

# App Author
VITE_APP_AUTHOR


# App Code Name
VITE_APP_CODE_NAME

# App Keywords
VITE_APP_KEYWORDS



# App default direction
VITE_APP_DEFAULT_DIRECTION

# App Locale Codes
VITE_APP_LOCAL_CODES

# App Production Base Path
VITE_APP_BASE_PATH

# App PORT
VITE_APP_CLIENT_PORT

# App Production Public Url
PUBLIC_URL

# STORAGE KEYS PREFIX
VITE_STORAGE_KEYS_PREFIX



# Company Info
VITE_APP_LOGO_URL
VITE_COMPANY_NAME
VITE_COMPANY_ADDRESS
VITE_COMPANY_EMAIL
VITE_COMPANY_WEBSITE
VITE_COMPANY_FACEBOOK
VITE_COMPANY_TWITTER
VITE_COMPANY_INSTAGRAM
VITE_COMPANY_YOUTUBE
VITE_COMPANY_LINKEDIN
VITE_COMPANY_GITHUB
VITE_COMPANY_GOOGLE_PLAY
VITE_COMPANY_APP_STORE
VITE_COMPANY_END_DATE
VITE_COMPANY_PHONE




#======================= Emailjs ================= #

# Service ID
VITE_APP_SERVICE_ID=

# Template ID
VITE_APP_TEMPLATE_ID=

# Public Key
VITE_APP_PUBLIC_KEY=
#======================= Server ================= #

# SERVER API URL
VITE_SERVER_BASE_API_URL

# SERVER API Port
VITE_SERVER_PORT

# SERVER API Key
VITE_SERVER_API_KEY

# PAGINATION Limit
VITE_PAGINATION_LIMIT



#======================= My Info ================= #

# Primary Email
VITE_APP_PRIMARY_EMAIL

# Secondary Email
VITE_APP_SECONDARY_EMAIL

# Phone Number
VITE_APP_PHONE_NUMBER
```


## Screenshots

- Landing page
  <img src="../screenshots/Landing Page.gif" alt="Landing Page" align="center" >
  <br/>
- Explore Tab
  <img src="../screenshots/explore.gif" alt="Nav bar" align="center" >
  <br/>

- Sign up
  <img src="../screenshots/Sign up.gif" alt="Sign up gif" align="center">
  <br/>
  <img src="../screenshots/Sign up verification.gif" alt="Sign up continue gif" align="center">
  <br/>
- Login as Trainee
  <img src="../screenshots/Login.gif" alt="Login gif" align="center">
  <br/>
- Exploring trainee
  <img src="../screenshots/Exploring trainee.gif" alt="exploring trainee gif" align="center">
  <br/>
  <img src="../screenshots/Trainee change password.gif" alt="exploring trainee continue gif" align="center">
  <br/>
- Pay for a course
  <img src="../screenshots/Cart hover pay with card.png" alt="Cart page with hover pay with card img" align="center">
  <br/>
  <img src="../screenshots/Stripe.gif" alt="Payment page gif" align="center">
  <br/>
  <img src="../screenshots/Payment success.gif" alt="Payment succeed page" align="center">
  <br/>
- Ask for refund and report
  <img src="../screenshots/Report.gif" alt="Refund and report gif" align="center">
  <br/>
- Exploring Instructor
  <img src="../screenshots/Instructor.gif" alt="Exploring instructor page gif" align="center">
  <br/>
- Create course
  <img src="../screenshots/Create course.gif" alt="Create course page gif" align="center">
  <br/>
- Add discount and delete course
  <img src="../screenshots/Delete course.gif" alt="Delete course gif" align="center">
  <br/>
- Explore Admin
  <img src="../screenshots/Admin.gif" alt="Explore admin page gif" align="center">
  <br/>
- Accepting and rejecting requests
  <img src="../screenshots/Corporate.gif" alt="Accepting and rejecting some requests gif" align="center">
  <br/>
- Explore Corporate trainee
  <img src="../screenshots/Corporate.gif" alt="Exploring corporate trainee page gif" align="center">
  <br/>

## Help

- run `yarn run why` to understand the commands in the package.json



## code_samples

- Most Popular Courses Component
```
<section className='container' id='rated-courses'>
        <h2 className='text-dark text-left mb-2'>Most Popular Courses</h2>
        <div className='row'>
          {coursesMapped?.map(course => (
            <div key={course.id} className='col-12 col-md-6 col-lg-4'>
              <CourseCard enrolled={false} percent={-1} pprops={course} />
            </div>
          ))}
        </div>
        <p className='text-end'>
          <Link
            style={{
              zIndex: '999'
            }}
            to='/courses'
          >
            View all courses
          </Link>
        </p>
</section>

```

- Download Certificate as PDF Function
```
  const handleDownloadPDF = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'cm',
      format: [29.7, 21]
    });
    const imgProperties = pdf.getImageProperties(imageURL);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(imageURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('certificate.pdf');
  };
```

- Line Graph for Instructor Page
```
<LineGraph<{
        title: string;
        Earnings: number;
        Trainees: number;
      }>
        data={props?.data}
        graphs={[
          { name: 'Earnings', color: '#084f09' },
          { name: 'Trainees', color: '#a00407' }
        ]}
      />
      <LineGraph<{
        title: string;
        Earnings: number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            Earnings: data.Earnings
          };
        })}
        graphs={[{ name: 'Earnings', color: '#084f09' }]}
      />
      <LineGraph<{
        title: string;
        Trainees: number;
      }>
        data={props?.data.map(data => {
          return {
            title: data.title,
            Trainees: data.Trainees
          };
        })}
        graphs={[{ name: 'Trainees', color: '#a00407' }]}
      />
    </>
```
