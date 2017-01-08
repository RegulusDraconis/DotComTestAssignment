## D-C registration test assignment

## Description

Test assignment for company Dot-Com

##Installation steps:
```
1. Install NodeJS: 
```
https://nodejs.org/en/
```
2. Install Git: 
```
https://git-scm.com/

```
3. Run "npm install -g http-server"
4. Run "git clone https://github.com/RegulusDraconis/DotComTestAssignment.git"
5. Run "cd DotComTestAssignment/"
6. Run "http-server"
7. Open "http://localhost:8080/app"
```


##Assignment instructions:

```
Create GitHub repository.
Create Angular 1.5.8 website.

Default URL site should redirect you to a registry form.
URL ('/register') is a subsite with input form that has the following inputs:
Name, Lastname, Address, and Date of birth.
Submit button ('Register') should save all the input data with additional date of creation
to indexDB, if the age of the applicant is higher than 21 years.
If indexDB has data, 'Hello, LastName Name!' should appear in the top left corner.
If Date of birth is Friday, the background should change to green.

You should create this as Enterprise level application. Use of e2e test, unit tests, TypeScript and Angular Material Design are not required but are preferable.
```