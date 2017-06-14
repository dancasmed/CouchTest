var SessionUIManager =
{
    alertRegisterPasswordStrengthTimer : 0,
    alertRegisterPasswordsNotMatchTimer : 0,
    alertRegisterInvalidEmail : 0,
    
    alertChangePasswordPasswordStrengthTimer : 0,
    alertChangePasswordPasswordsNotMatchTimer : 0,
    alertChangePasswordInvalidEmail : 0,
    alertChangePasswordPasswordsOldAndNewEqual : 0,
    
    ClearRegisterForm : function()
    {
        $("#input_Register_FirstName").val("");
        $("#input_Register_LastName").val("");
        $("#input_Register_Email").val("");
        $("#input_Register_Password1").val("");
        $("#input_Register_Password2").val("");
    },
    ValidRegisterForm : function()
    {
        if($("#input_Register_FirstName").val() != ""
            && $("#input_Register_LastName").val() != ""
            && $("#input_Register_Email").val() != ""
            && $("#input_Register_Password1").val() != ""
            && $("#input_Register_Password2").val() != "")
        {
            $('#btn_Register_Register').removeAttr('disabled');
        }
    },
    ClearLoginForm : function()
    {
        $("#input_Login_Email").val("");
        $("#input_Login_Password").val("");   
        $("#input_Login_RememberMe").prop("checked", false);
    },
    ValidLoginForm : function()
    {
        if($("#input_Login_Email").val() != "" && $("#input_Login_Password").val() != "")
        {
            $('#btn_Login_Login').removeAttr('disabled');
        }
        
    },
    ClearForgotPasswordForm : function()
    {
        $("#input_ForgotPassword_Email").val("");        
    },
    ValidForgotPasswordForm : function()
    {
        if($("#input_ForgotPassword_Email").val() != "")
        {
            $('#btn_ForgotPassword_Send').removeAttr('disabled');
        }
        
    },
    ClearChangePasswordForm : function()
    {
        $("#input_ChangePassword_NewPassword1").val("");
        $("#input_ChangePassword_NewPassword2").val("");
        $("#input_ChangePassword_OldPassword").val("");
    },
};