// Global type definitions
declare global {
  // This helps with Next.js type generation that uses Object
  interface ObjectConstructor {
    // Ensure Object is recognized as a valid type
    new (value?: any): Object;
    readonly prototype: Object;
    (): any;
  }
}

export {};
