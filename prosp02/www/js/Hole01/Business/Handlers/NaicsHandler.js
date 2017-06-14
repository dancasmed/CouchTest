var hole01_BussinesNaicsHandler =
{
	GetEconomicUnitProfile : function (economicUnitId)
    {
        hole01_BusinessNaicsController.GetEconomicUnitProfile(economicUnitId,
            function(data)
            {
                $('#EconomicUnitProfileDenueId').html(data.EconomicUnit.DenueId);
                $('#EconomicUnitProfileName').html(data.EconomicUnit.Name);
                if(data.EconomicUnit.BusinessName)
                    $('#EconomicUnitProfileBusinessName').html('<label>Razon social&nbsp;</label>' + data.EconomicUnit.BusinessName + '<br>');
                $('#EconomicUnitProfileNaicsClassName').html(data.EconomicUnit.NaicsClassName);
                $('#EconomicUnitProfileStaffSize').html(data.EconomicUnit.StaffSize);
                
                if(data.EconomicUnit.PhoneNumber)
                    $('#EconomicUnitProfilePhoneNumber').html('<label>Telefono&nbsp;</label><a href="tel:' + data.EconomicUnit.PhoneNumber + '">' + data.EconomicUnit.PhoneNumber + '</a><BR>');
                
                if(data.EconomicUnit.Email)
                    $('#EconomicUnitProfileEmailAddress').html('<label>Email&nbsp;</label><a href="mailto:' + data.EconomicUnit.Email + '">' + data.EconomicUnit.Email + '</a>');
                
                if(data.EconomicUnit.WebSite)
                    $('#EconomicUnitProfileWebsite').html('<a href="' + data.EconomicUnit.WebSite + '">' + data.EconomicUnit.WebSite + '</a>');
            
                $('#EconomicUnitProfileAddress').html('<label>Direccion&nbsp;</label>'+data.MainAddress+'<BR>');
                
                $('#popup_EconomicUnitProfile').modal();
            },
            function(data)
            {
            
            }
        );
    },
        
    GetEconimicUnitsResults : function(filters, query)
    {
        var newRequest = new dtoGetResultsRequest(filters, query);
            
            hole01_BusinessNaicsController.GetResults(newRequest, 15, NaicsUIManager.SearchEconomicUnits.ResultsPage,
                function(data)
                {
                    document.getElementById("EconomicUnits_TotalCount").innerHTML = data.TotalResults;
                    for(var i = 0; i<data.Results.length; i++)
                    {                        
                        var unitId = 'EconomicUnit_' + data.Results[i].ElasticId; 
                        
                        var newResult = NaicsUIManager.SearchEconomicUnits.EmptyResult;
                        
                        if(ProspeccionUIManager.ProspectsIds.indexOf(data.Results[i].ElasticId) != -1)
                        {                            
                            newResult = newResult.replace('panel-info', 'panel-success').replace('DETALLES', 'Esta unidad economica ya es un prospecto.');
                            newResult = newResult.replace('showdiscartedops','style="display: none;"');
                            newResult = newResult.replace('showops','style="display: none;"');
                        }
                        else if(ProspeccionUIManager.DiscartedProspectsIds.indexOf(data.Results[i].ElasticId) != -1)
                        {                            
                            newResult = newResult.replace('panel-info', 'panel-danger').replace('DETALLES', 'Esta unidad economica fue descartada.');      
                            newResult = newResult.replace('showdiscartedops','');
                            newResult = newResult.replace('showops','style="display: none;"');                            
                        }
                        else
                        {
                            newResult = newResult.replace('showdiscartedops','style="display: none;"');                            
                            newResult = newResult.replace('showops',''); 
                        }
                        
                        newResult = newResult.replace('NOMBRE', data.Results[i].Name).replace('DETALLES', data.Results[i].NaicsClassName + '<BR>Tamano ' + data.Results[i].StaffSize + ' empleados<BR>' + data.Results[i].MunicipalityName + ', ' + data.Results[i].StateName).replace(new RegExp('IDUNIT', 'g'), unitId).replace(new RegExp('ECONOMICUNITID', 'g'), data.Results[i].ElasticId);
                        
                        NaicsUIManager.SearchEconomicUnits.AddResult(newResult, unitId);
                        NaicsUIManager.EconomicUnits.push(data.Results[i]); 
                    }
                },
                function(data) 
                {
                console.log('offline economic units');
                    data = JsonDb.Lists['economicunits']; 
                    document.getElementById("EconomicUnits_TotalCount").innerHTML = data.TotalResults;
                    for(var i = 0; i<data.Results.length; i++)
                    {                        
                        var unitId = 'EconomicUnit_' + data.Results[i].ElasticId; 
                        
                        var newResult = NaicsUIManager.SearchEconomicUnits.EmptyResult;
                        console.log(unitId);
                        if(ProspeccionUIManager.ProspectsIds.indexOf(data.Results[i].ElasticId) != -1)
                        {                            
                            newResult = newResult.replace('panel-info', 'panel-success').replace('DETALLES', 'Esta unidad economica ya es un prospecto.');
                            newResult = newResult.replace('showdiscartedops','style="display: none;"');
                            newResult = newResult.replace('showops','style="display: none;"');
                        }
                        else if(ProspeccionUIManager.DiscartedProspectsIds.indexOf(data.Results[i].ElasticId) != -1)
                        {                            
                            newResult = newResult.replace('panel-info', 'panel-danger').replace('DETALLES', 'Esta unidad economica fue descartada.');      
                            newResult = newResult.replace('showdiscartedops','');
                            newResult = newResult.replace('showops','style="display: none;"');                            
                        }
                        else
                        {
                            newResult = newResult.replace('showdiscartedops','style="display: none;"');                            
                            newResult = newResult.replace('showops',''); 
                        }
                        
                        newResult = newResult.replace('NOMBRE', data.Results[i].Name).replace('DETALLES', data.Results[i].NaicsClassName + '<BR>Tamano ' + data.Results[i].StaffSize + ' empleados<BR>' + data.Results[i].MunicipalityName + ', ' + data.Results[i].StateName).replace(new RegExp('IDUNIT', 'g'), unitId).replace(new RegExp('ECONOMICUNITID', 'g'), data.Results[i].ElasticId);
                        
                        NaicsUIManager.SearchEconomicUnits.AddResult(newResult, unitId);
                        NaicsUIManager.EconomicUnits.push(data.Results[i]); 
                        if(i == 20) break;
                    }
                }
            );
    }
};
