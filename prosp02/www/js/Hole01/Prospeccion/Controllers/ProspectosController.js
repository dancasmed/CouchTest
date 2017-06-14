var prosp01_ProspeccionProspectosController =
{
	AddProspect : function (economicUnitId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/addProspect/' + encodeURI(economicUnitId) + '',
			contentType: 'application/json',
			dataType: 'json',
            headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	CountFilter : function (filter, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/Prospects/Count',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(filter),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	GetProspects : function (request, pageSize, pageNumber, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/GetProspects/' + encodeURI(pageSize) + '/' + encodeURI(pageNumber) + '',
			contentType: 'application/json',
			dataType: 'json',
            headers: { "Auth-Session" : SessionManager.SessionToken },
			data: JSON.stringify(request),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	GetProspectsIds : function (callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/Prospects/Ids',
			contentType: 'application/json',
			dataType: 'json',
            headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	GetDiscartedProspectsIds : function (callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/DiscartedProspects/Ids',
			contentType: 'application/json',
			dataType: 'json',
            headers: { "Auth-Session" : SessionManager.SessionToken },

			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	DiscardProspect : function (request, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/discardProspect',
			contentType: 'application/json',
			dataType: 'json',
            headers: { "Auth-Session" : SessionManager.SessionToken },
			data: JSON.stringify(request),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	DiscardEconomicUnit : function (request, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:9001/prosp01/Prospectos/discardEconomicUnit',
			contentType: 'application/json',
			dataType: 'json',
            headers: { "Auth-Session" : SessionManager.SessionToken },
			data: JSON.stringify(request),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	}
};
