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
		
        Hole01Db.UserDb = new PouchDB(projectName + '-' + userId);
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

		console.log('Hole01Db initiated...');
		return;
	},	
	UserDbChanged : function(info)
	{
		console.log('Change detected at User Db');
	},
	ProjectDbChanged : function(info)
	{
		console.log('Change detected at Project Db' );
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
		
		PouchDB.sync(Hole01Db.UserId, Hole01Db.RemoteHost + '/' + Hole01Db.UserId, opts
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
        $(".uib_w_19476").modal("toggle");  
	},
	SyncActive : function()
	{
		console.log('Sync Active.');
        $(".uib_w_19476").modal("toggle");  
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
        $(".uib_w_19476").modal("toggle");  
		if(error.status == '0' && error.name == 'unknown')
		{
			console.log('Error contacting remote CouchDb at ' + Hole01Db.RemoteHost);
            
		}
		else
		{
			console.log('Sync Error ' + JSON.stringify(error));
		}
	},
    UserDbSave : function(objectType, obj)
    {
        if(obj.ObjectType == undefined)
        {
            obj.ObjectType = objectType;
        }
        if(obj._id == undefined)
        {
            Hole01Db.UserDb.post(obj).then(function(response){}).catch(function(err){console.log('SavingE: '+ JSON.stringify(err));});
        }
        else
        {
            Hole01Db.UserDb.put(obj).then(function(response){}).catch(function(err){});
        }
    },
    GetRegisteredTypes : function()
    {
        Hole01Db.ObjTypes = [];
        Hole01Db.ProjectDb.find({
            selector: {
                ObjectType: {$regex: "^Hole.*"}
            },fields:['ObjectType'], limit :100000
        }).then(function(res){
            for(var i = 0; i< res.docs.length; i++)
            {                
                if(Hole01Db.ObjTypes.indexOf(res.docs[i].ObjectType) == -1)
                {
                    Hole01Db.ObjTypes.push(res.docs[i].ObjectType);
                }
            }
            console.log(JSON.stringify(Hole01Db.ObjTypes));
        })
    },
    GetProyectObjectsByType : function(objectType, skip = 0, limit = 10, sortField = '')
    {
        Hole01Db.ProjectDb.find({
            selector: {
                ObjectType : objectType
            },
            limit : limit,
            skip : skip
        }).then(function(res)
        {
            console.log(JSON.stringify(res));
            console.log('Results: ' + res.docs.length);
        });
    },
	CreateObjectIndexes : function(obj)
	{
		Object.getOwnPropertyNames(obj).forEach(
			function(item,index)
			{
				if(typeof obj[item] != 'function' && typeof obj[item] != 'object' && typeof obj[item] != 'undefined')
					console.log('Indexable property ' + item + ' (' + typeof obj[item] + ')');
				else
					console.log('Not indexable property ' + item + ' (' + typeof obj[item] + ')');
			}
		);
	}

};