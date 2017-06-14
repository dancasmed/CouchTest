var UIManager =
{
    
    
    
    Change_Theme : function(selectorId)
    {
        var loadedThemes = document.getElementsByClassName('uib-framework-theme');
        
        for(var i = 0; i< loadedThemes.length; i++)
            loadedThemes[i].remove();
        
        var themeName = document.getElementById(selectorId).value;        
        if(typeof(themeName) == 'undefined' || themeName == null)
            themeName = 'default';
        else
            themeName = themeName.toLowerCase();
        
        switch(themeName)
        {
            case 'default':
                $('head').append('<link rel="stylesheet" type="text/css" href="bootstrap/css/bootstrap.min.css" class="uib-framework-theme">');             
                break;
            default:
                $('head').append('<link rel="stylesheet" type="text/css" href="' + themeName + '/css/' + themeName +'.min.css" class="uib-framework-theme">');             
        }
    },
    clearSelector : function(selector)
    {
        selector.innerHTML = "";
        var defaultOption = document.createElement('option');
        defaultOption.value = 'all';
        defaultOption.innerHTML = 'Todos';
        selector.appendChild(defaultOption);
    },
    
};