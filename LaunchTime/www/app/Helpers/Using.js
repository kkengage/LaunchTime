var D;
(function (D) {
    function using(resource, func) {
        try {
            func(resource);
        }
        finally {
            resource.dispose();
        }
    }
    D.using = using;
})(D || (D = {}));
//class Camera implements IDisposable {
//    takePicture() { /* omitted */ }
//    // etc...
//    dispose() {
//        navigator.camera.cleanup();
//    }
//}
//using(new Camera(), (camera) => {
//    camera.takePicture();
//});
//# sourceMappingURL=Using.js.map