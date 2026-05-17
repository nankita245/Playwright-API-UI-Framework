export const loginPageData =
{
   validUser: { 
   userName : "standard_user",
   password : "secret_sauce"
  },

  invalidUsers :
  [{
    userName : "standard_user",
   password : "secret_sauce12345",
   error : "Epic sadface: Username and password do not match any user in this service"
  },
  {
   userName : " ",
   password : "secret_sauce",
   error : "Epic sadface: Username and password do not match any user in this service"
  } , 
  {
   userName : "standard_user",
   password : "" ,
   error: "Epic sadface: Password is required"
  }
  
],

  lockedOutUser:
  {
   userName : "locked_out_user",
   password : "secret_sauce",
   error : "Epic sadface: Sorry, this user has been locked out."
  },

  sqlInjectionUser:
  {
   userName : "' OR 1=1",
   password : "secret_sauce",
   error : "Epic sadface: Username and password do not match any user in this service"
  }

}