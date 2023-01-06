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

## GIFs and screenshots

- Landing page
  <img src="../screenshots/Landing Page.gif" alt="Landing Page" align="center" >
  <br/>
  In the landing page you can:
  - View you the navigation bar Which has the courses, explore, search, country, sign up and login tabs.
  - View the top rated courses.
  - View the most popular courses.
  - View the company members.
  - View the top rated instructors.
  - View the footer which contains the company's socials and details and you can subscribe to the newsletter
    <br/>
- Explore Tab
  <img src="../screenshots/explore.gif" alt="Nav bar" align="center" >
  <br/>
  - In the explore tab you can search for courses by the category and the sub category and this will direct you to courses page with these filters applied
  - In filters you can:
    - Filter by category and sub category.
    - Sort by most viewed or most rated.
    - Filter by level (Beginner, intermediate and advanced).
    - Filter by rating.
    - Filter by duration.
    - Filter by price either by price range (min and max) or by free or paid or both.
      <br/>
- Sign up
  <img src="../screenshots/Sign up.gif" alt="Sign up gif" align="center">
  <br/>
  - In sign up you need to click on the sign up button in the navigation bar.
  - Then this will direct you to the sign up page where you can fill your personal information.
  - After that you will enter your email and password.
  - Then you will get a confirmation mail on your email that you used during signing up containing numbers that you will need to enter to proceed to your account.
    <br/>
    <img src="../screenshots/Sign up verification.gif" alt="Sign up continue gif" align="center">
    <br/>
- Login as Trainee
  <img src="../screenshots/Login.gif" alt="Login gif" align="center">
  <br/>
  - To login to your account you need to enter your email and password you used during signing up.
  - If you forgot your password you can click on forgot password.
  - This will send you mail to your email so that you can enter your new password.
- Exploring trainee
  <img src="../screenshots/Exploring trainee.gif" alt="exploring trainee gif" align="center">
  <br/>
  In the trainee you can:

  - Have the last studied course present in the dashboard tab to continue studying and you can also rate the course.
  - In the courses tab it displays your enrolled courses where you can:
    - select the course that you want to continue studying.
    - Go to the main page of the course if you click on the course image or title.
    - Ask for a refund if your course progress percentage is less than 50% by clicking on ask for refund.
    - Go to the Course certificate page by clicking on certificate you need to finish your course first to have access to certificate page.
    - Report a problem by clicking on report.
  - Add courses from courses tab in the navigation bar to the cart to be able to buy it and ths is done by clicking on cart icon on the course card.
  - Add courses from courses tab in the navigation bar to the wishlist to be able to add to the cart in the future and this is done by clicking on the heart icon on the course card.
  - Create and edit notes (general or course specific) with or without tags which can be created by naming the tag then click on create tag.
  - Draw on the board, you can change the brush color, width and opacity and download the produced drawing by clicking on save as image.
  - View your reports and their status and you can click on follow ups to message the admin.
  - Edit your profile by clicking on profile where you can change your in profile tab:
    - Profile picture.
    - Name.
    - Username.
    - Email address.
    - Phone number.
  - Change your password in security tab by entering the current password and the new password.

  <br/>
  <img src="../screenshots/Trainee change password.gif" alt="exploring trainee continue gif" align="center">
  <br/>

- Pay for a course
  <img src="../screenshots/Cart hover pay with card.png" alt="Cart page with hover pay with card img" align="center">
  <br/>
  - You can pay for course either by card or your balance.
  - You will not be able to pay with balance if your balance is less than the price of the course.
    <br/>
    <img src="../screenshots/Stripe.gif" alt="Payment page gif" align="center">
    <br/>
  - Enter your card information then click pay
    <br/>
    <img src="../screenshots/Payment success.gif" alt="Payment succeed page" align="center">
    <br/>
  - Payment success page will appear if the payment was successful after that you can go to your enrolled courses and start learning your new course.
    <br/>
    <img src="../screenshots/Payment Rejected.png" alt="Payment rejected page" align="center">
    <br/>
  - Payment rejected page will appear if the payment was not successful.
    <br/>
    <img src="../screenshots/Payment Failed.png" alt="Payment failed page" align="center">
    <br/>
  - Payment failed page will appear if there is internal server error.
    <br/>
