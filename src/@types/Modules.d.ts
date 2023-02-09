declare module "*.scss" {
    // I think? 
    // We only care about the side effect of loading css really.
    const css: string;
    export default css;
}
