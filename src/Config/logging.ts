const getTimeStamp = (): string => {
    return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
    if(object){
        console.log(`[${getTimeStamp()}] [INFO] [${namespace}] ${message}`, object);
    }
}