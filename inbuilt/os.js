let os= require("os");
console.log(os.version());
console.log(os.platform());
console.log(os.cpus().length +"core");
console.log(os.arch());
console.log(os.freemem());
console.log(os.uptime());
/*
Windows 10 Pro
win32
2core
x64
1186041856
2540778
*/