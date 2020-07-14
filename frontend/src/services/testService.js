import http from "../http-common";

class HelloService {

    getHello(){
        return http.get(`/hello`);
    };

}

export default new HelloService();