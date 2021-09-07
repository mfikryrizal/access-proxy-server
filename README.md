# ACCESS-PROXY-SERVER
Simple proxy server using NodeJS, Express and Axios. 
Call the proxy with "{host url}/proxy".

Query params:
- url : target URL
- method : HTTP method
- contenttype : Content-Type header

Included Authorization header and body will be passed to the proxy request.