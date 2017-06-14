var prosp01_SessionsSessionHandler =
{
	Register : function (UserName, EmailAddress, Password)
    {
        var dto = new dtoRegisterRequest(UserName, EmailAddress, Password);
        prosp01_SessionsSessionController.Register(dto,
            function(data)
            {
                console.log('Worked');
            },
            function(data)
            {
                $('#popup_ConnectionError').modal();
            }
        );
    },
    InitSession : function ()
    {
//        $('popup_Loading').modal();
        prosp01_SessionsSessionController.InitSession(
            function(data)
            {
                SessionManager.InitToken = data.InitToken;
                $('popup_Loading').modal('hide');
            },
            function(data)
            {

                $('#popup_ConnectionError').modal();
            }
        );
    },
    Login : function (Email, Password)
    {
        var dto = new dtoLoginRequest(Email, Password, SessionManager.InitToken);
        
        /*Inicia off mode */
                if(Email == "demo" && Password == "demo")
                {
                    NaicsUIManager.loadSectors();
                    NaicsUIManager.loadStates();
                    if($("#input_Login_RememberMe").prop('checked'))
                    {
                        Configuration.email = Email;
                        Configuration.password = Password;
                        Configuration.Save(); 
                    }
                    else
                    {
                        Configuration.email = "";
                        Configuration.password = "";
                        Configuration.Save(); 
                    }
                    SessionManager.SessionToken = data.SessionId;
                    prosp01_ProspeccionProspeccionHandler.GetDiscartedProspectsIds();
                    prosp01_ProspeccionProspeccionHandler.GetProspectsIds();
                    console.log("PASA1");
                    activate_subpage("#uib_subpage_EconomicUnits_List"); 
                }
                /* Termina off mode */
        else {
        prosp01_SessionsSessionController.Login(dto,
            function(data)
            {
            console.log(data.StatusCode);
                if(data.StatusCode == 200)
                {
                    if($("#input_Login_RememberMe").prop('checked'))
                    {
                        Configuration.email = Email;
                        Configuration.password = Password;
                        Configuration.Save(); 
                    }
                    else
                    {
                        Configuration.email = "";
                        Configuration.password = "";
                        Configuration.Save(); 
                    }
                    SessionManager.SessionToken = data.SessionId;
                    
                    NaicsUIManager.loadSectors();
                    NaicsUIManager.loadStates();
                    
                    prosp01_ProspeccionProspeccionHandler.GetDiscartedProspectsIds();
                    prosp01_ProspeccionProspeccionHandler.GetProspectsIds();
                    activate_subpage("#uib_subpage_EconomicUnits_List"); 
                }
                else
                {
                    $('#popup_WrongPassword').modal();
                }
            },
            function(data)
            {
                
                
                //$('#popup_ConnectionError').modal();
            }
        );
        }
    },
    ForgotPassword : function(Email)
    {
        prosp01_SessionsSessionController.ForgotPassword(Email,
            function(data)
            {
                
            },
            function(data)
            {
                $('#popup_ConnectionError').modal();
            }
        );
    },
    ChangePassword : function(OldPassword, NewPassword)
    {
        console.log('qweqweqweqweqweqweqweqweeqwe');
        var dto = new dtoChangePasswordRequest(NewPassword, OldPassword);
        prosp01_SessionsSessionController.ChangePassword(dto,
            function(data)
            {
                
            },
            function(data)
            {
                $('#popup_ConnectionError').modal();
            }
        );
    }
};