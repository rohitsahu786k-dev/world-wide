declare module 'gsap/ScrollTrigger';
declare module 'framer-motion';
declare module 'mongodb' {
  export class MongoClient {
    constructor(url: string, options?: any);
    connect(): Promise<this>;
    db(name?: string): any;
  }
}
declare module 'dotted-map';
