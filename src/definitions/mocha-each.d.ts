declare module 'mocha-each' {
  const forEach: (params: any[]) => {
    it: (expectation: string, callback?: (...args: any[]) => any) => void;
  };
  export = forEach;
}

