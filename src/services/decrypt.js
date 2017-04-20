import CryptoJS from 'crypto-js';

var Decrypt = {
  decryptBOUserData() {
    var x =localStorage.getItem('bouser');
    if (x != null){
      var bytes = CryptoJS.AES.decrypt(x.toString(), 'bousers');
      x = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return x;
  },
  decryptMemberData() {
    var x =localStorage.getItem('memberuser');
    if (x != null){
      var bytes = CryptoJS.AES.decrypt(x.toString(), 'memberusers');
      x = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    }
    return x;
  },
}

module.exports = Decrypt;
