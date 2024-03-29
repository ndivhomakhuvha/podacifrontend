export interface Server {
    server_id: number;
    user_id: number;
    imageurl: string;
    ipadress: string;
    name: string;
    memory: string;
    type: string;
    status: string;
    isLoading?: boolean;
}
export interface CreateServer {
    imageurl: string;
    ipadress: string;
    name: string;
    memory: string;
    type: string;
    user_id: number;
}

