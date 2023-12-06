import axios from "axios";

class Interceptors {
    public create(): void {
        axios.interceptors.request.use(request => {
            const token = localStorage.getItem('token');
            token && (request.headers.Authorization = `Bearer ${token}`);
            
            return request;
        });
    }
}

const interceptors = new Interceptors();
export default interceptors;