- Explore a course
  <img src="../screenshots/Course.gif" alt="Exploring a course gif" align="center">
  <br/>
  - You can click on view course to view your course to start learning.
  - You can choose from the Course content list on the right a tab in which you can choose a lesson you would like to watch and take notes inside it.
  - You can view the overview of the course.
  - You can view and create notes on the course.
  - You can draw on the board.
  - You can see the course announcements.
  - In case of the lesson you can play the video.
  - In case of the exercise you can answer the question and by the end of it you will see your result.
    <br/>
- Ask for refund and report
  <img src="../screenshots/Report.gif" alt="Refund and report gif" align="center">
  <br/>
  - this is how you can ask for a refund and report.
  - Your progress bar should be at most 50% to be able to ask for a refund.
    <br/>
- Exploring Instructor
  <img src="../screenshots/Instructor.gif" alt="Exploring instructor page gif" align="center">
  <br/>
  In the instructor you can:
  - Create a course by clicking on create course button on the dashboard.
  - View your balance, number of courses, average rating and earnings graphs in the dashboard tab.
  - View and filter your courses in courses tab where you can view, add discount, share or delete a specific course in course details tab, you can also view your courses analytics in courses analytics tab.
  - View your ratings and reviews in rating & reviews tab.
  - View your reports and can follow up in each report in reports tab.
  - View and edit your profile in profile tab where you can:
    - Edit your personal information (Profile picture, name, biography, username, email, phone number) in profile tab.
    - Change your password by entering current and new password in security tab.
    - Add and change your social accounts in accounts tab.
      <br/>
- Create course
  <img src="../screenshots/Create course.gif" alt="Create course page gif" align="center">
  <br/>
  - To create a course you need to click on create course button on instructor dashboard.
  - After that you will be required to enter the course information.
  - After finishing entering the course information click next.
  - Then you have to enter your course outline.
  - After finishing entering the course outline click next.
  - Then you should enter the course sections by adding chapters, lessons and exercises.
  - after entering the course sections you have to read and accept terms and conditions by clicking on the empty square before I read and agree to the terms and conditions.
  - Then you need to press submit to complete the creation process of your course.
    <br/>
- Add discount and delete course
  <img src="../screenshots/Delete course.gif" alt="Delete course gif" align="center">
  <br/>
  - To add discount to your course you need to hover on the course you want to add discount on then click discounts.
  - After that you need to click on add new discount then enter the discount end date and discount percentage then click submit.
  - To delete a course you need to hover on the course you want to delete and press delete.
    <br/>
- Explore Admin
  <img src="../screenshots/Admin.gif" alt="Explore admin page gif" align="center">
  <br/>
  In the admin you can:
  - View the active and inactive trainees and instructors and top enrolled courses graphs in the dashboard tab.
  - Create corporate trainee, instructor and admin in create user tab.
  - Accept or reject course requests in course requests tab, you can filter the requests by status (resolved, pending, rejected and unseen) and you can also accept or reject multiple courses by selecting them and clicking on actions then clicking on the action you want.
  - View the reports to resolve them in reports tab, you can filter the reports by status or report problem (financial or technical) you can also open the follow ups to contact the problem issuer.
  - Add discounts to courses in discounts tab by selecting the courses then clicking add discount after that you enter the discount end date and discount percentage.
  - You can accept or reject refunds in refunds tab, you can filter the reports by status and you can also make action on multiple requests.
  - You can send newsletter to the subscribed members to this feature in the newsletter tab by entering the newsletter subject and selecting user roles (admin, trainee or instructors) then you write the body of the newsletter.
  - You can send email to any user in send email tab by entering the email of the user and the role.
    <br/>
- Accepting and rejecting requests
  <img src="../screenshots/Corporate.gif" alt="Accepting and rejecting some requests gif" align="center">
  <br/>
- Explore Corporate trainee
  <img src="../screenshots/Corporate.gif" alt="Exploring corporate trainee page gif" align="center">
  <br/>

  - The corporate trainee profile is similar to the trainee profile except you can't purchase a course you only request access to a course then the admin might accept your request and you don't have a cart or a wishlist.
  - You request access to the course by going to the courses tab in the navigation bar then select a course and click on view course then click on request access on the right of the page.

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
