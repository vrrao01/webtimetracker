function getDomain(tablink){
    let url =  tablink[0].url;
    return url.split("/")[2];
};