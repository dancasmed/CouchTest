var prosp01_SessionsSessionController =
{
	Register : function (registerRequest, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9000/prosp01/Sessions/register',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(registerRequest),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	ChangePassword : function (request, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9000/prosp01/Sessions/changePassword',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },
			data: JSON.stringify(request),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	InitSession : function (callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:9000/prosp01/Sessions/init',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Login : function (loginRequest, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9000/prosp01/Sessions/login',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(loginRequest),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	ForgotPassword : function (email, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:9000/prosp01/Sessions/forgotPassword/' + encodeURI(email) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	ResetPassword : function (resetPasswordToken, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:9000/prosp01/Sessions/resetPassword/' + encodeURI(resetPasswordToken) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	}
};
function Session()
{
this.InitToken = '';
this.Sessiontoken = '';
this.SessionStatus = 'Off';
};
