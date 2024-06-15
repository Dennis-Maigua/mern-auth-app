import axios from "axios";

const Client = axios.create({
    baseURL: 'https://d332-41-80-112-225.ngrok-free.app'

    // for emulator: 'http://192.168.100.142:8000' 
    // for device: 'https://xxxx-xx-xx-xxx.ngrok-free.app'

});

export default Client;