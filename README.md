# React Application usind Docker

Frontend (website) for Coupon System Application. Contains docker-compose.yml file to build MySQL + Backend (Spring Boot App) + Frontend (current repo) to docker.

*Docker installation on the machine is required.


## Installation

1. Clone/Copy/Download repository.
2. In the root directory of downloaded project run command: `docker-compose up`
3. When all services will up and running, open the browser and go to: [http://localhost:3000/](http://localhost:3000)
4. Stop application container - `(Ctrl + C)`
5. Remove container and network - in the root directory of the project run command: `docker-compose down`


## How to Use the Application

### Admin User
* Credentials to log in and use the app:

  username: `admin@admin.com`
  
  password: `admin`
  
* Register regular users to the website (companies/customers).
* Removes regular users from website (companies/customers).


### Company User
* In order to log in and use the app use credentials that Admin User registered with.
* Publish coupons on website.


### Customer User
* In order to log in and use the app use credentials that Admin User registered with.
* Purchase coupons on website.
