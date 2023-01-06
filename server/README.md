## Backend (Server)


## Table of Contents
- [Scaling](#Scaling)
- [Scaling Scheme](#Scaling-Scheme)
- [Balancing](#Balancing)
- [Caching](#Caching)
- [Data Partitioning](#Data-Partitioning)
- [CAP](#CAP)
- [Environment Variables](#environment-variables)
- [Screeshots](#screenshots)
- [Folder Structure](#folder-structure)
- [Code Samples](#Code-Samples)

Ideas for Scalability : 

## Scaling
    
In the future with increasing number of users to the system, the server will need to be upgraded and we can scale the system in one of two ways,
either vertival scaling with increasing the processing power of our server and the processing node or horizontal scaling and increasing the number of the processing nodes(servers that serve the functionality of our system).
Horizontal scaling is preferable because at the end you will hit a limit in which you will not go over a specific processing power and the vertical scaling is more expensive in upgrading one node power rather than having multiple nodes and have the total work divided over them.

## Scaling-Scheme

What is the schema to be chosen? will the servers will be divided according to functionality or according to region? and requests origin?
It depends on the number of users from each city or government so if we followed the scheme of each server is handling each region then we will have some servers overloaded that others depending on the popularity of the platform in one place than the other, this scheme can be used in the future when the number of users increases in many cities and all over egypt and even from other countries then we can consider this scaling schema, but on low level scaling (more users in smaller number of cities) it is better to follow the schema of having each server is responsible for a specific task or functionality, we can have many servers divided as follows : 
             --> server repsonsible for uploading videos of the lectures and lessons and requesting these videos 
             --> server responsible for the payment and banking actions
             --> server responsible for the other informtaion and normal requests within the system
        ** This schema can be mixed with the first proposed schema when having more and more users so for each region we can have this set responsible for serving this specific region.

## Balancing

Sometimes we can have some servers overwhelmed than the others depending on the amount of users accessing the platform and their place and region.
This can lead to losing availability because now one can try to access the platform and server is down hence the system is unavailable.
We can try to decrease this effect by having Load Balancers (type of a reverse proxy), these load balancers will receive the request on the behalf of the client and then these load balancers will send these requests to the servers, and these load balancer functionality is to choose what is the best server to choose that can receive this request and then it send this request to that server and there are many ways to choose what server to send to, one of these choosing policies is Round Robin in which you have your servers as a circle and you start sending reuqests in this way to server1 --> then server2 --> server3 --> back to start of the circle so you guarantee having equal amount of requests on each serve to have balanced work over the servers and another technique related to the network the least connection server (server having the least number of connections with other clients) or the server with the least bandwidth used, Load Balancers will be needed to try to decrease the unavailability of the server.

## Caching

One way of having faster and better performance on larger scale is to have cahces to cahce the data that is mostly requested by users so they can have the data faster in future requests. We can have a CDN(Content Distribution Network) which is type of cache that is used for large systems serving a lot amount of static data and this will be useful in our platform case because we will be having many static data and a lot of videos for lessons and courses that we will need to have an optimized way to serve these data to the client in efiicient and fast way.

## Data-Partitioning

On large Scale we can't still have only one database at the end we need to have multiple databases by replicas or partitioning.
We can partition the data vertivally or horziontally, in vertical partitioning we will have for each row entry the row itself will be divided into different databases, this is a better solution in our case because we will have static data and videos for the lessons and courses, so having these static data and videos in their databases would be preferable than putting these data with the other client's and course's information in one database.
We can have the database divided and partitioned into multiple partitions, one partition could be for the videos, and another partition could be for user and course's information and finally we can have replicas for these databases to avoid having a single point of failure in these databases partitions.

## CAP

Now with scaled system we have to choose one of two properties to the system, Availability and Consistency.
To our platform Availability would be more benefcial to have better UX because for e-learining platform that can not be accessible by the client at any time will be frustrating with bad UX.
We can tolerate some inconsistency in this platform and have eventually consistent system, as we really don't care if a client make a get request to see the reviews on a specific course and he doesn't get these reviews updated to the very last moment.
So having NoSQL database will be better on Scalability, as it is more flexible and with better performance and faster than SQL databases.
Now when choosing available system, the nodes will be available on any request but the node itself won't be up to date in any moment because it may need some data from other nodes and take time to get these data, and we chose availability so we can't ignore the user request waiting for data (here we lose avaialbility) but we respond with data available and then node will be updated. (this is what is called eventually consistent).



## Environment Variables

```
# PORT
PORT

# DATABASE
DB_USERNAME
DB_PASSWORD 
DB_DATABASE

# REDIS
REDIS_HOST 
REDIS_PORT 
REDIS_PASSWORD 


# TOKEN
ACCESS_TOKEN_PRIVATE_KEY
REFRESH_TOKEN_PRIVATE_KEY

# CLIENT URL
CLIENT_URL

# Company Info
COMPANY_LOGO
COMPANY_ADDRESS
COMPANY_PHONE
COMPANY_EMAIL
COMPANY_WEBSITE
COMPANY_FACEBOOK
COMPANY_TWITTER
COMPANY_INSTAGRAM
COMPANY_YOUTUBE
COMPANY_LINKEDIN
COMPANY_GITHUB
COMPANY_GOOGLE_PLAY
COMPANY_APP_STORE

# LOG
LOG_FORMAT
LOG_DIR

# CORS
ORIGIN 
CREDENTIALS

# ExchangeRate API Key
EXCHANGE_BASE_URL

# Nodemailer
EMAIL_SERVICE
SENDER_MAIL
SENDER_PASSSWORD

#Stripe
STRIPE_PRIVATE_KEY

```


## screenshots
 
<img src="../screenshots/systemDesign/My System Design.png" alt="Sign up User Form" align="center" >



## Folder Structure

```
.
└── src
    ├── Admin
    │   ├── admin.controller.ts
    │   ├── admin.dao.ts
    │   ├── admin.dto.ts
    │   ├── admin.interface.ts
    │   ├── admin.model.ts
    │   └── admin.route.ts
    ├── Authentication
    │   ├── auth.controller.ts
    │   ├── auth.dao.ts
    │   ├── auth.interface.ts
    │   └── auth.route.ts
    ├── Common
    │   ├── Email Service
    │   │   └── templates
    │   ├── Interfaces
    │   ├── Models
    │   └── Types
    ├── Config
    │   └── index.ts
    ├── Course
    │   ├── course.controller.ts
    │   ├── course.dao.ts
    │   ├── course.dto.ts
    │   ├── course.interface.ts
    │   ├── course.model.ts
    │   ├── course.common.ts
    │   ├── course.types.ts
    │   └── course.route.ts
    ├── Databases
    │   └── index.ts
    ├── Exceptions
    │   └── HttpException.ts
    ├── Instructor
    │   ├── instructor.controller.ts
    │   ├── instructor.dao.ts
    │   ├── instructor.dto.ts
    │   ├── instructor.interface.ts
    │   ├── instructor.model.ts
    │   └── instructor.route.ts
    ├── logs
    │   ├── debug
    │   └── error
    ├── Message
    ├── Middlewares
    │   ├── auth.middleware.ts
    │   ├── error.middleware.ts
    │   ├── rateLimiter.middleware.ts
    │   ├── modelsError.middleware.ts
    │   ├── user.middleware.ts
    │   └── validation.middleware.ts
    ├── NewsLetter
    │   ├── newsletter.controller.ts
    │   ├── newsletter.dao.ts
    │   ├── newsletter.dto.ts
    │   ├── newsletter.interface.ts
    │   ├── newsletter.model.ts
    │   └── newsletter.route.ts
    ├── Payment
    │   ├── payment.controller.ts
    │   ├── payment.dao.ts
    │   ├── payment.dto.ts
    │   ├── payment.interface.ts
    │   ├── payment.model.ts
    │   └── payment.route.ts
    ├── Report
    │   ├── report.controller.ts
    │   ├── report.dao.ts
    │   ├── report.dto.ts
    │   ├── report.interface.ts
    │   ├── report.model.ts
    │   └── report.route.ts
    ├── Tests
    ├── Token
    │   ├── token.interface.ts
    │   ├── token.model.ts
    │   ├── trainee.util.ts
    ├── Trainee
    │   ├── trainee.controller.ts
    │   ├── trainee.dao.ts
    │   ├── trainee.dto.ts
    │   ├── trainee.interface.ts
    │   ├── trainee.model.ts
    │   └── trainee.route.ts
    ├── Uploads
    ├── User
    │   ├── user.controller.ts
    │   ├── user.dto.ts
    │   ├── user.enum.ts
    │   ├── user.interface.ts
    │   ├── user.schema.ts
    │   ├── user.type.ts
    │   └── user.route.ts
    ├── Utils
    │   ├── HttpResponse.ts
    │   ├── HttpStatusCodes.ts
    │   ├── logger.ts
    │   ├── PaginationResponse.ts
    │   └── validateEnv.ts
    
```

## Code Samples
```
 public async getCourseReviews(courseID: string, page: number, pageLimit: number): Promise<PaginatedData<Review>> {
    if (!mongoose.Types.ObjectId.isValid(courseID)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseID).populate({
      path: 'rating.reviews._trainee',
      select: 'name country profileImage',
    });

    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, "Course doesn't exist");
    const courseReviews = course.rating.reviews;

    // sort descendingly
    courseReviews.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    const toBeSkipped = (page - 1) * pageLimit;
    const totalReviews = courseReviews.length;
    const totalPages = Math.ceil(totalReviews / pageLimit);
    const paginatedReviews = courseReviews.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedReviews,
      page,
      pageSize: paginatedReviews.length,
      totalPages,
      totalResults: totalReviews,
    };
  }
```

```
public async reportProblemOrRequestCourse(reportData: ReportDTO): Promise<Report> {
    const courseId = reportData._course;
    const userId = reportData._user;

    //Validation
    if (!mongoose.Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(courseId) && courseId != null)
      throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id can only be an Object Id or null');
    if ((reportData.reason === Reason.COUSE_REQUEST || reportData.reason === Reason.REFUND) && courseId == null)
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Course Id is required for a Course Request or Refund Request');

    if (reportData.reason === Reason.REFUND) {
      // trainee should be enrolled in course and at most 50% of the course content should be seen
      const enrolledCourse = await this.traineeService.getEnrolledCourseById(userId, courseId);
      if (!enrolledCourse) throw new HttpException(400, 'Trainee is not enrolled in this course');

      const traineeProgress = enrolledCourse?.progress ?? 0;

      if (traineeProgress >= 50) throw new HttpException(404, 'Refund is not allowed after 50% of the course is completed');
      const report = await reportModel.findOne({ reason: 'Refund', _user: `${reportData?._user}`, _course: `${reportData?._course}` });
      if (report) {
        throw new HttpException(400, 'You have asked for refund for this course before');
      }
    } else if (reportData.reason === Reason.COUSE_REQUEST) {
      const report = await reportModel.findOne({ reason: Reason.COUSE_REQUEST, _user: `${reportData?._user}`, _course: `${reportData?._course}` });
      if (report) {
        throw new HttpException(404, 'You have requested this course before');
      }
    }

    const report = await reportModel.create({ ...reportData });
    return report;
  }
```
```
instructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});
```
