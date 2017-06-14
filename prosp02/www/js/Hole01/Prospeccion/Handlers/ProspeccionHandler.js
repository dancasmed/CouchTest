var prosp01_ProspeccionProspeccionHandler =
{
    AddProspect : function (economicUnitId)
    {
        console.log('addprosp');
        prosp01_ProspeccionProspectosController.AddProspect(economicUnitId,
        function(data)
        {
            prosp01_ProspeccionProspeccionHandler.GetDiscartedProspectsIds();
            prosp01_ProspeccionProspeccionHandler.GetProspectsIds();
            NaicsUIManager.SearchEconomicUnits.RefreshUI();
        },
        function(data)
        {
            
        });
    },
    DiscardProspect : function (prospectId)
    {
        var request = new dtoDiscardProspectRequest(prospectId, "");
        prosp01_ProspeccionProspectosController.DiscardProspect(request,
        function(data)
        { 
            
        },
        function(data)
        {
            
        });
    },
    DiscardEconomicUnit : function (economicUnitId)
    {
        ProspeccionUIManager.ActiveProspectId = economicUnitId;
        console.log(NaicsUIManager.EconomicUnits.length);
        for(var i =0; i< NaicsUIManager.EconomicUnits.length; i++)
        {
            
            if(NaicsUIManager.EconomicUnits[i].ElasticId == ProspeccionUIManager.ActiveProspectId)
            {
                var prospect = NaicsUIManager.EconomicUnits[i];
                $("#DiscardEconomicUnitName").html(prospect.Name);
            }
        }
        
        
        $('#popup_DiscardEconomicUnit').modal();
    },
    GetProspectsResults : function(filters, query)
    {
        var newRequest = new dtoGetResultsRequest(filters, query);

            prosp01_ProspeccionProspectosController.GetProspects(newRequest, 15, ProspeccionUIManager.SearchProspects.ResultsPage,
                function(data)
                {

                    for(var i = 0; i<data.Results.length; i++)
                    {                        
                        var prospectId = 'Prospect_' + data.Results[i].ElasticId; 
                        
                        var newResult = ProspeccionUIManager.SearchProspects.EmptyResult.replace('NAME', data.Results[i].Name).replace(new RegExp('IDPROSPECT', 'g'), prospectId).replace(new RegExp('PROSPECTID', 'g'), 
                        data.Results[i].ElasticId).replace(new RegExp('NUMERO', 'g'), data.Results[i].PhoneNumber).replace(new RegExp('EMAIL', 'g'), data.Results[i].Email).replace('DESCRIPCION', data.Results[i].NaicsClassName);
                        console.log(prospectId);
                        var newSalesProcess = ProspeccionUIManager.SalesProcesses.EmptyResult.replace('NAME', data.Results[i].Name).replace(new RegExp('IDPROSPECT', 'g'), prospectId).replace(new RegExp('PROSPECTID', 'g'), 
                        data.Results[i].ElasticId);
                        
                         if(data.Results[i].SellingStep == 2)
                        {
                            newResult = newResult.replace('FASE', 'Aproximacion');
                            newSalesProcess = newSalesProcess.replace('60%', '25%')
                        }
                        else if(data.Results[i].SellingStep == 3)
                        {
                            newResult = newResult.replace('FASE', 'Cita o levantamiento');
                             newSalesProcess = newSalesProcess.replace('60%', '37.5%')
                        }
                        else if(data.Results[i].SellingStep == 4)
                        {
                            newResult = newResult.replace('FASE', 'Objeciones');
                             newSalesProcess = newSalesProcess.replace('60%', '50%')
                        }
                        else if(data.Results[i].SellingStep == 5)
                        {
                            newResult = newResult.replace('FASE', 'Cierre');
                             newSalesProcess = newSalesProcess.replace('60%', '62.5%')
                        }
                        else
                        {
                            newResult = newResult.replace('FASE', 'Pre aproximacion');
                            newSalesProcess = newSalesProcess.replace('60%', '12.5%')
                        }
                        ProspeccionUIManager.Prospects.push(data.ProspectProfiles[i]);
                        ProspeccionUIManager.SearchProspects.AddResult(newResult, prospectId);
                        ProspeccionUIManager.SalesProcesses.AddResult(newSalesProcess, prospectId);
                    }
                    
                },
                function(data)
                {
                
                }
            );
    },
    GetProspectsIds : function()
    {
        prosp01_ProspeccionProspectosController.GetProspectsIds(
            function(data)
            {
                ProspeccionUIManager.ProspectsIds = data.ProspectsIds;
                console.log('Prospects ids: ' + ProspeccionUIManager.ProspectsIds);
            },
            function(data)
            {
                ProspeccionUIManager.ProspectsIds = "AVoDBARIg_w1hnc-_9_2,AVoDjPLkg_w1hnc-AJyc,AVoEr0Ecg_w1hnc-AN6u,AVoDGQsBg_w1hnc-__uR,AVoDEMS2g_w1hnc-__Di,AVoDFY4Lg_w1hnc-__bZ,AVoExZlPg_w1hnc-APh9,AVn9JNy003INPRZuc7R_,AVoDNk-Og_w1hnc-ACRH,AVoEt1eAg_w1hnc-AObT,AVoDaSKpg_w1hnc-AGs5,AVoDjRa_g_w1hnc-AJz8,AVoDFXqog_w1hnc-__a9,AVoDS68Og_w1hnc-AELa,AVoEsIz1g_w1hnc-AN-V,AVoDACqwg_w1hnc-_9q_,AVoDnP-vg_w1hnc-ALKX,AVoE0BT5g_w1hnc-AQYW";
                console.log("PASA3");
            }
        );
    },
    GetDiscartedProspectsIds : function()
    {
        prosp01_ProspeccionProspectosController.GetDiscartedProspectsIds(
            function(data)
            {
                ProspeccionUIManager.DiscartedProspectsIds = data.DiscartedProspectsIds;
                console.log('Discarted prospects ids: ' + ProspeccionUIManager.DiscartedProspectsIds);
            },
            function(data)
            {
                ProspeccionUIManager.DiscartedProspectsIds = "AVoDcySLg_w1hnc-AHkk,AVoDcySLg_w1hnc-AHkk,AVoDGQtxg_w1hnc-__uT,AVoDEc1fg_w1hnc-__JY,AVoE1rI2g_w1hnc-AQ3X,AVoDEMTXg_w1hnc-__Dm,AVoEt1eAg_w1hnc-AObT,AVoDEMTXg_w1hnc-__Dm,AVoDkocfg_w1hnc-AKR4,AVoDrEgng_w1hnc-AMY-,AVoFBEyqg_w1hnc-AT54,AVoDpSctg_w1hnc-AL0e,AVoEsJeXg_w1hnc-AN-p,AVoDb6VDg_w1hnc-AHRb,AVoEzPFeg_w1hnc-AQKL,AVoDG1x2g_w1hnc-__64";
            }
        );
    },
    ValidateDataStep2 : function()
    {
        console.log('validating ' + ProspeccionUIManager.ActiveProspectId);
        for(var i =0; i< ProspeccionUIManager.Prospects.length; i++)
        {
            if(ProspeccionUIManager.Prospects[i].ElasticId == ProspeccionUIManager.ActiveProspectId)
            {
                ProspeccionUIManager.Prospects[i].SellingStep = 2;
            }
        }
    },
    CompleteStep3 : function()
    {
        console.log('validating ' + ProspeccionUIManager.ActiveProspectId);
        for(var i =0; i< ProspeccionUIManager.Prospects.length; i++)
        {
            if(ProspeccionUIManager.Prospects[i].ElasticId == ProspeccionUIManager.ActiveProspectId)
            {
                ProspeccionUIManager.Prospects[i].SellingStep = 3;
            }
        }
    },
    CompleteStep4 : function()
    {
        console.log('validating ' + ProspeccionUIManager.ActiveProspectId);
        for(var i =0; i< ProspeccionUIManager.Prospects.length; i++)
        {
            if(ProspeccionUIManager.Prospects[i].ElasticId == ProspeccionUIManager.ActiveProspectId)
            {
                ProspeccionUIManager.Prospects[i].SellingStep = 4;
            }
        }
    },
    CompleteStep5 : function()
    {
        console.log('validating ' + ProspeccionUIManager.ActiveProspectId);
        for(var i =0; i< ProspeccionUIManager.Prospects.length; i++)
        {
            if(ProspeccionUIManager.Prospects[i].ElasticId == ProspeccionUIManager.ActiveProspectId)
            {
                ProspeccionUIManager.Prospects[i].SellingStep = 5;
            }
        }
    }
};