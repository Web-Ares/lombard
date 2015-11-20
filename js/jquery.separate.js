separateNumber = function(str){
    return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};