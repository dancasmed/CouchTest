Hole01Db = 
{
	Init : function(userName, projectName, remoteHost)
	{

		console.log('Init!');
		Hole01Db.RemoteHost = remoteHost;
		Hole01Db.UserDb = new PouchDB(userName);
		Hole01Db.ProjectDb = new PouchDB(projectName);
		Hole01Db.UserName = userName;
		Hole01Db.ProjectName = projectName;

		Hole01Db.UserDb.changes({
		      since: 'now',
		      live: true
		}).on('change', Hole01Db.UserDbChanged);

		Hole01Db.ProjectDb.changes({
		      since: 'now',
		      live: true
		}).on('change', Hole01Db.ProjectDbChanged);
	},
	RemoteHost : null,
	UserDb : null,
	ProjectDb : null,
	UserName : null,
	ProjectName : null,
	UserDbChanged : function(info)
	{

	},
	ProjectDbChanged : function(info)
	{

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

	},
	SyncActive : function()
	{

	},
	SyncDenied : function(error)
	{

	},
	SyncComplete : function(info)
	{

	},
	SyncError : function(error)
	{

	}

};