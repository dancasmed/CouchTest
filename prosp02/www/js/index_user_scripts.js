/*jshint browser:true */ 
/*global $ */ 
(function()
{
 "use strict";
 
 function init_user_interface()
 {    
     
     JsonDb.Init();
     console.log('DB');
     
     
     
     
     
     
     
     
     NaicsUIManager.SearchEconomicUnits.Init(); 
     ProspeccionUIManager.SearchProspects.Init();
     ProspeccionUIManager.SalesProcesses.Init();
     
     Configuration.Init();
     
     //prosp01_ProspeccionProspeccionHandler.GetProspectsResults(ProspeccionUIManager.SearchProspects.FilterObjsList, ProspeccionUIManager.SearchProspects.Query);
 }
    
 function getSelectedText(elementId)
 {
    var elt = document.getElementById(elementId);

    if (elt.selectedIndex == -1)
        return null;

    return elt.options[elt.selectedIndex].text;
}
    
function clearAlert(id)
{
    $(id).removeClass('alert-warning');
    $(id).removeClass('alert-success');
    $(id).removeClass('alert-info');
    $(id).removeClass('alert-danger');
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}    
    
function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    };

    var variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] === true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
} 
    
function checkPassStrength(pass, id) {
    var score = scorePassword(pass);
    
    clearAlert(id);    
    
    if (score > 80)
    {        
        $(id).addClass('alert-success');
        return "Muy seguro";        
    }
    if (score > 60)
    {
        $(id).addClass('alert-info');
        return "Seguro";
    }
    if (score >= 30)
    {
        $(id).addClass('alert-warning');
        return "Debil";
    }
    
    $(id).addClass('alert-danger');
    return "No aceptable";
}
    
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {    
    
     /* button  #btn_LogInPopup */
    $(document).on("click", "#btn_LogInPopup", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
         SessionUIManager.ClearLoginForm();
         prosp01_SessionsSessionHandler.InitSession();
        $("#input_Login_Email").val(Configuration.email);
        $("#input_Login_Password").val(Configuration.password);
        
        if($("#input_Login_Email").val().length >0)
        {            
            $('#btn_Login_Login').removeAttr('disabled');
            $("#input_Login_RememberMe").prop("checked", true);
        }
         $("#popup_Login").modal("toggle");  
         return false;
    });
    
        /* button  #btn_RegistePopup */
    $(document).on("click", "#btn_RegisterPopup", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
         SessionUIManager.ClearRegisterForm();
         $("#popup_Register").modal("toggle");  
         return false;
    });
    
        /* button  #btn_Login_RememberPassword */
    $(document).on("click", "#btn_Login_PasswordReset", function(evt)
    {
        /* your code goes here */ 
        
        return false;
    });


    
        /* button  #btn_Register_Register */
    $(document).on("click", "#btn_Register_Register", function(evt)
    {
        var userName = $('#input_Register_FirstName').val() + ' ' + $('#input_Register_LastName').val();
        var userEmail = $('#input_Register_Email').val();
        var userPass = $('#input_Register_Password1').val();
        
        prosp01_SessionsSessionHandler.Register(userName, userEmail, userPass);
         /*global activate_subpage */
         activate_subpage("#page_EconomicUnits"); 
         return false;
    });
    
        /* button  #btn_AboutPage */
    $(document).on("click", "#btn_AboutPage", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_About"); 
         return false;
    });
    
        /* button  #btn_About_Back */
    $(document).on("click", "#btn_About_Back", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_Start"); 
         return false;
    });
        /* button  #btn_Settings_LogOut */
    $(document).on("click", "#btn_Settings_LogOut", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_Start"); 
         return false;
    });
    
        /* button  #btn_Login_Login */
    $(document).on("click", "#btn_Login_Login", function(evt)
    {
        var userPass = $("#input_Login_Password").val();
        var userEmail = $("#input_Login_Email").val();
        
        prosp01_SessionsSessionHandler.Login(userEmail, userPass);

         
         return false;
    });
     
    $("#input_Register_Password1").on("keypress keyup keydown", function()
    {
        var pass = $(this).val();
    
        $("#alert_Register_PasswordStrength").text(checkPassStrength(pass, "#alert_Register_PasswordStrength")); 
      
        $("#alert_Register_PasswordStrength").show();
        clearTimeout(SessionUIManager.alertRegisterPasswordStrengthTimer);
        SessionUIManager.alertRegisterPasswordStrengthTimer = window.setTimeout(function ()
        {
            $("#alert_Register_PasswordStrength").hide();
        }, 2000); 
        
        if($("#input_Register_Password1").val() != $("#input_Register_Password2").val())
        {
            $("#alert_Register_PasswordsNotMatch").addClass('alert-danger');
            $("#alert_Register_PasswordsNotMatch").text("Los passwords no coinciden");
            $("#alert_Register_PasswordsNotMatch").show();
        }
        else
        {
            SessionUIManager.ValidRegisterForm();
        }
    });
     
    $("#input_ChangePassword_NewPassword1").on("keypress keyup keydown", function()
    {           
        var pass = $(this).val();
        var valid = true;
        
        if($("#input_ChangePassword_NewPassword1").val() == $("#input_ChangePassword_OldPassword").val())
        {
            
            $("#alert_ChangePassword_NewAndOldEqual").addClass('alert-danger');
            $("#alert_ChangePassword_NewAndOldEqual").text("El nuevo password es igual al anterior");
            
            $('#alert_ChangePassword_NewAndOldEqual').show();
            clearTimeout(SessionUIManager.alertChangePasswordNewAndOldEqualTimer);            
            SessionUIManager.alertChangePasswordNewAndOldEqualTimer = window.setTimeout(function ()
            {
                $('#alert_ChangePassword_NewAndOldEqual').hide();
            }, 2000);
            valid = false;
        }
    
        $("#alert_ChangePassword_PasswordStrength").text(checkPassStrength(pass, "#alert_ChangePassword_PasswordStrength")); 
      
        $("#alert_ChangePassword_PasswordStrength").show();
        clearTimeout(SessionUIManager.alertChangePasswordPasswordStrengthTimer);
        SessionUIManager.alertChangePasswordPasswordStrengthTimer = window.setTimeout(function ()
        {
            $("#alert_ChangePassword_PasswordStrength").hide();
        }, 2000); 
        
        if($("#input_ChangePassword_NewPassword1").val() != $("#input_ChangePassword_NewPassword2").val())
        {
            $("#alert_ChangePassword_PasswordsNotMatch").addClass('alert-danger');
            $("#alert_ChangePassword_PasswordsNotMatch").text("Los passwords no coinciden");
            $("#alert_ChangePassword_PasswordsNotMatch").show();
            valid = false;
        }
        console.log(valid);
        if(valid === true)
        {
            $('#btn_Register_Register').removeAttr('disabled');
        }
    });
    
    $("#input_Register_Password2").on("keypress keyup keydown", function()
    {
        clearAlert("#alert_Register_PasswordsNotMatch");        
        
        if($("#input_Register_Password1").val() != $("#input_Register_Password2").val())
        {
            $("#alert_Register_PasswordsNotMatch").addClass('alert-danger');
            $("#alert_Register_PasswordsNotMatch").text("Los passwords no coinciden");
        }
        else
        {
            $("#alert_Register_PasswordsNotMatch").addClass('alert-success');
            $("#alert_Register_PasswordsNotMatch").text("Los passwords coinciden!");
            SessionUIManager.ValidRegisterForm();
        }
        $('#alert_Register_PasswordsNotMatch').show();
        clearTimeout(SessionUIManager.alertRegisterPasswordsNotMatchTimer);            
        SessionUIManager.alertRegisterPasswordsNotMatchTimer = window.setTimeout(function ()
        {
            $('#alert_Register_PasswordsNotMatch').hide();
        }, 2000);     
    });
     
     $("#input_ChangePassword_NewPassword2").on("keypress keyup keydown", function()
    {
        clearAlert("#alert_ChangePassword_PasswordsNotMatch");
         
        if($("#input_ChangePassword_NewPassword1").val() != $("#input_ChangePassword_NewPassword2").val())
        {
            $("#alert_ChangePassword_PasswordsNotMatch").addClass('alert-danger');
            $("#alert_ChangePassword_PasswordsNotMatch").text("Los passwords no coinciden");
            
        }
        else
        {
            $("#alert_ChangePassword_PasswordsNotMatch").addClass('alert-success');
            $("#alert_ChangePassword_PasswordsNotMatch").text("Los passwords coinciden!");
            SessionUIManager.ValidRegisterForm();
        }
        $('#alert_ChangePassword_PasswordsNotMatch').show();
        clearTimeout(SessionUIManager.alertChangePasswordPasswordsNotMatchTimer);            
        SessionUIManager.alertChangePasswordPasswordsNotMatchTimer = window.setTimeout(function ()
        {
            $('#alert_ChangePassword_PasswordsNotMatch').hide();
        }, 2000);         
        
    });
     
     $("#input_Register_Email").on("keypress keyup keydown", function()
    {
        clearAlert("#alert_Register_InvalidEmail");        
        
        if(validateEmail($("#input_Register_Email").val()))
        {
            $("#alert_Register_InvalidEmail").addClass('alert-success');
            $("#alert_Register_InvalidEmail").text("Dirección valida!");
            SessionUIManager.ValidRegisterForm();
        }
        else
        {
            $("#alert_Register_InvalidEmail").addClass('alert-danger');
            $("#alert_Register_InvalidEmail").text("Dirección invalida");            
        }
        $('#alert_Register_InvalidEmail').show();
        clearTimeout(SessionUIManager.alertRegisterInvalidEmailTimer);            
        SessionUIManager.alertRegisterInvalidEmailTimer = window.setTimeout(function ()
        {
            $('#alert_Register_InvalidEmail').hide();
        }, 2000);     
    });
     
    $("#input_ChangePassword_Email").on("keypress keyup keydown", function()
    {
        clearAlert("#alert_ChangePassword_InvalidEmail");        
        
        if(validateEmail($("#input_ChangePassword_Email").val()))
        {
            $("#alert_ChangePassword_InvalidEmail").addClass('alert-success');
            $("#alert_ChangePassword_InvalidEmail").text("Dirección valida!");
        }
        else
        {
            $("#alert_ChangePassword_InvalidEmail").addClass('alert-danger');
            $("#alert_ChangePassword_InvalidEmail").text("Dirección invalida");            
        }
        $('#alert_ChangePassword_InvalidEmail').show();
        clearTimeout(SessionUIManager.alertChangePasswordInvalidEmailTimer);            
        SessionUIManager.alertChangePasswordInvalidEmailTimer = window.setTimeout(function ()
        {
            $('#alert_ChangePassword_InvalidEmail').hide();
        }, 2000);     
    });

    $("#input_Login_Email").on("keypress keyup keydown", function()
    {
        SessionUIManager.ValidLoginForm();
    });     
     
    $("#input_ForgotPassword_Email").on("keypress keyup keydown", function()
    {
        SessionUIManager.ValidForgotPasswordForm();
    });
     
    $("#input_Login_Password").on("keypress keyup keydown", function()
    {
        SessionUIManager.ValidLoginForm();
    });
     
    /* button  #btn_Login_PasswordReset */
    $(document).on("click", "#btn_Login_PasswordReset", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $("#popup_ResetPassword").modal("toggle");  
         return false;
    });
    
        /* button  #btn_ForgotPassword_Send */
    $(document).on("click", "#btn_ForgotPassword_Send", function(evt)
    {
        var email = $("#input_ForgotPassword_Email").val();
        prosp01_SessionsSessionHandler.ForgotPassword(email);
         return false;
    });
    
        /* button  #btn_ChangePassword_Change */
    
    
        /* button  #btn_Settings_ChangePassword */
    $(document).on("click", "#btn_Settings_ChangePassword", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
         SessionUIManager.ClearChangePasswordForm();
         $("#popup_ChangePassword").modal("toggle");  
         return false;
    });
    
        /* button  #btn_ChangePassword_Change */
    $(document).on("click", "#btn_ChangePassword_Change", function(evt)
    {
        var OldPassword = $("#input_ChangePassword_OldPassword").val();
        var NewPassword = $("#input_ChangePassword_NewPassword1").val();
        
        prosp01_SessionsSessionHandler.ChangePassword(OldPassword, NewPassword);
        /* your code goes here */ 
         return false;
    });
    
        /* button  #MainMenu_Button_Contacts */
    $(document).on("click", "#MainMenu_Button_Contacts", function(evt)
    {
         /*global activate_subpage */
         document.getElementById('page_Logged_Title').innerHTML = "Prospectos";
         activate_subpage("#page_Prospects"); 
         return false;
    });
    
        /* button  #btn_Search_AddFilter */
    $(document).on("click", "#btn_Search_AddFilter", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $("#popup_EconomicUnitsAddFilter").modal("toggle");  
         return false;
    });
    
        /* button  #btn_AddFilter_AddFilter */
    $(document).on("click", "#btn_AddFilter_AddFilter", function(evt)
    {
        var filterType = document.getElementById('select_AddFilter_Type').value;
        var filterLabel = 'Sector';
        var filterName = 'Sector';
        var filterValue = 'Todos';
        var filterText = 'Todos';
        
        if(filterType == 'naics')
        {
            var sector = document.getElementById('select_AddFilter_Sector').value;
            var subSector = document.getElementById('select_AddFilter_SubSector').value;
            var branch = document.getElementById('select_AddFilter_Branch').value;
            var subBranch = document.getElementById('select_AddFilter_SubBranch').value;
            var _class = document.getElementById('select_AddFilter_Class').value;
            
            if(_class != 'all')
            {
                filterValue = _class;
                filterLabel = 'Clase';
                filterName = 'Class';
                filterText = getSelectedText('select_AddFilter_Class');
            }
            else if(subBranch != 'all')
            {
                filterValue = subBranch;
                filterLabel = 'Sub-ramo';
                filterName = 'SubBranch';
                filterText = getSelectedText('select_AddFilter_SubBranch');
            }
            else if(branch != 'all')
            {
                filterValue = branch;
                filterLabel = 'Ramo'; 
                filterName = 'Branch';
                filterText = getSelectedText('select_AddFilter_Branch');
            }
            else if(subSector != 'all')
            {
                filterValue = subSector;
                filterLabel = 'Sub-sector';
                filterName = 'SubSector';
                filterText = getSelectedText('select_AddFilter_SubSector');
            }
            else if(sector != 'all')
            {
                filterValue = sector;
                filterLabel = 'Sector';
                filterName = 'Sector';
                filterText = getSelectedText('select_AddFilter_Sector');
            }
            
            var filterId = ('Filter_' + filterType + '_' + filterName + '_' + filterValue).replace(new RegExp(' ', 'g'), '_');
            
            var newFilter = NaicsUIManager.SearchEconomicUnits.EmptyFilter.replace(new RegExp('IDFILTRO', 'g'), filterId).replace('FILTRO', 'SCIAN ' + filterLabel).replace('VALOR', filterValue).replace('panel-success', 'panel-warning').replace('VALUE', filterText);            
            NaicsUIManager.SearchEconomicUnits.AddFilter(newFilter);
            
            var newFilter = new dtoNaicsFilter('', filterType, filterName, filterValue)
            
            NaicsUIManager.SearchEconomicUnits.FilterObjsList.push(newFilter); 
            
            NaicsUIManager.SearchEconomicUnits.CountFilter(filterId);
            

        }
        else if(filterType == 'geographic')
        {
            var state = document.getElementById('select_AddFilter_State').value;
            var municipality = document.getElementById('select_AddFilter_Municipality').value;
            
            filterLabel = 'Estado';
            filterName = 'State';
            
            if(municipality != 'all')
            {
                filterValue = municipality;
                filterLabel = 'Municipio';
                filterName = 'Municipality';
                filterText = getSelectedText('select_AddFilter_Municipality');
            } else if(state != 'all')
            {
                filterValue = state;
                filterLabel = 'Estado';
                filterName = 'State';
                filterText = getSelectedText('select_AddFilter_State');
            }
            
            var filterId = ('Filter_' + filterType + '_' + filterName + '_' + filterValue).replace(new RegExp(' ', 'g'), '_');
            
            var newFilter = NaicsUIManager.SearchEconomicUnits.EmptyFilter.replace(new RegExp('IDFILTRO', 'g'), filterId).replace('FILTRO', 'Geo ' + filterLabel).replace('VALOR', filterValue).replace('panel-success', 'panel-warning').replace('VALUE', filterText);            
            NaicsUIManager.SearchEconomicUnits.AddFilter(newFilter);
            
            var newFilter = new dtoNaicsFilter('', filterType, filterName, filterValue)
            
            NaicsUIManager.SearchEconomicUnits.FilterObjsList.push(newFilter); 
            
            NaicsUIManager.SearchEconomicUnits.CountFilter(filterId);
            
        }
        else if(filterType == 'business')
        {
            var filterValue = document.getElementById('select_AddFilter_Size').value;
            var filterLabel = 'Empleados';
            var filterName = 'Size';
            var filterText = getSelectedText('select_AddFilter_Size');
            var filterId = ('Filter_' + filterType + '_' + filterName + '_' + filterValue).replace(new RegExp(' ', 'g'), '_');
            var newFilter = NaicsUIManager.SearchEconomicUnits.EmptyFilter.replace(new RegExp('IDFILTRO', 'g'), filterId).replace('FILTRO', 'Negocio ' + filterLabel).replace('VALOR', filterValue).replace('panel-success', 'panel-warning').replace('VALUE', filterText);            
            NaicsUIManager.SearchEconomicUnits.AddFilter(newFilter);
            
            var newFilter = new dtoNaicsFilter('', filterType, filterName, filterValue)
            
            NaicsUIManager.SearchEconomicUnits.FilterObjsList.push(newFilter); 
            
            NaicsUIManager.SearchEconomicUnits.CountFilter(filterId);
        }
        
        console.log('FilterValue ' + filterValue);
        
        /* your code goes here */
         return false;
    });

        /* button  #btn_Prospects_Refresh */
    $(document).on("click", "#btn_Prospects_Refresh", function(evt)
    {
        prosp01_ProspeccionProspeccionHandler.GetProspectsResults(ProspeccionUIManager.SearchProspects.FilterObjsList, NaicsUIManager.SearchEconomicUnits.Query);
         return false;
    });
    
        /* button  #btn_Search_ResultsRefresh */
    $(document).on("click", "#btn_Search_ResultsRefresh", function(evt)
    {
        NaicsUIManager.ClearResults();                                                                         hole01_BussinesNaicsHandler.GetEconimicUnitsResults(NaicsUIManager.SearchEconomicUnits.FilterObjsList, NaicsUIManager.SearchEconomicUnits.Query);
         return false;
    });
    
        /* button  #btn_Prospects_AddProspect */
    $(document).on("click", "#btn_Prospects_AddProspect", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $("#popup_AddProspect").modal("toggle");  
         return false;
    });
    
        /* button  #btn_EconomicUnits_ClearInputSearch */
    $(document).on("click", "#btn_EconomicUnits_ClearInputSearch", function(evt)
    {
        /* your code goes here */ 
        $('#btn_EconomicUnits_ClearInputSearch').hide();
        $('#input_EconomicUnits_Search').val('');
        NaicsUIManager.SearchEconomicUnits.Query = '';
         NaicsUIManager.ClearResults();                                                                         hole01_BussinesNaicsHandler.GetEconimicUnitsResults(NaicsUIManager.SearchEconomicUnits.FilterObjsList, NaicsUIManager.SearchEconomicUnits.Query);
         return false;
    });
    
        /* button  #btn_DiscardEconomicUnit_Discard */
    $(document).on("click", "#btn_DiscardEconomicUnit_Discard", function(evt)
    {
        var economicUnitId = ProspeccionUIManager.ActiveProspectId;
        $("#Result_EconomicUnit_" + economicUnitId).hide();
        var reason = $("#input_DiscardEconomicUnit_Reason").val();
        $("#input_DiscardEconomicUnit_Reason").val('');
        var request = new dtoDiscardEconomicUnitRequest(economicUnitId, reason);
        prosp01_ProspeccionProspectosController.DiscardEconomicUnit(request,
        function(data)
        {
            prosp01_ProspeccionProspeccionHandler.GetDiscartedProspectsIds();
            prosp01_ProspeccionProspeccionHandler.GetProspectsIds();
            NaicsUIManager.SearchEconomicUnits.RefreshUI();
        },
        function(data)
        {
            
        });
         return false;
    });
    
        /* button  #btn_Calendar_Add */
    
    
        /* button  #btn_Calendar_Add */
    $(document).on("click", "#btn_Calendar_Add", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $("#popup_CreateEventReminder").modal("toggle");  
         return false;
    });
    
        /* button  #btn_SalesProfile_AddEvent */
    $(document).on("click", "#btn_SalesProfile_AddEvent", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
         $("#popup_SalesProcess_Step3").modal("hide");
         $("#popup_CreateEventReminder").modal("toggle");  
         return false;
    });
    
        /* button  #btn_SalesProfile_AddEmployee */
    $(document).on("click", "#btn_SalesProfile_AddEmployee", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
         $("#popup_SalesProcess_Step3").modal("hide");
         $("#popup_AddEmployee").modal("toggle");  
         return false;
    });
    
        /* button  #btn_SalesProfile_ObjectionsList */
    $(document).on("click", "#btn_SalesProfile_ObjectionsList", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
         $("#popup_SalesProcess_Step3").modal("hide");
         $("#popup_SalesProcess_Step5").modal("toggle");  
         return false;
    });
    
        /* button  #btn_ObjectionsList_AddObjection */
    $(document).on("click", "#btn_ObjectionsList_AddObjection", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $("#popup_EditObjection").modal("toggle");  
         return false;
    });
    
        /* button  #btn_Prospects_ClearSearch */
    $(document).on("click", "#btn_Prospects_ClearSearch", function(evt)
    {
        $('#btn_Prospects_ClearSearch').hide();
        $('#input_Prospects_Search').val('');
         return false;
    });
    
        /* button  .uib_w_48 */
   
    
        /* button  #MainMenu_Button_EconomicUnits */
    $(document).on("click", "#MainMenu_Button_EconomicUnits", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_subpage_EconomicUnits_List"); 
         return false;
    });
    
        /* button  #MainMenu_Button_Prospects */
    $(document).on("click", "#MainMenu_Button_Prospects", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_subpage_Prospects_List"); 
         return false;
    });
    
        /* button  #MainMenu_Button_Calendar */
    $(document).on("click", "#MainMenu_Button_Calendar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_subpage_Events_List"); 
         return false;
    });
    
        /* button  #MainMenu_Button_Sales */
    
    
        /* button  #MainMenu_Button_Configuration */
    $(document).on("click", "#MainMenu_Button_Configuration", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_Configuration"); 
         return false;
    });
    
        /* button  #btn_ProspectEvents_Add */
    $(document).on("click", "#btn_ProspectEvents_Add", function(evt)
    {
         /* Other options: .modal("show")  .modal("hide")  .modal("toggle")
         See full API here: http://getbootstrap.com/javascript/#modals 
            */
        
         $("#popup_CreateEventReminder").modal("toggle");  
         return false;
    });
    
        /* button  #MainMenu_Button_Sales */
    $(document).on("click", "#MainMenu_Button_Sales", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#SalesProcesses_ResultsList"); 
         return false;
    });
    
        /* button  Registrar Nueva Cuenta */
    $(document).on("click", ".uib_w_1943", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_RegisterUser"); 
         return false;
    });
    
        /* button  #button_BackStart */
    $(document).on("click", "#button_BackStart", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_Start"); 
         return false;
    });
    
        /* button  #btn_PageStart_Send */
    
    
        /* button  #btn_PageStart_Send */
    $(document).on("click", "#btn_PageStart_Send", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_Pendientes"); 
         return false;
    });
    
       
        /* button  #btn_headerFiltros */
    $(document).on("click", "#btn_headerFiltros", function(evt)
    {
         /*global activate_subpage */
        activate_page("#uib_page_FiltrosSplash");
        setTimeout(function()
                   {
                    activate_subpage("#uib_page_Filtros"); console.log('Timer');
                    },1000);
         return false;
    });
    
        /* button  #btn_FooterPendientes */
    $(document).on("click", "#btn_FooterPendientes", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#page_Pendientes"); 
         return false;
    });
    
        /* button  #btn_FiltrosBuscar */
    $(document).on("click", "#btn_FiltrosBuscar", function(evt)
    {
         /*global activate_subpage */
         activate_subpage("#uib_page_DenueResults"); 
         return false;
    });
    
    }
document.addEventListener("app.Ready", register_event_handlers, false);
document.addEventListener("app.Ready", init_user_interface, false);
    

})();