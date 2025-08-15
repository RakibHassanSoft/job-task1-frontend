
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: 0.05 });

export const startLoading = () => NProgress.start();
export const stopLoading = () => NProgress.done();
