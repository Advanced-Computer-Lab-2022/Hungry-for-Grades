## Table of Contents

- [Table of Contents](#table-of-contents)
- [installation](#installation)
- [process](#process)
- [Color Reference](#color-reference)
- [Tools and Frameworks](#tools-and-frameworks)
- [Development Tools and Libraries](#development-tools-and-libraries)
- [Screenshots](#screenshots)
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
  - You can choose from the Course content list on the right a tab in which you can choose a lesson you would like to watch and take notes inside it
    <br/>
- Ask for refund and report
  <img src="../screenshots/Report.gif" alt="Refund and report gif" align="center">
  <br/>
  - this is how you can ask for a refund and report.
  - Your progress bar should be at most 50% to be able to ask for a refund.
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
