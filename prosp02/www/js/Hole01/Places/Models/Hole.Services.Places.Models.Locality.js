var hole01_PlacesHole.Services.Places.Models.Locality =
{
	Search : function (query, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:6661/Places/Localities/search/' + encodeURI(query) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	SearchBy : function (property, query, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:6661/Places/Localities/searchby/' + encodeURI(property) + '/' + encodeURI(query) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Create : function (obj, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Post',
			url: 'http://10.28.249.211:6661/Places/Localities/new',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(obj),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Read : function (elasticId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Get',
			url: 'http://10.28.249.211:6661/Places/Localities/' + encodeURI(elasticId) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Update : function (obj, elasticId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Patch',
			url: 'http://10.28.249.211:6661/Places/Localities/' + encodeURI(elasticId) + '',
			contentType: 'application/json',
			dataType: 'json',

			data: JSON.stringify(obj),
			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	},
	Delete : function (elasticId, callbackSuccess, callbackFail)
	{
		$.ajax({
			type: 'Delete',
			url: 'http://10.28.249.211:6661/Places/Localities/' + encodeURI(elasticId) + '',
			contentType: 'application/json',
			dataType: 'json',


			success: function(data) { callbackSuccess(data); }
		}).fail(function(data) { callbackFail(data); });
	}
};
