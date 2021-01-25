const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});
class ProductResource{
    
    static productUrl(resourceUrl){
        const prroductServer = (process.env.PROVIDERS_URL || 'http://http://host.docker.internal:3500/api/v1');
        return urljoin(prroductServer, productUrl);
    }
    static requestHeaders(){
        const productosKey = (process.env.PROVIDERS_APIKEY || ''); 
        return {
            apikey: productosKey
        };
    }
    static getProducts(){
        const url = ProductResource.productUrl("/products");
        const options={
            headers: ProductResource.requestHeaders()
        }
        return request.get(url, options);
    }

   // static putStockProveedor(id, data){
       // const url = ProvidersResource.providersUrl("/providers/"+id+"/update");
       // const options={
          //  headers: ProvidersResource.requestHeaders(),
           // body: data
       // }

       // return request.put(url, options);
    }




module.exports= ProductResource;