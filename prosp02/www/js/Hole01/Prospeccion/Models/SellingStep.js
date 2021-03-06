var prosp01_ProspeccionSellingStep =
{
	Search : function (query, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:9001/prosp01/SellingSteps/search/' + encodeURI(query) + '',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	SearchBy : function (property, query, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:9001/prosp01/SellingSteps/searchby/' + encodeURI(property) + '/' + encodeURI(query) + '',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Create : function (obj, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/SellingSteps/new',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },
			data: JSON.stringify(obj),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Read : function (elasticId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:9001/prosp01/SellingSteps/' + encodeURI(elasticId) + '',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Update : function (obj, elasticId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Patch',
			url: 'http://10.28.249.211:9001/prosp01/SellingSteps/' + encodeURI(elasticId) + '',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },
			data: JSON.stringify(obj),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Delete : function (elasticId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Delete',
			url: 'http://10.28.249.211:9001/prosp01/SellingSteps/' + encodeURI(elasticId) + '',
			contentType: 'application/json',
			dataType: 'json',
headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	}
};
