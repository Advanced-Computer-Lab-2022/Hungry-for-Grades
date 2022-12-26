## Server


## Table of Contents
- [Scaling](#Scaling)
- [Scaling Scheme](#Scaling-Scheme)
- [Balancing](#Balancing)
- [Caching](#Caching)
- [Data Partitioning](#Data-Partitioning)
- [Database Type](#Database-Type)
- [CAP](#CAP)
- [Screeshots](#screenshots)

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

 ## screenshots
 
<img src="../screenshots/systemDesign/My System Design.png" alt="Sign up User Form" align="center" >
