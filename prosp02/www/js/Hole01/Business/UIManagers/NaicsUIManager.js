var NaicsUIManager =
{    
    EconomicUnits : [],
    SearchEconomicUnits : new UIList('EconomicUnits', function()
    {
        NaicsUIManager.ClearResults();                                                                         
        hole01_BussinesNaicsHandler.GetEconimicUnitsResults(NaicsUIManager.SearchEconomicUnits.FilterObjsList, '');
    }),
    ClearResults : function()
    {
        NaicsUIManager.SearchEconomicUnits.ClearResults(); 
    },
    clearAddFilter : function()
    {
        UIManager.clearSelector(document.getElementById('select_AddFilter_SubSector'));
        UIManager.clearSelector(document.getElementById('select_AddFilter_Branch'));
        UIManager.clearSelector(document.getElementById('select_AddFilter_SubBranch'));
        UIManager.clearSelector(document.getElementById('select_AddFilter_Class'));
        $("#select_AddFilter_Sector").val($("#select_AddFilter_Sector option:first").val());
        
        UIManager.clearSelector(document.getElementById('select_AddFilter_Municipality'));
        $("#select_AddFilter_State").val($("#select_AddFilter_State option:first").val());
        
        $("#select_AddFilter_Type").val($("#select_AddFilter_Type option:first").val());
        $('#SCIAN_Filter').show();
        $('#Geographic_Filter').hide();
        $('#Normal_Filter').hide();
    },
    onDiscardReasonChange : function()
    {
        if($("#input_DiscardEconomicUnit_Reason").val().length > 0)
        { console.log('Reason changed');
            $('#btn_DiscardEconomicUnit_Discard').prop('disabled', false);
        }
    },
    onFilterTypeChange : function()
    {
        var filterName = document.getElementById('select_AddFilter_Type').value;
        console.log(filterName);
        $('#SCIAN_Filter').hide();
        $('#Geographic_Filter').hide();
        $('#Normal_Filter').hide();
        
        
        if(filterName == 'naics')
        {   
            $('#SCIAN_Filter').show();            
            NaicsUIManager.loadSectors();
        }
        else if(filterName == 'geographic')
        {
            $('#Geographic_Filter').show();
            
        }
        else
        {
            $('#Normal_Filter').show();
        }
    },
    loadSectors : function()
    {        
        var selector = document.getElementById('select_AddFilter_Sector');        
        data = JsonDb.Lists['sectors'].sort(function(a,b) {return (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0);} ); 
            
                    for(var i = 0; i < data.length; i++)
                    {                        
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Code;
                        newOption.innerHTML = data[i].Title;
                        selector.appendChild(newOption);                        
                    }
                    NaicsUIManager.clearAddFilter();
                    
        
    },
    loadStates : function()
    {
        
        var selector = document.getElementById('select_AddFilter_State');        
                    data = JsonDb.Lists['states'].sort(function(a,b) {return (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0);} );
                
                    for(var i = 0; i < data.length; i++)
                    {                        
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Name;
                        newOption.innerHTML = data[i].Name;
                        selector.appendChild(newOption);                        
                    }
                    NaicsUIManager.clearAddFilter();
                    
    },
    onSectorChange : function()
    {
        $("#popup_Loading").modal();
        var sectorCode = document.getElementById('select_AddFilter_Sector').value;
        var selector = document.getElementById('select_AddFilter_SubSector');
        
                data = JsonDb.Lists['subsectors'].sort(function(a,b) {return (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0);} ); 
            
                UIManager.clearSelector(selector);
                UIManager.clearSelector(document.getElementById('select_AddFilter_Branch'));
                UIManager.clearSelector(document.getElementById('select_AddFilter_SubBranch'));
                UIManager.clearSelector(document.getElementById('select_AddFilter_Class'));                
                
                for(var i = 0; i < data.length; i++)
                {
                    if(sectorCode == data[i].SectorCode)
                    {
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Code;
                        newOption.innerHTML = data[i].Title;
                        selector.appendChild(newOption);
                    }
                }    
                $("#popup_Loading").modal('hide');
            
    },
    onSubSectorChange : function()
    {
        
        var subSectorCode = document.getElementById('select_AddFilter_SubSector').value;
        var selector = document.getElementById('select_AddFilter_Branch');
        
                data = JsonDb.Lists['branches'].sort(function(a,b) {return (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0);} ); 
                
                UIManager.clearSelector(selector);                
                UIManager.clearSelector(document.getElementById('select_AddFilter_SubBranch'));
                UIManager.clearSelector(document.getElementById('select_AddFilter_Class'));
            
                for(var i = 0; i < data.length; i++)
                {
                    if(subSectorCode == data[i].SubSectorCode)
                    {
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Code;
                        newOption.innerHTML = data[i].Title;
                        selector.appendChild(newOption);
                    }
                }  
                $("#popup_Loading").modal('hide');
        
    },
    onBranchChange : function()
    {
        
        var branchCode = document.getElementById('select_AddFilter_Branch').value;
        var selector = document.getElementById('select_AddFilter_SubBranch');
        
                data = JsonDb.Lists['subbranches'].sort(function(a,b) {return (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0);} ); 
                
                UIManager.clearSelector(selector);                
                UIManager.clearSelector(document.getElementById('select_AddFilter_Class'));
                
                for(var i = 0; i < data.length; i++)
                {
                    
                    if(branchCode == data[i].BranchCode)
                    {
                        
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Code;
                        newOption.innerHTML = data[i].Title;
                        selector.appendChild(newOption);                        
                    }   
                }
    }, 
    onSubBranchChange : function()
    {
        
        var subBranchCode = document.getElementById('select_AddFilter_SubBranch').value;
        var selector = document.getElementById('select_AddFilter_Class');
        
                data = JsonDb.Lists['classes'].sort(function(a,b) {return (a.Code > b.Code) ? 1 : ((b.Code > a.Code) ? -1 : 0);} ); 
                
                UIManager.clearSelector(selector);
            
                for(var i = 0; i < data.length; i++)
                {
                    if(subBranchCode == data[i].SubBranchCode)
                    {
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Code;
                        newOption.innerHTML = data[i].Title;
                        selector.appendChild(newOption);                       
                    }
                }
        
        
    }, 
    onStateChange : function()
    {

        var stateName = document.getElementById('select_AddFilter_State').value;
        var selector = document.getElementById('select_AddFilter_Municipality');
        
                data = JsonDb.Lists['municipalities'].sort(function(a,b) {return (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0);} ); 
                
                UIManager.clearSelector(selector);
            
                for(var i = 0; i < data.length; i++)
                {
                    if(stateName == data[i].StateName)
                    {
                        var newOption = document.createElement('option');
                        newOption.value = data[i].Name;
                        newOption.innerHTML = data[i].Name;
                        selector.appendChild(newOption);
                    }
                }    

        
    },
    onSearchChange : function()
    {
        $('#btn_EconomicUnits_ClearInputSearch').show();
        var query = $('#input_EconomicUnits_Search').val();
        if(query.length >= 3)
        {
            NaicsUIManager.SearchEconomicUnits.ResultsPage = 1;
            NaicsUIManager.SearchEconomicUnits.Query = query;
            NaicsUIManager.ClearResults();                 
            hole01_BussinesNaicsHandler.GetEconimicUnitsResults(NaicsUIManager.SearchEconomicUnits.FilterObjsList, query);
        }
    }
};