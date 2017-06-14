var hole01_BusinessNaicsController =
{
	CountFilter : function (filter, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:6662/Hole/Business/Naics/Filters/Count',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(filter),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	GetResults : function (request, pageSize, pageNumber, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:6662/Hole/Business/Naics/Filters/Results/' + encodeURI(pageSize) + '/' + encodeURI(pageNumber) + '',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(request),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	GetEconomicUnitProfile : function (economicUnitId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:6662/Hole/Business/Naics/Profile/' + encodeURI(economicUnitId) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	}
};
