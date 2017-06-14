function UIList(name, refreshUI)
{
    this.Name = name;
    this.FiltersList = null;
    this.EmptyFilter = null; 
    this.FilterObjsList = []; 
    this.ResultsList = null;
    this.EmptyResult = null; 
    this.ResultObjsList = [];
    this.ResultsPage = 1;
    this.RefreshUI = refreshUI;
    this.Query = '';
    
    this.Init = function()
    {
        this.ResultsPage = 1;
        this.FiltersList = document.getElementById(this.Name + '_FiltersList');
        if(!this.FiltersList)
        {
            console.error('RabbitHole can not find element ' + this.Name + '_FiltersList to be used as Filer list');
            this.FiltersList = { innerHTML : "" };
        }
        this.EmptyFilter = this.FiltersList.innerHTML;
        
        this.ResultsList = document.getElementById(this.Name + '_ResultsList');
        if(!this.ResultsList)
        {
            console.error('RabbitHole can not find element ' + this.Name);
            return;
        }
        this.EmptyResult = this.ResultsList.innerHTML;        
        this.Clear();
        console.log(this.Name + 'UIList initiated');
    };
    
    this.Clear = function() 
    {
        this.ClearFilters();
        this.ClearResults();
    };
    
    this.ClearFilters = function() 
    {
        this.FiltersList.innerHTML = '';
    };
    
    this.ClearResults = function() 
    {
        this.ResultsList.innerHTML = '';
    };
    
    this.FiltersCount = function()
    {
        var result = (this.FiltersList.childNodes.length - 1) / 2;
        if (result < 0) result = 0;
        else if(result < 1) result = 1;
        return result;
    };
    
    this.AddFilter = function(element)
    {   
        this.FiltersList.innerHTML += element;        
    };
    
    this.AddResult = function(element)
    {   
        this.ResultsList.innerHTML += element;        
    };
    
    this.CountFilter = function(countId)
    {
         for(var i=0; i < this.FilterObjsList.length; i++)
        {            
            NaicsUIManager.SearchEconomicUnits.ResultsPage = 1;
            var filterId = ('Filter_' + this.FilterObjsList[i].Type + '_' + this.FilterObjsList[i].Name + '_' + this.FilterObjsList[i].Value).replace(new RegExp(' ', 'g'), '_');
            if(filterId == countId)
            {
                hole01_BusinessNaicsController.CountFilter(this.FilterObjsList[i],
                function(data) 
                {                    
                    $('#' + filterId+'_Count').html(data.Count);
                    $('#' + filterId).removeClass('panel-warning');
                    $('#' + filterId).addClass('panel-success');
                },
                function(data)
                {
                
                }
            );
            this.RefreshUI();
            
            }
        }
    };
    
    this.RemoveFilter = function(deleteId)
    {
        for(var i=0; i < this.FilterObjsList.length; i++)
        {
            var filterId = ('Filter_' + this.FilterObjsList[i].Type + '_' + this.FilterObjsList[i].Name + '_' + this.FilterObjsList[i].Value).replace(new RegExp(' ', 'g'), '_');;
            if(filterId == deleteId)
            {
                this.FilterObjsList.splice(i,1);
            }
        }
        var element = document.getElementById(deleteId);
        element.parentNode.removeChild(element);
        this.RefreshUI(); 
    };
};