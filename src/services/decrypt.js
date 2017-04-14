import CryptoJS from 'crypto-js';

var Decrypt = {
  decryptUserData() {
    var x =localStorage.getItem('bouser');
    if (x != null){
      var bytes = CryptoJS.AES.decrypt(x.toString(), 'bousers');
      x = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return x;
  },
}

module.exports = Decrypt;
