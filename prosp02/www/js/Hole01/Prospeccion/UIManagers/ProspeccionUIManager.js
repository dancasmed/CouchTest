var ProspeccionUIManager =
{
    ActiveProspectId : "",
    ProspectsIds : "",
    DiscartedProspectsIds : "",
    DiscartedEconomicsUnits : "",    
    Prospects : [],
    SearchProspects : new UIList('Prospects', function()
    {
         ProspeccionUIManager.ClearResults();                                                                         prosp01_ProspeccionProspeccionHandler.GetProspectsResults(ProspeccionUIManager.SearchProspects.FilterObjsList, '');
    }),
    SalesProcesses : new UIList('SalesProcesses', function()
    {
        ProspeccionUIManager.ClearResults();
        prosp01_ProspeccionProspeccionHandler.GetProspectsResults(ProspeccionUIManager.SearchProspects.FilterObjsList, '');
    }),
    ClearResults : function()
    {
        ProspeccionUIManager.SearchEconomicUnits.ClearResults();
        ProspeccionUIManager.Prospects = [];
    },
    ShowProspectProfile : function(id)
    {
        $("#popup_ProspectProfile").modal("toggle");
        ProspeccionUIManager.ActiveProspectId = id;
        for(var i =0; i< ProspeccionUIManager.Prospects.length; i++)
        {
            if(ProspeccionUIManager.Prospects[i].ElasticId == id)
            {
                var prosp = ProspeccionUIManager.Prospects[i];    
                console.log(JSON.stringify(prosp));
                $('#PopupProspectProfileName').html(prosp.Name);                
                if(prosp.BusinessName)
                    $('#PopupProspectProfileBusinessName').html('<label>Razon social&nbsp;</label>'+prosp.BusinessName+'<br>');
                $('#PopupProspectProfileNaicsClassName').html(prosp.NaicsClassName);
                $('#PopupProspectProfileStaffSize').html(prosp.StaffSize);
                
                
                if(prosp.PhoneNumber)
                    $('#PopupProspectProfilePhoneNumber').html('<label>Telefono&nbsp;</label>' + prosp.PhoneNumber + '<br>');
                if(prosp.Email)
                    $('#PopupProspectProfileEmailAddress').html('<label>Email&nbsp;</label>' + prosp.Email + '<br>');
                
                if(prosp.WebSite)
                    $('#PopupProspectProfileWebsite').html('<label>Website&nbsp;</label>' + prosp.WebSite + '<br>');
                
                if(prosp.Addresses[0])
                {
                    $('#PopupProspectProfileAddress').html('<label>Direccion&nbsp;</label>' +  prosp.Addresses[0].split(':::')[1] + '<br>');
                }
                
                $('#PopupProspectProfileEmployees').html('');
                $('#PopupProspectProfileSocialNetworks').html('');
            }
        }
    },
    ShowSalesProfile : function(id)
    {
        ProspeccionUIManager.ActiveProspectId = id;
        for(var i =0; i< ProspeccionUIManager.Prospects.length; i++)
        {
            if(ProspeccionUIManager.Prospects[i].ElasticId == id)
                {
                    var prosp = ProspeccionUIManager.Prospects[i];
                    if(prosp.PhoneNumbers && prosp.PhoneNumbers[0])
                        ProspeccionUIManager.ActiveProspectPhone = prosp.PhoneNumbers[0].split(':::')[1];
                    if(prosp.Emails && prosp.Emails[0])
                        ProspeccionUIManager.ActiveProspectMail = prosp.Emails[0].split(':::')[1];
                    
                    console.log(JSON.stringify(prosp));
                    
                    if(prosp.SellingStep == 2)
                    {
                        $("#popup_SalesProcess_Step3").modal("toggle");
                        
                    }
                    else if(prosp.SellingStep == 3)
                    {
                        $("#popup_SalesProcess_Step4").modal("toggle");
                    }
                    else if(prosp.SellingStep == 4)
                    {
                        $("#popup_SalesProcess_Step5").modal("toggle");
                    }
                    else
                    {
                        
                        $('#ProspectProfileName').html('<label>Nombre&nbsp;</label>' + prosp.Name);
                        
                        if(prosp.BusinessName)
                            $('#ProspectProfileBusinessName').html('<label>Razon social&nbsp;</label>' + prosp.BusinessName);
                        
                        if(prosp.NaicsClassName)
                            $('#ProspectProfileNaicsClassName').html(prosp.NaicsClassName);
                        
                        if(prosp.StaffSize)
                            $('#ProspectProfileStaffSize').html(prosp.StaffSize);
                        
                        if(prosp.PhoneNumbers && prosp.PhoneNumbers[0])
                            $('#ProspectProfilePhoneNumber').html('<label>Telefono&nbsp;</label>' + prosp.PhoneNumbers[0].split(':::')[1]);
                        
                        if(prosp.Emails  && prosp.Emails[0])
                            $('#ProspectProfileEmailAddress').html(prosp.Emails[0].split(':::')[1]);
                        
                        if(prosp.Websites[0])
                            $('#ProspectProfileWebsite').html('<label>Website&nbsp;</label>' + prosp.Websites[0].split(':::')[1]);
                        
                        if(prosp.Addresses[0])
                            $('#ProspectProfileAddress').html('<label>Direccion&nbsp;</label>' + prosp.Addresses[0].split(':::')[1]);
                        
                        
                        
                        $("#popup_SalesProcess_Step2").modal("toggle");
                    }
                }
        }
        
    },
    ShowDiscardProfile : function(id)
    {
        $("#popup_DiscardProspect").modal("toggle");
    },
    ShowProspectEvents : function(id)
    {
        $("#popup_ProspectEvents").modal("toggle");
    }
};