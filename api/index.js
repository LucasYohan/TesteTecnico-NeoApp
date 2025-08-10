import md5 from "md5";

const ts = 1;
const publicKey = "f1e374b5827ccfbc4032c97db46bd8b8";
const privateKey = "5850686947501e198f9dea099e828434b89fe1e1";

console.log(md5(ts + privateKey + publicKey));