Hole01Db = 
{
	RemoteHost : null,
	UserDb : null,
	ProjectDb : null,
	UserId : null,
	ProjectName : null,
	Init : function(userId, projectName, remoteHost)
	{
		
		Hole01Db.RemoteHost = remoteHost;
		Hole01Db.UserDb = new PouchDB(userName);
		Hole01Db.ProjectDb = new PouchDB(projectName);
		Hole01Db.UserId = userId;
		Hole01Db.ProjectName = projectName;

		console.log('Creating user Db...');
		Hole01Db.UserDb.changes({
		      since: 'now',
		      live: true
		}).on('change', Hole01Db.UserDbChanged);

		console.log('Creating project Db...');
		Hole01Db.ProjectDb.changes({
		      since: 'now',
		      live: true
		}).on('change', Hole01Db.ProjectDbChanged);

		if (typeof window != "undefined")
		{
			window.PouchDB = PouchDB;
		};

		console.log('Hole01 initiated...');
		return;
	},	
	UserDbChanged : function(info)
	{
		console.log('Change detected at User Db: ' + JSON.stringify(info));
	},
	ProjectDbChanged : function(info)
	{
		console.log('Change detected at Project Db: ' + JSON.stringify(info));
	},
	Sync : function()
	{
		var opts = {live: true};

		PouchDB.sync(Hole01Db.ProjectName, Hole01Db.RemoteHost + '/' + Hole01Db.ProjectName, opts
		).on('change', Hole01Db.ProjectDbChanged
		).on('paused', Hole01Db.SyncPaused
		).on('active', Hole01Db.SyncActive
		).on('denied', Hole01Db.SyncDenied
		).on('complete', Hole01Db.SyncComplete
		).on('error', Hole01Db.SyncError);
		
		PouchDB.sync(Hole01Db.UserName, Hole01Db.RemoteHost + '/' + Hole01Db.UserName, opts
		).on('change', Hole01Db.ProjectDbChanged
		).on('paused', Hole01Db.SyncPaused
		).on('active', Hole01Db.SyncActive
		).on('denied', Hole01Db.SyncDenied
		).on('complete', Hole01Db.SyncComplete
		).on('error', Hole01Db.SyncError);
		
	},
	SyncPaused : function(error)
	{
		console.log('Sync Paused: ' + JSON.stringify(error));
	},
	SyncActive : function()
	{
		console.log('Sync Active.');
	},
	SyncDenied : function(error)
	{
		console.log('Sync Denied: ' + JSON.stringify(error));
	},
	SyncComplete : function(info)
	{
		console.log('Sync Complete ' + JSON.stringify(info));
	},
	SyncError : function(error)
	{
		if(error.status == '0' && error.name == 'unknown')
		{
			console.log('Error contacting remote CouchDb at ' + Hole01Db.RemoteHost);
		}
		else
		{
			console.log('Sync Error ' + JSON.stringify(error));
		}
	},
	CreateObjectIndexes : function(obj)
	{
		Object.getOwnPropertyNames(obj).forEach(
			function(item,index)
			{
				if(typeof obj[item] != 'function' && typeof obj[item] != 'object')
					console.log('Indexable property ' + item + ' (' + typeof obj[item] + ')');
				else
					console.log('Not indexable property ' + item + ' (' + typeof obj[item] + ')');
			}
		);
	}

};